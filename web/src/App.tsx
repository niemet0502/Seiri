import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";
import "./App.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { NoteDetails } from "./pages/Notes/NoteDetails";
import { BaseList } from "./pages/Project/BaseList";
import { TaskDetails } from "./pages/Tasks/TaskDetails";
import { CurrentFeatureProvider } from "./provider/currentFeatureProvider";

const history = createBrowserHistory();

function App() {
  return (
    <CurrentFeatureProvider>
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
          </Switch>
        </Router>
      </div>
    </CurrentFeatureProvider>
  );
}

export default App;
