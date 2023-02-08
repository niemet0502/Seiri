import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { Project } from "../types";
import { IconButton } from "./Button";
import { Dropdown } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";

export const ProjectItem: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div
      key={project.id}
      className="project-items flex justify-content-between"
    >
      <div className="flex align-items-center project-title">
        <RxDotFilled style={{ color: project.color }} />
        <span style={{ fontSize: "14px" }}>{project.name}</span>
      </div>
      <div className="flex align-items-center" style={{ fontSize: "12px" }}>
        <Dropdown
          left="-120px"
          trigger={(toggle) => (
            <IconButton handler={toggle}>
              <BiDotsHorizontalRounded />
            </IconButton>
          )}
        >
          <DropdownItem>
            <AiOutlineEdit /> Edit
          </DropdownItem>

          <DropdownItem>
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
