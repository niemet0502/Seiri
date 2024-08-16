import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { IconButton } from "../../../components/Button";
import { Dropdown } from "../../../components/Dropdown";
import { DropdownItem } from "../../../components/DropdownItem";
import { Project } from "../../../types";
import { textEllipsis } from "../../../utils/Helpers";
import { useUpdateProject } from "../hooks/useProjectUpdate";

export const ProjectItems: React.FC<{
  project: Project;
  active: boolean;
  showBadge?: boolean;
}> = ({ project, active, showBadge = false }) => {
  const { updateProject } = useUpdateProject();
  const archiveProject = () => {
    updateProject({ ...project, isArchive: !project.isArchive });
  };
  return (
    <div
      className={`project-items flex justify-content-between align-items-center ${
        active ? "active" : undefined
      }`}
    >
      <NavLink to={`/project/${project.id}`} className="flex-2">
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

            <DropdownItem
            // handler={() => onDelete(project.id)}
            >
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
