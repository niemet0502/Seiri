import { useCallback, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/Input";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { IAuthLogin } from "../../types";

export const SignIn: React.FC = () => {
  const { apiClient } = useContext(ApiClientContext);
  const { control, handleSubmit } = useForm<IAuthLogin>();
  const { push } = useHistory();

  const submit = useCallback(
    async (data: IAuthLogin) => {
      try {
        await apiClient.SignIn(data);

        push("/");

        // addToast
      } catch (e) {
        // error handling
        console.log(e);
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
                Forgot your password ?{" "}
              </NavLink>
            </div>

            <Button type="submit"> Sign up </Button>
          </form>
        </div>
      </div>
      <div className="login-wrapper-content-child flex  justify-content-center">
        <div
          style={{ width: "100px" }}
          className="flex flex-column justify-content"
        >
          <div className="flex logo-border"></div>
          <div className="p-2" style={{ marginLeft: "-22px" }}>
            <img
              src="https://app.logsnag.com/static/media/logo-text-dark.430acd2cdd827917cc32ce2c470bccbe.svg"
              alt="logo"
            />
          </div>
          <div className="flex logo-border"></div>
        </div>
      </div>
    </div>
  );
};