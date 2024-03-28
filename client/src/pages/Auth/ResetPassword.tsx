import { useContext, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { NavLink, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/Input";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { useToasts } from "../../provider/toastProvider";
import { ResetPasswordApi, ResetPasswordFormApi } from "../../types";

export const ResetPassword: React.FC = () => {
  const { apiClient } = useContext(ApiClientContext);
  const { pushToast } = useToasts();
  const { resetToken } = useParams<{ resetToken: string }>();

  const [error, setError] = useState<string>();

  const { control, watch, handleSubmit, reset } =
    useForm<ResetPasswordFormApi>();

  const { mutate: resetPassword } = useMutation(
    (data: ResetPasswordApi) => apiClient.resetPassword(data),
    {
      onSuccess: () => {
        setError(undefined);
        reset({
          password: "",
          confirmPassword: "",
        });

        pushToast({
          title: "Password reset",
          message: "You can sign in with your new password",
        });
      },
      onError: (error: any) => {
        setError(error.response.data.message);
      },
    }
  );

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isDisabled = useMemo(
    () => password && confirmPassword && password === confirmPassword,
    [password, confirmPassword]
  );

  const submit = (formData: ResetPasswordFormApi) => {
    const { password } = formData;

    resetPassword({ password, resetToken });
  };

  return (
    <div className="login-wrapper-content flex flex-row ">
      <div className="login-wrapper-content-child flex justify-content-center ">
        <div className="form-container flex flex-column justify-content-center ">
          <div className="form-header">
            <h3>Reset your password</h3>
            <span>
              Or{" "}
              <NavLink to="/" className="primary">
                sign in to your account
              </NavLink>
            </span>
          </div>

          {error && <div className="form-error-container">{error}</div>}

          <form onSubmit={handleSubmit(submit)}>
            <div className="form-body flex gap-3 flex-column">
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormInput
                    label="New password"
                    {...field}
                    {...fieldState}
                    type="password"
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormInput
                    label="Confirm password"
                    {...field}
                    {...fieldState}
                    type="password"
                  />
                )}
              />

              <Button isDisabled={!isDisabled} type="submit">
                Reset password
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="login-wrapper-content-child flex  justify-content-center">
        <div
          style={{ width: "100px" }}
          className="flex flex-column justify-content"
        >
          <div className="flex logo-border"></div>
          <div
            className="p-2 flex gap-2 align-items-center"
            style={{ marginLeft: "-30px" }}
          >
            <img src="/white-logo.png" width="30px" alt="logo" />
            <h2 className="login-title slideInFromRight">Seiri</h2>
          </div>
          <div className="flex logo-border"></div>
        </div>
      </div>
    </div>
  );
};
