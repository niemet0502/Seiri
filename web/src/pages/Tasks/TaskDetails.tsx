import { useCallback, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { Button, IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { PageHeader } from "../../components/PageHeader";
import { TaskItem } from "../../components/TaskItem";
import { Deferred } from "../../utils/Deferred";
import { NewTaskDialog } from "./NewTaskDialog";

export const TaskDetails: React.FC = () => {
  // get task id from the url and fetch from database
  const [editing, setEditing] = useState<boolean>(false);
  const [newTaskHandler, setNewTaskHandler] = useState<Deferred<void>>();

  const addTask = useCallback(async () => {
    const deferred = new Deferred<void>();

    setNewTaskHandler(deferred);

    try {
      await deferred.promise;
    } catch (e) {
      setNewTaskHandler(undefined);
    }
  }, []);

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

            <DropdownItem>
              <BsArchive /> Archive
            </DropdownItem>
          </Dropdown>
        </PageHeader>
        <div className="body">
          {!editing && (
            <div className="plain-content flex flex-column gap-3">
              <div className="flex align-items-center">
                <div className={`statut isdone-${task.isDone}`}>
                  <AiOutlineCheck />
                </div>
                <span style={{ fontSize: "22px", marginLeft: "9px" }}>
                  Deploy Tefnout backend
                </span>
              </div>

              <p className="desc">Add description</p>
            </div>
          )}

          {editing && (
            <form action="">
              <div className="flex flex-column form p-1">
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

          <div className="flex align-items-center justify-content-between">
            <h6>Sub-tasks</h6>
            <IconButton handler={addTask}>
              <AiOutlinePlus />
            </IconButton>
          </div>
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

      {newTaskHandler && <NewTaskDialog deferred={newTaskHandler} />}
    </div>
  );
};
