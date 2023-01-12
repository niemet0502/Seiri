import { NavLink } from "react-router-dom";
import { Button } from "../../components/Button";
import { SearchInput } from "../../components/Input";

export const SignIn: React.FC = () => {
  return (
    <div className="login-wrapper-content flex flex-row ">
      <div className="login-wrapper-content-child flex justify-content-center ">
        <div className="form-container flex flex-column justify-content-center ">
          <div className="form-header">
            <h3>Sign in to your account</h3>
            <span>
              Or{" "}
              <NavLink to="/auth/login" className="primary">
                create a new account
              </NavLink>
            </span>
          </div>

          <div className="form-body flex gap-3 flex-column">
            <SearchInput label="Email address" />

            <SearchInput label="Password" type="password" />

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
          </div>
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
