import { BiDotsHorizontalRounded } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import { Project } from "../types";

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
        <span className="notes-count">{project.notes.length}</span>
        <BiDotsHorizontalRounded className="dot-icon" />
      </div>
    </div>
  );
};
