import { AnimatePresence, motion } from "framer-motion";
import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Toast } from "../components/Toast";

type Params = ComponentProps<typeof Toast>;
export type ToastItem = ComponentProps<typeof Toast> & { id: number };

const defaultPush = (toast: Params) => {};

const defaultValue = {
  pushToastRef: { current: (toast: Params) => {} },
};

export const ToastContext = createContext(defaultValue);

export const ToastContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pushToastRef = useRef(defaultPush);

  return (
    <ToastContext.Provider value={{ pushToastRef }}>
      <Toasts />
      {children}
    </ToastContext.Provider>
  );
};

export function useToasts() {
  const { pushToastRef } = useContext(ToastContext);

  return {
    pushToast: useCallback(
      (toast: Params) => {
        pushToastRef.current(toast);
      },
      [pushToastRef]
    ),
  };
}

const Toasts: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const { pushToastRef } = useContext(ToastContext);

  pushToastRef.current = (params: Params) => {
    const toast = { ...params, id: Date.now() };
    setToasts((v) => [...v, toast]);

    setTimeout(() => {
      setToasts((v) => v.filter((t) => t.id !== toast.id));
    }, 5000);
  };

  const onRemove = (toast: number) => {
    setToasts((v) => v.filter((t) => t.id !== toast));
  };

  return (
    <div className="toast-message-container">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            <Toast {...t} onClose={onRemove} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
