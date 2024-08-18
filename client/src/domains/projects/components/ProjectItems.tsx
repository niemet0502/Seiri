import { useContext } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { IconButton } from "../../../components/Button";
import { Dropdown } from "../../../components/Dropdown";
import { DropdownItem } from "../../../components/DropdownItem";
import { ConfirmDialogContext } from "../../../provider/confirmDialogProvider";
import { Project } from "../../../types";
import { textEllipsis } from "../../../utils/Helpers";
import { useUpdateProject } from "../hooks/useProjectUpdate";
import { useRemoveProject } from "../hooks/useRemoveProject";

export const ProjectItems: React.FC<{
  project: Project;
  active: boolean;
  showBadge?: boolean;
}> = ({ project, active, showBadge = false }) => {
  const { confirm } = useContext(ConfirmDialogContext);

  const { updateProject } = useUpdateProject();
  const { removeProject } = useRemoveProject();

  const archiveProject = () => {
    updateProject({ ...project, isArchive: !project.isArchive });
  };

  const onDelete = async () => {
    if (
      await confirm({
        title: "Delete Project ? ",
        message: `Are you sure you want to delete ${project.name} ?`,
      })
    ) {
      removeProject(project.id);
    }
  };
  return (
    <div
      className={`project-items flex justify-content-between align-items-center ${
        active ? "active" : undefined
      }`}
    >
      <NavLink to={`/projects/${project.id}`} className="flex-2">
        <div className="flex align-items-center project-title flex-2">
          <RxDotFilled style={{ color: project.color }} />
          <span style={{ fontSize: "13px" }}>
            {textEllipsis(project.name, 80)}
          </span>

          {project.isArchive && showBadge && (
            <span className="badge">Archived</span>
          )}
        </div>
      </NavLink>
      {!project.isDefault && (
        <div className="flex align-items-center" style={{ fontSize: "12px" }}>
          <Dropdown
            left="-120px"
            trigger={(toggle) => (
              <IconButton handler={toggle}>
                <BiDotsHorizontalRounded />
              </IconButton>
            )}
          >
            <DropdownItem
            // handler={() => setProjectToEdit(project)}
            >
              <AiOutlineEdit /> Edit
            </DropdownItem>

            <DropdownItem handler={onDelete}>
              <AiOutlineDelete /> Delete
            </DropdownItem>

            <DropdownItem handler={archiveProject}>
              <BsArchive />
              {project.isArchive ? "Unarchive" : "Archive"}
            </DropdownItem>
          </Dropdown>
        </div>
      )}
    </div>
  );
};
