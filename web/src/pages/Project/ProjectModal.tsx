import { Dialog, DIALOG_CLOSED_REASON } from "../../components/Dialog";
import { SearchInput } from "../../components/Input";
import { Deferred } from "../../utils/Deferred";

export const ProjectModal: React.FC<{ deferred: Deferred<void> }> = ({
  deferred,
}) => {
  return (
    <Dialog
      title="New Project"
      onClose={() => deferred.reject(DIALOG_CLOSED_REASON)}
    >
      <div className="p-1">
        <SearchInput label="Email address" />
      </div>
      New Project
    </Dialog>
  );
};
