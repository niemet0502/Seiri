import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { Task } from "../types";

export const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <>
      <div className="task" key={task.id}>
        <div className={`infos flex gap-2 isdone-${task.isDone}`}>
          <div className={`statut isdone-${task.isDone}`}>
            <AiOutlineCheck />
          </div>
          {task.title}
        </div>
        <div className="icon-c">
          <AiOutlineEdit />
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
