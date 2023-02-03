import { BiDotsHorizontalRounded } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import { Project } from "../types";
import { Dropdown } from "./Dropdown";

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
      <div className="flex align-items-center">
        <Dropdown
          left="-120px"
          trigger={(toggle) => <BiDotsHorizontalRounded onClick={toggle} />}
        >
          <div style={{ width: "100px" }}>Test</div>
        </Dropdown>
      </div>
    </div>
  );
};
