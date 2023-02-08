import { useCallback, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { PageHeader } from "../../components/PageHeader";
import { TaskItem } from "../../components/TaskItem";
import { Task } from "../../types";
import { Deferred } from "../../utils/Deferred";
import { NewTaskDialog } from "./NewTaskDialog";

export const TasksList: React.FC = () => {
  // get the project's id from the url and then fetch its tasks

  const [newTaskHandler, setNewTaskHandler] = useState<Deferred<void>>();
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
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} editable={true} />
        ))}

        <div
          className="icon-c align-self-center add-task align-items-center mt-2"
          onClick={addTask}
        >
          <AiOutlinePlus /> Add task
        </div>
      </div>

      {newTaskHandler && <NewTaskDialog deferred={newTaskHandler} />}
    </div>
  );
};
