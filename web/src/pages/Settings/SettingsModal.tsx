import { Button } from "../../components/Button";
import { DIALOG_CLOSED_REASON, Dialog } from "../../components/Dialog";
import { FormInput } from "../../components/Input";
import { Deferred } from "../../utils/Deferred";

export const SettingsModal: React.FC<{ deferred: Deferred<void> }> = ({
  deferred,
}) => {
  return (
    <Dialog
      width="850px"
      onClose={() => deferred.reject(DIALOG_CLOSED_REASON)}
      title="Settings"
    >
      <div
        className="flex flex-column p-1 gap-3"
        style={{ maxHeight: "400px", overflow: "auto" }}
      >
        <div className="flex flex-column gap-2">
          <h4>Photo</h4>

          <div className="flex align-items-center gap-2">
            <img
              width="105"
              src="https://avatars.doist.com?fullName=Marius%20Vincent%20NIEMET&amp;email=mariusniemet20%40gmail.com&amp;size=105&amp;bg=1D1E2B"
              alt="Marius Vincent NIEMET"
            ></img>

            <div className="">
              <Button variant="secondary">Upload photo</Button>
              <p>Pick a photo up to 4MB. Your avatar photo will be public.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-column gap-2">
          <h4>Name</h4>

          <div className="flex flex-column gap-2" style={{ maxWidth: "600px" }}>
            <FormInput variant="dark" />
            <FormInput variant="dark" />
          </div>
        </div>

        <div className="flex flex-column gap-2">
          <h4>Email</h4>
          <p>vincentmarius8@gmail.com</p>

          <div>
            <Button variant="secondary">Change email</Button>
          </div>
        </div>

        <div className="flex flex-column gap-2">
          <h4>Password</h4>

          <div>
            <Button variant="secondary">Change password</Button>
          </div>
        </div>

        <hr />

        <div className="flex flex-column gap-2">
          <h4>Delete account</h4>
          <p>
            This will immediately delete all of your data including tasks,
            projects, comments, and more. This can’t be undone.
          </p>
          <div>
            <Button>Delete account</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
