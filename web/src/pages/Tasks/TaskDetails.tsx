import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Button, IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { PageHeader } from "../../components/PageHeader";
import { TaskItem } from "../../components/TaskItem";

export const TaskDetails: React.FC = () => {
  const [editing, setEditing] = useState<boolean>(false);

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
        <PageHeader>
          <h4>2023 Roadmap &gt; Deploy Tefnout backend</h4>
          <Dropdown
            left="-120px"
            trigger={(toggle) => (
              <IconButton handler={toggle}>
                <BiDotsHorizontalRounded />
              </IconButton>
            )}
          >
            <DropdownItem handler={() => setEditing((prev) => !prev)}>
              <AiOutlineEdit /> Edit
            </DropdownItem>

            <DropdownItem>
              <AiOutlineDelete /> Delete
            </DropdownItem>
          </Dropdown>
        </PageHeader>
        <div className="body">
          {!editing && (
            <div
              className="plain-content flex flex-column"
              style={{ padding: "10px", gap: "25px" }}
            >
              <span style={{ fontSize: "22px", marginLeft: "9px" }}>
                Deploy Tefnout backend
              </span>

              <p className="desc">Add description</p>
            </div>
          )}

          {editing && (
            <form action="">
              <div
                className="flex flex-column form"
                style={{ padding: "10px" }}
              >
                <textarea className="task-title" autoFocus>
                  Deploy Tefnout backend
                </textarea>

                <textarea
                  className="task-description"
                  name=""
                  id=""
                  value={task.description || "Add description"}
                ></textarea>
              </div>
              <div className="flex gap-2 justify-content-end mt-2">
                <Button
                  variant="secondary"
                  handler={() => setEditing((prev) => !prev)}
                >
                  Cancel
                </Button>
                <Button>Save</Button>
              </div>
            </form>
          )}

          <h6>Sub-tasks</h6>
          <div className="">
            {task.children.map((task) => (
              <TaskItem key={task.id} task={task} editable={false} />
            ))}
          </div>
        </div>
      </div>
      <div className="task-attributes">
        <div className="task-detail-header">
          <PageHeader>Details</PageHeader>
        </div>
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
