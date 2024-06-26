import { createBrowserHistory } from "history";
import React, { Suspense } from "react";
import { Route, Router, Switch } from "react-router";
import "./App.css";
import { NotFound } from "./components/NotFound";
import { PageLoader } from "./components/PageLoader";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ApiClientProvider } from "./provider/apiClientProvider";
import { ConfirmDialogProvider } from "./provider/confirmDialogProvider";
import { CurrentFeatureProvider } from "./provider/currentFeatureProvider";
import { ToastContextProvider } from "./provider/toastProvider";
import { CurrentUserProvider } from "./provider/userProvider";

const TaskDetails = React.lazy(() => import("./pages/Tasks/TaskDetails"));
const NoteDetails = React.lazy(() => import("./pages/Notes/NoteDetails"));
const BaseList = React.lazy(() => import("./pages/Project/BaseList"));

export const history = createBrowserHistory();

function App() {
  return (
    <ApiClientProvider>
      <ToastContextProvider>
        <ConfirmDialogProvider>
          <CurrentFeatureProvider>
            <CurrentUserProvider>
              <div className="content-wrapper flex">
                <Router history={history}>
                  <Sidebar />
                  <Suspense fallback={<PageLoader />}>
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

                      <Route
                        exact
                        path="/project/:projectId"
                        component={BaseList}
                      />
                      <Route path="*" component={NotFound} />
                    </Switch>
                  </Suspense>
                </Router>
              </div>
            </CurrentUserProvider>
          </CurrentFeatureProvider>
        </ConfirmDialogProvider>
      </ToastContextProvider>
    </ApiClientProvider>
  );
}

export default App;
