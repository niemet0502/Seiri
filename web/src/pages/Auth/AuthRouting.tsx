import { Route, Router, Switch } from "react-router-dom";
import { history } from "../../App";
import { Login } from "./Login/Login";
import { ResetPassword } from "./ResetPassword";
import { SignIn } from "./SignIn";

export const AuthRouting: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth/signin" exact component={SignIn} />
        <Route path="/auth/forgot-password" exact component={ResetPassword} />
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
};
