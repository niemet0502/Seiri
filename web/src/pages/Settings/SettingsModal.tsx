import { useContext, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Button } from "../../components/Button";
import { DIALOG_CLOSED_REASON, Dialog } from "../../components/Dialog";
import { FormInput } from "../../components/Input";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { ConfirmDialogContext } from "../../provider/confirmDialogProvider";
import { useToasts } from "../../provider/toastProvider";
import { CurrentUserContext } from "../../provider/userProvider";
import { UpdateUser, User, UserFormApi } from "../../types";
import { Deferred } from "../../utils/Deferred";
import { toBase64 } from "../../utils/Helpers";
import { EmailStep } from "./EmailStep";
import { PasswordStep } from "./PasswordStep";

export enum StepEnum {
  Undefinied = 0,
  Email = 1,
  Password = 2,
}

export const SettingsModal: React.FC<{ deferred: Deferred<void> }> = ({
  deferred,
}) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { apiClient } = useContext(ApiClientContext);
  const { pushToast } = useToasts();
  const { confirm } = useContext(ConfirmDialogContext);

  const [step, setStep] = useState<StepEnum>(StepEnum.Undefinied);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultValues = useMemo(
    () => ({
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
    }),
    [currentUser]
  );

  const { control, watch, reset, handleSubmit } = useForm<UserFormApi>({
    defaultValues,
  });

  const { mutate: updatedUser } = useMutation(
    (data: UpdateUser) => apiClient.updateUser(data),
    {
      onSuccess: (updatedUser) => {
        pushToast({
          title: "Saved !",
          message: "Your profile information has been updated",
        });

        setCurrentUser(updatedUser as User);

        reset({
          firstname: updatedUser.firstname,
          lastname: updatedUser.lastname,
        });
      },
    }
  );

  const firstname = watch("firstname");
  const lastname = watch("lastname");

  const isEdited = useMemo(
    () =>
      firstname?.trim() !== currentUser?.firstname ||
      lastname?.trim() !== currentUser?.lastname,
    [firstname, lastname, currentUser]
  );

  const submit = (formData: UserFormApi) => {
    if (!currentUser) return;
    updatedUser({ ...formData, id: currentUser.id });
  };

  const handleFileUpload = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleInputFileChange = async () => {
    if (!(fileInputRef.current && fileInputRef.current.files && currentUser))
      return;
    const file = fileInputRef.current.files;

    const convertedFile = await toBase64(file[0]);

    updatedUser({ id: currentUser.id, avatar: convertedFile as string });
  };

  const removeProfilePicture = async () => {
    if (!currentUser) return;

    if (
      await confirm({
        title: "Delete profile picture ? ",
        message: `Are you sure you want to delete your current profile picture ? `,
      })
    ) {
      updatedUser({ id: currentUser.id, avatar: null });
    }
  };

  return (
    <Dialog
      width="850px"
      onClose={() => deferred.reject(DIALOG_CLOSED_REASON)}
      title="Settings"
    >
      <div
        className="flex flex-column gap-3"
        style={{
          maxHeight: "400px",
          height: "400px",
          overflow: "auto",
          justifyContent: "space-between",
        }}
      >
        {step === StepEnum.Undefinied && (
          <form onSubmit={handleSubmit(submit)}>
            <>
              <div className="flex flex-column gap-2 p-1">
                <h4>Photo</h4>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  ref={fileInputRef}
                  hidden
                  onChange={handleInputFileChange}
                />

                <div className="flex align-items-center gap-2">
                  {!currentUser?.avatar && (
                    <>
                      <img
                        width="105"
                        src="https://avatars.doist.com?fullName=Marius%20Vincent%20NIEMET&amp;email=mariusniemet20%40gmail.com&amp;size=105&amp;bg=1D1E2B"
                        alt="Marius Vincent NIEMET"
                      ></img>
                      <div className="">
                        <Button
                          type="button"
                          variant="secondary"
                          handler={handleFileUpload}
                        >
                          Upload photo
                        </Button>
                        <p>
                          Pick a photo up to 4MB. Your avatar photo will be
                          public.
                        </p>
                      </div>
                    </>
                  )}

                  {currentUser?.avatar && (
                    <>
                      <img
                        width="105"
                        className="rounded"
                        src={currentUser.avatar}
                        alt={`${currentUser.firstname} profile`}
                      ></img>
                      <div className="">
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            handler={handleFileUpload}
                          >
                            Change photo
                          </Button>
                          <Button
                            type="button"
                            variant="terciary"
                            handler={removeProfilePicture}
                          >
                            Remove photo
                          </Button>
                        </div>
                        <p className="mt-1">
                          Pick a photo up to 4MB. Your avatar photo will be
                          public.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-column gap-2 p-1">
                <h4>Name</h4>

                <div
                  className="flex flex-column gap-2"
                  style={{ maxWidth: "600px" }}
                >
                  <Controller
                    name="firstname"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <FormInput variant="dark" {...field} {...fieldState} />
                    )}
                  />
                  <Controller
                    name="lastname"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <FormInput variant="dark" {...field} {...fieldState} />
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-column gap-2 p-1">
                <h4>Email</h4>
                <p>{currentUser?.email}</p>

                <div>
                  <Button
                    handler={() => setStep((prev) => StepEnum.Email)}
                    variant="secondary"
                  >
                    Change email
                  </Button>
                </div>
              </div>

              <div className="flex flex-column gap-2 p-1">
                <h4>Password</h4>

                <div>
                  <Button
                    handler={() => setStep((prev) => StepEnum.Password)}
                    variant="secondary"
                  >
                    Change password
                  </Button>
                </div>
              </div>

              <div
                className="border-color-primary m-2"
                style={{ borderTop: "1px solid rgb(82, 82, 111)" }}
              ></div>

              <div className="flex flex-column gap-2 p-1">
                <h4>Delete account</h4>
                <p>
                  This will immediately delete all of your data including tasks,
                  projects, comments, and more. This can’t be undone.
                </p>
                <div>
                  <Button variant="terciary">Delete account</Button>
                </div>
              </div>
            </>
            {isEdited && (
              <div
                className="flex gap-2 p-1 justify-content-end"
                style={{
                  borderTop: "1px solid rgb(82, 82, 111)",
                  position: "sticky",
                  bottom: "0px",
                  background: "rgb(29, 30, 43)",
                  zIndex: 5,
                  paddingRight: "16px",
                }}
              >
                <Button
                  type="button"
                  variant="secondary"
                  handler={() => reset(defaultValues)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </div>
            )}
          </form>
        )}

        {step === StepEnum.Password && currentUser && (
          <PasswordStep setStep={setStep} user={currentUser} />
        )}
        {step === StepEnum.Email && currentUser && (
          <EmailStep
            setStep={setStep}
            user={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
      </div>
    </Dialog>
  );
};
