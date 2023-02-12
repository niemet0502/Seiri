import { Button } from "../../components/Button";
import { Dialog, DIALOG_CLOSED_REASON } from "../../components/Dialog";
import { FormInput } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Deferred } from "../../utils/Deferred";

export const ProjectModal: React.FC<{ deferred: Deferred<void> }> = ({
  deferred,
}) => {
  return (
    <Dialog
      title="New Project"
      onClose={() => deferred.reject(DIALOG_CLOSED_REASON)}
    >
      <div className="p-2 flex flex-column gap-2">
        <FormInput label="Name" variant="dark" />

        <TextArea label="Description" variant="dark"></TextArea>
      </div>

      <div className="flex gap-2 justify-content-end p-2 mt-2">
        <Button
          variant="secondary"
          handler={() => deferred.reject(DIALOG_CLOSED_REASON)}
        >
          Cancel
        </Button>
        <Button>Create</Button>
      </div>
    </Dialog>
  );
};
