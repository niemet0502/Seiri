import { NavLink } from "react-router-dom";
import { Task } from "../types";

export const CompletedTaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div className="flex gap-1 p-1 p-l-0 border-b">
      <div>
        <img
          width="60px"
          height="60px"
          src="https://avatars.doist.com?fullName=Marius%20Vincent%20NIEMET&amp;email=mariusniemet20%40gmail.com&amp;size=105&amp;bg=1D1E2B"
          alt="Marius Vincent NIEMET"
        ></img>
      </div>
      <div className="flex flex-1 flex-column justify-content-between">
        <p className="fz-14">
          <span className="bold">You completed a task:</span> {task.title}
        </p>
        <div className="fz-14">
          Project:{" "}
          <NavLink to={`/project/${task.project?.id}`}>
            {task?.project?.name}
          </NavLink>
        </div>
      </div>
    </div>
  );
};
