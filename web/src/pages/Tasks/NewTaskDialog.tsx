import { Dialog, DIALOG_CLOSED_REASON } from "../../components/Dialog";
import { Deferred } from "../../utils/Deferred";

export const NewTaskDialog: React.FC<{ deferred: Deferred<void> }> = ({
  deferred,
}) => {
  return (
    <Dialog
      title="New Task"
      onClose={() => deferred.reject(DIALOG_CLOSED_REASON)}
    >
      Dialog
    </Dialog>
  );
};
