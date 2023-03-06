import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { NavLink, useParams } from "react-router-dom";
import { EditTaskApi, Task } from "../types";
import { IconButton } from "./Button";

export const TaskItem: React.FC<{
  task: Task;
  editable?: boolean;
  completeTask: (data: EditTaskApi) => void;
  deleteTask: (taskId: number) => void;
}> = ({ task, editable, completeTask, deleteTask }) => {
  const { projectId } = useParams<{ projectId: string }>();
  return (
    <>
      <div className="task" key={task.id}>
        <div className={`infos flex gap-2 isdone-${task.isDone}`}>
          <div
            className={`statut isdone-${task.isDone}`}
            onClick={() =>
              completeTask({ id: task.id, isDone: !task.isDone } as EditTaskApi)
            }
          >
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
          <IconButton handler={() => deleteTask(task.id)}>
            <AiOutlineDelete />
          </IconButton>
        </div>
      </div>
      {task.children && (
        <div style={{ marginLeft: "25px" }}>
          {task.children.map((child) => (
            <TaskItem
              key={child.id}
              task={child}
              completeTask={completeTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      )}
    </>
  );
};
