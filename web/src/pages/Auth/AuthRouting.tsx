import { Route, Router, Switch } from "react-router-dom";
import { history } from "../../App";
import { Login } from "./Login";
import { ResetPassword } from "./ResetPassword";
import { SignIn } from "./SignIn";

export const AuthRouting: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/auth/signin" exact component={SignIn} />
        <Route path="/auth/forgot-password" exact component={ResetPassword} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </Router>
  );
};
