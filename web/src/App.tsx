import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";
import "./App.css";
import { Login } from "./pages/Auth/Login";
import { ResetPassword } from "./pages/Auth/ResetPassword";
import { SignIn } from "./pages/Auth/SignIn";
import { Content } from "./pages/Content/Content";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/signin" component={SignIn} />
        <Route path="/auth/forgot-password" component={ResetPassword} />
        <Route path="/" component={Content} />
      </Switch>
    </Router>
  );
}

export default App;
