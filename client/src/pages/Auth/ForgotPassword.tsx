import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/Input";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { useToasts } from "../../provider/toastProvider";
import { ForgotPasswordApi } from "../../types";

export const ForgotPassword: React.FC = () => {
  const { apiClient } = useContext(ApiClientContext);
  const { pushToast } = useToasts();

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>();

  const { mutate: sendPassword } = useMutation({
    mutationFn: (data: ForgotPasswordApi) => apiClient.forgotPassword(data),

    onSuccess: () => {
      setError(undefined);
      setEmail("");
      pushToast({
        title: "Password reset email sent!",
        message: " Please check your inbox. ",
      });
    },
    onError: (error: any) => {
      setError(error.response.data.message);
    },
  });

  const onSubmit = () => {
    sendPassword({ email });
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

          <div className="form-body flex gap-3 flex-column">
            <FormInput
              label="Email address"
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <Button isDisabled={!email} handler={onSubmit}>
              Send Reset Link
            </Button>
          </div>
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
