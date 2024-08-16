import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { IconButton } from "../../../components/Button";
import { Loader } from "../../../components/Loader";
import { PageHeader } from "../../../components/PageHeader";
import { CurrentUserContext } from "../../../provider/userProvider";
import { Project } from "../../../types";
import { ProjectItems } from "../components/ProjectItems";
import { useProjects } from "../hooks/useProjects";

export const ProjectsList: React.FC = () => {
  const { data: projects, isLoading } = useProjects(false);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="project-sidebar">
      <div className="flex user-details">
        <img
          width="26px"
          height="26px"
          src="https://avatars.doist.com?fullName=Marius%20Vincent%20NIEMET&amp;email=mariusniemet20%40gmail.com&amp;size=105&amp;bg=1D1E2B"
          alt="Marius Vincent NIEMET"
        ></img>
        {/* {currentUser?.avatar && (
        )} */}
        <h3>
          {currentUser?.firstname || currentUser?.lastname
            ? `${currentUser?.firstname}  ${currentUser?.lastname}`
            : currentUser?.email.split("@")[0]}
        </h3>
      </div>

      <div className="project-list">
        {(projects || [])
          .filter((project: Project) => project.isDefault)
          .map((project: Project) => (
            <ProjectItems key={project.id} project={project} active={false} />
          ))}
      </div>

      <br />
      <PageHeader>
        <NavLink to="/projects">Projects</NavLink>
        <IconButton
        // handler={newProjecthandler}
        >
          <AiOutlinePlus />
        </IconButton>
      </PageHeader>
      {isLoading && (
        <div className="flex justify-content-center mt-2">
          <Loader />
        </div>
      )}
      <div className="project-list">
        {(projects || [])
          .filter((project: Project) => !project.isDefault)
          .map((project: Project) => (
            <ProjectItems
              key={project.id}
              project={project}
              active={false}
              // setProjectToEdit={setProjectToEdit}
              // feature={feature}
            />
          ))}
      </div>
    </div>
  );
};
