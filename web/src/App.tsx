import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";
import "./App.css";
import { NotFound } from "./components/NotFound";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { NoteDetails } from "./pages/Notes/NoteDetails";
import { BaseList } from "./pages/Project/BaseList";
import { TaskDetails } from "./pages/Tasks/TaskDetails";
import { CurrentFeatureProvider } from "./provider/currentFeatureProvider";
import { CurrentUserProvider } from "./provider/userProvider";

export const history = createBrowserHistory();

function App() {
  return (
    <CurrentFeatureProvider>
      <CurrentUserProvider>
        <div className="content-wrapper flex">
          <Router history={history}>
            <Sidebar />
            <Switch>
              <Route
                exact
                path="/project/:projectId/task/:taskId"
                component={TaskDetails}
              />

              <Route
                exact
                path="/project/:projectId/note/:noteId"
                component={NoteDetails}
              />

              <Route exact path="/project/:projectId" component={BaseList} />
              <Route exact path="/" component={NotFound} />
            </Switch>
          </Router>
        </div>
      </CurrentUserProvider>
    </CurrentFeatureProvider>
  );
}

export default App;
