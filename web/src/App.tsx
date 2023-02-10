import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";
import "./App.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { TasksList } from "./pages/Tasks/TasksList";

const history = createBrowserHistory();

function App() {
  return (
    <div className="content-wrapper flex">
      <Router history={history}>
        <Sidebar />
        <Switch>
          {/* <Route path="/auth/login" component={Login} /> */}
          {/* <Route path="/auth/signin" component={SignIn} /> */}
          {/* <Route path="/auth/forgot-password" component={ResetPassword} /> */}
          {/* <Route
            path="/project/:projectId/task/:taskId/details"
            component={TaskDetails}
          />

          <Route path="/" />
          <Route
            path="/project/:projectId/note/:noteId/details"
            component={NoteDetails}
          /> */}

          <Route path="/" component={TasksList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
