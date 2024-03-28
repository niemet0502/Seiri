import { createContext, useCallback, useState } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { DIALOG_CLOSED_REASON } from "../components/Dialog";
import { Deferred } from "../utils/Deferred";

interface ConfirmDialogProps {
  title: string;
  message: string;
}

interface ConfirmDialogContextValue {
  confirm: (props: ConfirmDialogProps) => Promise<boolean>;
}

export const ConfirmDialogContext = createContext<ConfirmDialogContextValue>(
  {} as ConfirmDialogContextValue
);

export const ConfirmDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [confirmHandler, setConfirmHandler] =
    useState<Deferred<boolean> | null>(null);
  const [props, setProps] = useState<ConfirmDialogProps>();

  const confirm = useCallback(async (props: ConfirmDialogProps) => {
    const deferred = new Deferred<boolean>();
    setProps(props);
    setConfirmHandler(deferred);

    try {
      return await deferred.promise;
    } catch (error) {
      if (error !== DIALOG_CLOSED_REASON) {
        throw error;
      }
      return false;
    } finally {
      setConfirmHandler(null);
      setProps(undefined);
    }
  }, []);

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      {confirmHandler && (
        <ConfirmDialog
          deferred={confirmHandler}
          title={props?.title as string}
          message={props?.message as string}
        />
      )}
    </ConfirmDialogContext.Provider>
  );
};
