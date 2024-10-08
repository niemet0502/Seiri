import { useMutation } from "@tanstack/react-query";
import { useContext, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/Input";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { useToasts } from "../../provider/toastProvider";
import { PasswordUpdateApi } from "../../types";
import { StepEnum } from "./SettingsModal";

export const PasswordStep: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<StepEnum>>;
}> = ({ setStep }) => {
  const { apiClient } = useContext(ApiClientContext);
  const { pushToast } = useToasts();

  const [error, setError] = useState<string>();

  const { control, watch, handleSubmit, reset } = useForm<PasswordUpdateApi>();

  const { mutate: passwordUpdate } = useMutation({
    mutationFn: (data: PasswordUpdateApi) => apiClient.passwordUpdate(data),
    onSuccess: () => {
      pushToast({
        title: "Saved !",
        message: "Your profile information has been updated",
      });

      reset({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (error: any) => {
      setError(error.response.data.message);
    },
  });

  const newPassword = watch("newPassword");
  const oldPassword = watch("oldPassword");
  const confirmPassword = watch("confirmPassword");

  const isDisabled = useMemo(
    () =>
      newPassword &&
      oldPassword &&
      confirmPassword &&
      newPassword === confirmPassword,
    [newPassword, oldPassword, confirmPassword]
  );

  const submit = (formData: PasswordUpdateApi) => {
    passwordUpdate(formData);
  };

  return (
    <form
      className="h-100 p-1 flex flex-column justify-content-between"
      onSubmit={handleSubmit(submit)}
    >
      <div>
        {!error && (
          <p className="mb-2">
            Your password must be at least 8 characters long. Avoid common words
            or patterns.
          </p>
        )}

        {error && <div className="form-error-container">{error}</div>}

        <div className="flex flex-column gap-2" style={{ maxWidth: "600px" }}>
          <Controller
            name="oldPassword"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormInput
                variant="dark"
                label="Old password"
                type="password"
                {...field}
                {...fieldState}
              />
            )}
          />

          <Controller
            name="newPassword"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormInput
                variant="dark"
                label="New password"
                type="password"
                {...field}
                {...fieldState}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormInput
                variant="dark"
                label="Confirm password"
                type="password"
                {...field}
                {...fieldState}
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-content-end mt-2">
        <Button
          variant="secondary"
          handler={() => setStep((prev) => StepEnum.Undefinied)}
        >
          Cancel
        </Button>
        <Button isDisabled={!isDisabled} type="submit">
          Change password
        </Button>
      </div>
    </form>
  );
};
