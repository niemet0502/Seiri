import { useCallback, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiDotsHorizontalRounded, BiTaskX } from "react-icons/bi";
import { Button, IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { PageHeader } from "../../components/PageHeader";
import { TaskItem } from "../../components/TaskItem";
import { tasks } from "../../utils/data";
import { Deferred } from "../../utils/Deferred";
import { NewTaskDialog } from "./NewTaskDialog";

export const TasksList: React.FC = () => {
  // get the project's id from the url and then fetch its tasks

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

  return (
    <div className="flex page-content flex-2">
      <div className="tasks-list ">
        <PageHeader>
          <h3>2023 Roadmap</h3>
          <Dropdown
            left="-120px"
            width="150px"
            trigger={(toggle) => (
              <IconButton handler={toggle}>
                <BiDotsHorizontalRounded />
              </IconButton>
            )}
          >
            <DropdownItem>
              <AiOutlineEdit /> Edit
            </DropdownItem>

            <DropdownItem>
              <AiOutlineDelete /> Delete
            </DropdownItem>

            <DropdownItem>
              <AiOutlineCheckCircle /> Hide completed
            </DropdownItem>
          </Dropdown>
        </PageHeader>

        <div className="body flex mt-2">
          {tasks && (
            <>
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} editable={true} />
              ))}
              <div
                className="icon-c align-self-center add-task align-items-center mt-2"
                onClick={addTask}
              >
                <AiOutlinePlus /> Add task
              </div>
            </>
          )}

          {tasks.length === 0 && (
            <div
              className="flex flex-column align-items-center justify-content-center gap-2"
              style={{ marginTop: "180px" }}
            >
              <BiTaskX size={55} />
              <h3>No Task found </h3>
              <p>
                Organize your life. Achieve more every day by creating a task
              </p>
              <Button handler={addTask}>
                <AiOutlinePlus /> Create task
              </Button>
            </div>
          )}
        </div>

        {newTaskHandler && <NewTaskDialog deferred={newTaskHandler} />}
      </div>
    </div>
  );
};
