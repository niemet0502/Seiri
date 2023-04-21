import { useContext, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/Input";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { useToasts } from "../../provider/toastProvider";
import { UpdateUser, User, UserFormApi } from "../../types";
import { StepEnum } from "./SettingsModal";

export const EmailStep: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<StepEnum>>;
  user: User;
  setCurrentUser: (user: User) => void;
}> = ({ setStep, user, setCurrentUser }) => {
  const { apiClient } = useContext(ApiClientContext);
  const { pushToast } = useToasts();

  const { control, watch, handleSubmit, reset } = useForm<UserFormApi>({
    defaultValues: user,
  });

  const { mutate: updateEmail } = useMutation(
    (data: UpdateUser) => apiClient.updateUser(data),
    {
      onSuccess: (updatedUser) => {
        pushToast({
          title: "Email changed",
          message: updatedUser.email,
        });

        setCurrentUser(updatedUser as User);

        reset({
          newEmail: "",
          confirmEmail: "",
        });

        setStep((prev) => StepEnum.Undefinied);
      },
    }
  );

  const newEmail = watch("newEmail");
  const confirmEmail = watch("confirmEmail");

  const isDisabled = useMemo(
    () => newEmail && confirmEmail && newEmail === confirmEmail,
    [confirmEmail, newEmail]
  );

  const submit = (formData: UserFormApi) => {
    updateEmail({ id: user.id, email: formData.newEmail });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <p className="mb-2">
          Update the email you use for your Todoist account. Your email is
          currently <strong>{user.email}</strong>.
        </p>
        <div className="flex flex-column gap-2" style={{ maxWidth: "600px" }}>
          <Controller
            name="newEmail"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormInput
                variant="dark"
                label="New email"
                type="email"
                {...field}
                {...fieldState}
              />
            )}
          />
          <Controller
            name="confirmEmail"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormInput
                variant="dark"
                label="Confirm email"
                type="email"
                {...field}
                {...fieldState}
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-content-end p-2 mt-2">
        <Button
          variant="secondary"
          handler={() => setStep((prev) => StepEnum.Undefinied)}
        >
          Cancel
        </Button>
        <Button isDisabled={!isDisabled} type="submit">
          Change email
        </Button>
      </div>
    </form>
  );
};
