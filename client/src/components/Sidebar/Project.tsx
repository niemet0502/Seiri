import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { currentFeatureContext } from "../../provider/currentFeatureProvider";
import { CurrentUserContext } from "../../provider/userProvider";
import { Project } from "../../types";
import { IconButton } from "../Button";
import { Loader } from "../Loader";
import { PageHeader } from "../PageHeader";
import { ProjectItem } from "../Project";

export const Projects: React.FC<{
  newProjecthandler: () => void;
  setProjectToEdit: (project: Project) => void;
}> = ({ newProjecthandler, setProjectToEdit }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { feature } = useContext(currentFeatureContext);
  const { apiClient } = useContext(ApiClientContext);
  const { pathname } = useLocation();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["projects", { feature }],
    queryFn: () => apiClient.getProjects(feature, true),
  });

  const projects = data || [];

  const isActive = useCallback(
    (id: number) => {
      const filteredPath = pathname.split("/");

      return (
        id.toString() ===
        filteredPath[filteredPath.length === 3 ? filteredPath.length - 1 : 2]
      );
    },
    [pathname]
  );

  useEffect(() => {
    if (!feature) return;
    refetch();
  }, [feature, refetch]);

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
        {projects
          .filter((project: Project) => project.isDefault)
          .map((project: Project) => (
            <ProjectItem
              key={project.id}
              project={project}
              active={isActive(project.id)}
              setProjectToEdit={setProjectToEdit}
              feature={feature}
            />
          ))}
      </div>

      <br />
      <PageHeader>
        <h4>Projects</h4>
        <IconButton handler={newProjecthandler}>
          <AiOutlinePlus />
        </IconButton>
      </PageHeader>
      {isLoading && (
        <div className="flex justify-content-center mt-2">
          <Loader />
        </div>
      )}
      <div className="project-list">
        {projects
          .filter((project: Project) => !project.isDefault)
          .map((project: Project) => (
            <ProjectItem
              key={project.id}
              project={project}
              active={isActive(project.id)}
              setProjectToEdit={setProjectToEdit}
              feature={feature}
            />
          ))}
      </div>
    </div>
  );
};
