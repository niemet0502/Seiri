import { useCallback, useState } from "react";
import { ProjectModal } from "../../pages/Project/ProjectModal";
import { Deferred } from "../../utils/Deferred";
import { Features } from "./Features";
import { Projects } from "./Project";

export const Sidebar: React.FC = () => {
  const [newProjectHandler, setNewProjectHandler] = useState<Deferred<void>>();

  const addNewProject = useCallback(async () => {
    const deferred = new Deferred<void>();

    setNewProjectHandler(deferred);

    try {
      await deferred.promise;
    } catch (e) {
      setNewProjectHandler(undefined);
    }
  }, []);

  return (
    <>
      <Features />
      <Projects newProjecthandler={addNewProject} />

      {newProjectHandler && <ProjectModal deferred={newProjectHandler} />}
    </>
  );
};
