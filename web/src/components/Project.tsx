import { useContext } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useMutation } from "react-query";
import { NavLink, useHistory } from "react-router-dom";
import { queryClient } from "../index";
import { ApiClientContext } from "../provider/apiClientProvider";
import { ConfirmDialogContext } from "../provider/confirmDialogProvider";
import { useToasts } from "../provider/toastProvider";
import { FeatureEnum, Project } from "../types";
import { IconButton } from "./Button";
import { Dropdown } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";

export const ProjectItem: React.FC<{
  project: Project;
  active: boolean;
  setProjectToEdit: (project: Project) => void;
  feature: FeatureEnum;
}> = ({ project, active, setProjectToEdit, feature }) => {
  const { apiClient } = useContext(ApiClientContext);
  const { pushToast } = useToasts();
  const { confirm } = useContext(ConfirmDialogContext);
  const { push } = useHistory();

  const { mutate } = useMutation((id: number) => apiClient.removeProject(id), {
    onSuccess: () => {
      pushToast({
        title: "Task deleted",
        message: "",
      });
      queryClient.invalidateQueries([["projects"], feature]);
      push("/");
    },
  });

  const onDelete = async (projectId: number) => {
    if (
      await confirm({
        title: "Delete Project ? ",
        message: `Are you sure you want to delete ${project.name} ?`,
      })
    ) {
      mutate(projectId);
    }
  };

  return (
    <div
      key={project.id}
      className={`project-items flex justify-content-between align-items-center ${
        active ? "active" : undefined
      }`}
    >
      <NavLink to={`/project/${project.id}`} className="flex-2">
        <div className="flex align-items-center project-title flex-2">
          <RxDotFilled style={{ color: project.color }} />
          <span style={{ fontSize: "14px" }}>{project.name}</span>
        </div>
      </NavLink>
      <div className="flex align-items-center" style={{ fontSize: "12px" }}>
        <Dropdown
          left="-120px"
          trigger={(toggle) => (
            <IconButton handler={toggle}>
              <BiDotsHorizontalRounded />
            </IconButton>
          )}
        >
          <DropdownItem handler={() => setProjectToEdit(project)}>
            <AiOutlineEdit /> Edit
          </DropdownItem>

          <DropdownItem handler={() => onDelete(project.id)}>
            <AiOutlineDelete /> Delete
          </DropdownItem>

          <DropdownItem>
            <BsArchive /> Archive
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
};
