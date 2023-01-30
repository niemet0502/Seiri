import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import { TaskItem } from "../../components/TaskItem";
import { Task } from "../../types";

export const TasksList: React.FC = () => {
  // get the project's id from the url and then fetch its tasks

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Deploy Tefnout backend",
      description: "",
      isDone: false,
      children: [
        {
          id: 1,
          title: "Deploy Tefnout backend",
          description: "",
          isDone: true,
        },
        {
          id: 2,
          title: "Update Reamde with link",
          description: "",
          isDone: false,
        },
      ],
    },
    {
      id: 2,
      title: "Update Reamde with link",
      description: "",
      isDone: false,
    },
    {
      id: 3,
      title: "Rewrite my resume",
      description: "",
      isDone: false,
    },
    {
      id: 4,
      title: "Build the personal website",
      description: "",
      isDone: true,
    },
  ]);

  return (
    <div className="tasks-list">
      <div className="header flex">
        <h3>2023 Roadmap</h3>
        <HiDotsHorizontal />
      </div>

      <div className="body flex">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} editable={true} />
        ))}

        <div className="icon-c align-self-center add-task align-items-center">
          <AiOutlinePlus /> Add task
        </div>
      </div>
    </div>
  );
};
