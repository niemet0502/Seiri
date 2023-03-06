import { useCallback, useContext, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../..";
import { Button, IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { Loader } from "../../components/Loader";
import { PageHeader } from "../../components/PageHeader";
import { TaskItem } from "../../components/TaskItem";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { EditTaskApi, Task } from "../../types";
import { Deferred } from "../../utils/Deferred";
import { NewTaskDialog } from "./NewTaskDialog";

export const TaskDetails: React.FC = () => {
  const { taskId, projectId } = useParams<{
    taskId: string;
    projectId: string;
  }>();
  const { apiClient } = useContext(ApiClientContext);

  const [editing, setEditing] = useState<boolean>(false);
  const [newTaskHandler, setNewTaskHandler] = useState<Deferred<Task>>();

  const { data: task, isLoading } = useQuery(["tasks", taskId], () =>
    apiClient.getTask(taskId)
  );

  const { mutate: completeTask } = useMutation(
    (data: EditTaskApi) => apiClient.editTask(data),
    {
      onSuccess: () => {
        //add toast
        queryClient.invalidateQueries(["tasks", taskId]);
      },
    }
  );

  const addTask = useCallback(async () => {
    const deferred = new Deferred<Task>();

    setNewTaskHandler(deferred);

    try {
      await deferred.promise;
      // add toast
    } catch (e) {
    } finally {
      setNewTaskHandler(undefined);
    }
  }, []);

  return (
    <div className="flex page-content flex-2">
      <div className="task-details">
        <div className="task-content">
          <PageHeader>
            <h4>
              {task && (
                <>
                  {task.project.name} &gt; <span>{task.title}</span>{" "}
                </>
              )}
            </h4>
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
          {task && (
            <div className="body">
              {!editing && (
                <div className="plain-content flex flex-column gap-3">
                  <div className="flex align-items-center">
                    <div
                      className={`statut isdone-${task.isDone}`}
                      onClick={() =>
                        completeTask({
                          id: task.id,
                          isDone: !task.isDone,
                        } as EditTaskApi)
                      }
                    >
                      <AiOutlineCheck />
                    </div>
                    <span style={{ fontSize: "22px", marginLeft: "9px" }}>
                      {task.title}
                    </span>
                  </div>

                  <p className="desc" placeholder="Add description"></p>
                </div>
              )}

              {editing && (
                <form action="">
                  <div className="flex flex-column form p-1">
                    <textarea className="task-title" autoFocus>
                      {task.title}
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
                {task.children.map((task: Task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    editable={false}
                    completeTask={completeTask}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="task-attributes flex flex-column">
          <div className="task-detail-header">
            <PageHeader>Details</PageHeader>
          </div>
          {isLoading && <Loader />}

          {!isLoading && task && (
            <div className="row task-detail ">
              <div className=" flex mt-2  attributes">
                <div className="label">Statut</div>
                <div>{task.isDone ? "Done" : "To do"}</div>
              </div>
              <div className=" flex mt-2  attributes">
                <div className="label">Project</div>
                <div>{task.project.name}</div>
              </div>
            </div>
          )}
        </div>

        {newTaskHandler && projectId && (
          <NewTaskDialog
            deferred={newTaskHandler}
            projectId={projectId}
            parentId={taskId}
          />
        )}
      </div>
    </div>
  );
};
