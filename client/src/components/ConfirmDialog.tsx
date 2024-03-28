import { Deferred } from "../utils/Deferred";
import { Button } from "./Button";
import { Dialog, DIALOG_CLOSED_REASON } from "./Dialog";

export const ConfirmDialog: React.FC<{
  deferred: Deferred<boolean>;
  title: string;
  message: string;
}> = ({ deferred, title, message }) => {
  return (
    <Dialog
      minheight="230px"
      onClose={() => deferred.reject(DIALOG_CLOSED_REASON)}
      title={title}
    >
      <p className="p-2 mt-1">{message}</p>
      <div className="flex gap-2 justify-content-end p-2 mt-2">
        <Button
          variant="secondary"
          handler={() => deferred.reject(DIALOG_CLOSED_REASON)}
        >
          Cancel
        </Button>
        <Button type="submit" handler={() => deferred.resolve(true)}>
          Delete
        </Button>
      </div>
    </Dialog>
  );
};
