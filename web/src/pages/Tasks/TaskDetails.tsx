import { HiDotsHorizontal } from "react-icons/hi";
import { Button } from "../../components/Button";
import { TaskItem } from "../../components/TaskItem";

export const TaskDetails: React.FC = () => {
  // get task id from the url and fetch from database

  const task = {
    id: 1,
    title: "Deploy Tefnout backend",
    description: null,
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
  };
  return (
    <div className="task-details">
      <div className="task-content">
        <div className="header flex">
          <h4>2023 Roadmap &gt; Deploy Tefnout backend</h4>
          <HiDotsHorizontal />
        </div>
        <div className="body">
          <textarea className="task-title">Deploy Tefnout backend</textarea>

          <textarea
            className="task-description"
            name=""
            id=""
            value={task.description || "Add description"}
          ></textarea>

          <div className="flex gap-2 justify-content-end">
            <Button variant="secondary">Cancel</Button>
            <Button>Save</Button>
          </div>

          <h6>Sub-tasks</h6>
          <div className="">
            {task.children.map((task) => (
              <TaskItem key={task.id} task={task} editable={false} />
            ))}
          </div>
        </div>
      </div>
      <div className="task-attributes">
        <div className="task-detail-header">Details</div>
        <div className="row task-detail ">
          <div className=" flex mt-2  attributes">
            <div className="label">Statut</div>
            <div>To do</div>
          </div>
          <div className=" flex mt-2  attributes">
            <div className="label">Project</div>
            <div>2023 Roadmap</div>
          </div>
          <div className=" flex mt-2  attributes">
            <div className="label">Archive</div>
            <div>False</div>
          </div>
        </div>
      </div>
    </div>
  );
};
