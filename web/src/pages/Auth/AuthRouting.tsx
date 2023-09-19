import { Redirect, Route, Router, Switch } from "react-router-dom";
import { history } from "../../App";
import { ForgotPassword } from "./ForgotPassword";
import { Login } from "./Login";
import { ResetPassword } from "./ResetPassword";
import { SignIn } from "./SignIn";

export const AuthRouting: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/auth/signin" exact component={SignIn} />
        <Route path="/auth/forgot-password" exact component={ForgotPassword} />
        <Route
          path="/auth/reset-password/:resetToken"
          exact
          component={ResetPassword}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
