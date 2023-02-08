import { useCallback, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IconButton } from "../../components/Button";
import { PageHeader } from "../../components/PageHeader";
import { ProjectItem } from "../../components/Project";
import { Features } from "../../container/Features";
import { Deferred } from "../../utils/Deferred";
import { NoteDetails } from "../Notes/NoteDetails";
import { ProjectModal } from "../Project/ProjectModal";

export const Content: React.FC = () => {
  const [newProjectHandler, setNewProjectHandler] = useState<Deferred<void>>();

  const projects = [
    {
      id: 1,
      name: "2023 Roadmap",
      notes: [],
      tasks: [],
      description: "",
      isArchive: false,
      color: "yellow",
    },
    {
      id: 2,
      name: "2022",
      notes: [],
      tasks: [],
      description: "",
      isArchive: false,
      color: "teal",
    },
    {
      id: 3,
      name: "Bills",
      notes: [],
      tasks: [],
      description: "",
      isArchive: false,
      color: "green",
    },
    {
      id: 4,
      name: "Groceries",
      notes: [],
      tasks: [],
      description: "",
      isArchive: false,
      color: "grape",
    },
    {
      id: 5,
      name: "Work",
      notes: [],
      tasks: [],
      description: "",
      isArchive: false,
      color: "blue",
    },
  ];

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
    <div className="content-wrapper flex">
      <Features />
      <div className="project-sidebar">
        <PageHeader>
          <span>Projects</span>
          <IconButton handler={addNewProject}>
            <AiOutlinePlus />
          </IconButton>
        </PageHeader>
        <div className="project-list">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
      <div className=" flex page-content" style={{ flex: "2" }}>
        {/* <NotesList /> */}
        <NoteDetails />

        {/* <TasksList /> */}
        {/* <TaskDetails /> */}
      </div>

      {newProjectHandler && <ProjectModal deferred={newProjectHandler} />}
    </div>
  );
};
