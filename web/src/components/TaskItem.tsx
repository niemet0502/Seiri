import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { NavLink, useParams } from "react-router-dom";
import { Task } from "../types";
import { IconButton } from "./Button";

export const TaskItem: React.FC<{ task: Task; editable?: boolean }> = ({
  task,
  editable,
}) => {
  const { projectId } = useParams<{ projectId: string }>();
  return (
    <>
      <div className="task" key={task.id}>
        <div className={`infos flex gap-2 isdone-${task.isDone}`}>
          <div className={`statut isdone-${task.isDone}`}>
            <AiOutlineCheck />
          </div>
          <NavLink to={`/project/${projectId}/task/${task.id}`}>
            {task.title}
          </NavLink>
        </div>
        <div className="flex gap-2">
          {editable && (
            <IconButton>
              <AiOutlineEdit />
            </IconButton>
          )}
          <IconButton>
            <AiOutlineDelete />
          </IconButton>
        </div>
      </div>
      {task.children && (
        <div style={{ marginLeft: "25px" }}>
          {task.children.map((child) => (
            <TaskItem key={child.id} task={child} />
          ))}
        </div>
      )}
    </>
  );
};
