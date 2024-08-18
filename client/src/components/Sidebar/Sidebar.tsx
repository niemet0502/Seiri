import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { ProjectModal } from "../../pages/Project/ProjectModal";
import { useToasts } from "../../provider/toastProvider";
import { Project } from "../../types";
import { Deferred } from "../../utils/Deferred";
import { Features } from "./Features";
import { Projects } from "./Project";

export const Sidebar: React.FC = () => {
  const [newProjectHandler, setNewProjectHandler] =
    useState<Deferred<Project>>();
  const [projectToEdit, setProjectToEdit] = useState<Project>();

  const { pushToast } = useToasts();
  const { push } = useHistory();

  const addNewProject = useCallback(async () => {}, []);

  const editProject = useCallback(
    async (project: Project) => {
      const deferred = new Deferred<Project>();

      setProjectToEdit(project);
      setNewProjectHandler(deferred);

      try {
        const result = await deferred.promise;
        pushToast({
          title: "Project edited",
          message: result.name,
        });
      } catch (e) {
      } finally {
        setNewProjectHandler(undefined);
        setProjectToEdit(undefined);
      }
    },
    [pushToast]
  );

  return (
    <>
      <Features />
      <Projects
        newProjecthandler={addNewProject}
        setProjectToEdit={editProject}
      />

      {newProjectHandler && (
        <ProjectModal
          deferred={newProjectHandler}
          projectToEdit={projectToEdit}
        />
      )}
    </>
  );
};
