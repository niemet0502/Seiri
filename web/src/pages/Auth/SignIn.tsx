import { useCallback, useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/Input";
import { Loader } from "../../components/Loader";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { useToasts } from "../../provider/toastProvider";
import { IAuthLogin } from "../../types";

export const SignIn: React.FC = () => {
  const { apiClient } = useContext(ApiClientContext);
  const { control, handleSubmit } = useForm<IAuthLogin>();
  const { push } = useHistory();
  const { pushToast } = useToasts();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const submit = useCallback(
    async (data: IAuthLogin) => {
      setLoading(true);
      setError(undefined);
      try {
        await apiClient.SignIn(data);

        pushToast({
          title: "Registration",
          message: "Your account has been successfully created",
        });
      } catch (e: any) {
        setError(e.response.data.message);
      } finally {
        setLoading(false);
      }
    },
    [apiClient, push]
  );
  return (
    <div className="login-wrapper-content flex flex-row ">
      <div className="login-wrapper-content-child flex justify-content-center ">
        <div className="form-container flex flex-column justify-content-center ">
          <div className="form-header">
            <h3>Create a new account </h3>
            <span>
              Or{" "}
              <NavLink to="/" className="primary">
                sign in to your account
              </NavLink>
            </span>
          </div>

          {error && <div className="form-error-container">{error}</div>}

          <form
            className="form-body flex gap-3 flex-column"
            onSubmit={handleSubmit(submit)}
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <FormInput label="Email address" {...field} {...fieldState} />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <FormInput
                  label="Password"
                  type="password"
                  {...field}
                  {...fieldState}
                />
              )}
            />

            <div className="flex justify-content-between align-items-center ">
              <span className="flex gap-2">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </span>

              <NavLink to="/auth/forgot-password" className="white">
                Forgot your password ?
              </NavLink>
            </div>

            <Button isDisabled={loading} type="submit">
              {loading && <Loader width="12px" height="12px" />}
              {!loading && "Sign up"}
            </Button>
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
