import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Task } from "../types";

export const TaskItem: React.FC<{ task: Task; editable?: boolean }> = ({
  task,
  editable,
}) => {
  return (
    <>
      <div className="task" key={task.id}>
        <div className={`infos flex gap-2 isdone-${task.isDone}`}>
          <div className={`statut isdone-${task.isDone}`}>
            <AiOutlineCheck />
          </div>
          <NavLink to="/">{task.title}</NavLink>
        </div>
        <div className="flex gap-2">
          {editable && (
            <div className="icon-c">
              <AiOutlineEdit />
            </div>
          )}
          <div className="icon-c">
            <AiOutlineDelete />
          </div>
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
