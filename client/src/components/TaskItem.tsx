import { useState } from "react";
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { EditTaskApi, Task } from "../types";
import { displayDuedate } from "../utils/Date";
import { textEllipsis } from "../utils/Helpers";
import { IconButton } from "./Button";

export const TaskItem: React.FC<{
  task: Task;
  editable?: boolean;
  completeTask: (data: EditTaskApi) => void;
  deleteTask: (taskId: number) => void;
  editTask?: (task: Task) => void;
}> = ({ task, editable, completeTask, deleteTask, editTask }) => {
  const { projectId } = useParams<{ projectId: string }>();

  const [isChildrenVisible, setIsChildrenVisible] = useState(false);

  const { status, label } = displayDuedate(task.dueDate);

  return (
    <>
      <div className="flex">
        <div
          className="flex align-items-center justify-content-center"
          style={{
            visibility:
              task.children && task.children?.length > 0 ? "visible" : "hidden",
          }}
        >
          <IconButton handler={() => setIsChildrenVisible((prev) => !prev)}>
            {!isChildrenVisible && <IoIosArrowForward />}
            {isChildrenVisible && <IoIosArrowDown />}
          </IconButton>
        </div>
        <div className="task  flex-1 " key={task.id}>
          <div className={`infos flex gap-2 isdone-${task.isDone}`}>
            <div
              className={`statut isdone-${task.isDone}`}
              style={{
                marginBottom: "auto",
                marginTop: " 5px",
              }}
              onClick={() =>
                completeTask({
                  id: task.id,
                  isDone: !task.isDone,
                } as EditTaskApi)
              }
            >
              <AiOutlineCheck />
            </div>
            <div className="flex flex-column gap-1">
              <div>
                <NavLink to={`/project/${projectId}/task/${task.id}`}>
                  {task.title}
                </NavLink>
                <p>{textEllipsis(task.description, 130) || ""}</p>
              </div>
              {task.dueDate && (
                <div
                  className={`flex align-items-center gap-1 duedate-${status}`}
                >
                  <MdOutlineDateRange />
                  <p className={`duedate-${status}`}>{label}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {editable && editTask && (
              <IconButton handler={() => editTask(task)}>
                <AiOutlineEdit />
              </IconButton>
            )}
            <IconButton handler={() => deleteTask(task.id)}>
              <AiOutlineDelete />
            </IconButton>
          </div>
        </div>
      </div>
      {task.children && isChildrenVisible && (
        <div style={{ marginLeft: "25px" }}>
          {task.children.map((child) => (
            <TaskItem
              key={child.id}
              task={child}
              completeTask={completeTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </div>
      )}
    </>
  );
};
