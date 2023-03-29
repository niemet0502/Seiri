import { useCallback, useContext, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiDotsHorizontalRounded, BiTaskX } from "react-icons/bi";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../..";
import { Button, IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { Loader } from "../../components/Loader";
import { PageHeader } from "../../components/PageHeader";
import { TaskItem } from "../../components/TaskItem/TaskItem";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { useToasts } from "../../provider/toastProvider";
import { EditTaskApi, Task } from "../../types";
import { Deferred } from "../../utils/Deferred";
import { NewTaskDialog } from "./NewTaskDialog";

export const TasksList: React.FC = () => {
  const querykey = ["tasks"];

  const { projectId } = useParams<{ projectId: string }>();
  const { apiClient } = useContext(ApiClientContext);
  const { pushToast } = useToasts();

  const [newTaskHandler, setNewTaskHandler] = useState<Deferred<Task>>();
  const [taskToEdit, setTaskToEdit] = useState<Task>();

  const { isLoading, data } = useQuery([querykey, projectId], () =>
    apiClient.getTasksByProject(projectId)
  );

  const { mutate: completeTask } = useMutation(
    (data: EditTaskApi) => apiClient.editTask(data),
    {
      onSuccess: (editedTask) => {
        pushToast({
          title: "Task completed",
          message: editedTask.title,
        });

        queryClient.invalidateQueries([querykey, projectId]);
      },
    }
  );

  const { mutate: deleteTask } = useMutation(
    (taskId: number) => apiClient.deleteTask(taskId),
    {
      onSuccess: ({ data }) => {
        pushToast({
          title: "Task deleted",
          message: data.title,
        });

        queryClient.invalidateQueries([querykey, projectId]);
      },
    }
  );

  const tasks = data || [];

  const addTask = useCallback(async () => {
    const deferred = new Deferred<Task>();

    setNewTaskHandler(deferred);

    try {
      const result = await deferred.promise;

      pushToast({
        title: "Task created",
        message: result.title,
      });
    } catch (e) {
    } finally {
      setNewTaskHandler(undefined);
    }
  }, [pushToast]);

  const editTask = async (task: Task) => {
    const deferred = new Deferred<Task>();

    setNewTaskHandler(deferred);
    setTaskToEdit(task);

    try {
      const result = await deferred.promise;

      pushToast({
        title: "Task edited",
        message: result.title,
      });
    } catch (e) {
    } finally {
      setNewTaskHandler(undefined);
      setTaskToEdit(undefined);
    }
  };

  return (
    <div className="flex page-content flex-2">
      <div className="tasks-list ">
        <PageHeader>
          <h3>2023 Roadmap</h3>
          <Dropdown
            left="-150px"
            width="150px"
            trigger={(toggle) => (
              <IconButton handler={toggle}>
                <BiDotsHorizontalRounded />
              </IconButton>
            )}
          >
            <DropdownItem>
              <AiOutlineCheckCircle /> Hide completed
            </DropdownItem>

            <DropdownItem>
              <AiOutlineDelete /> Delete completed
            </DropdownItem>
          </Dropdown>
        </PageHeader>

        <div className="body flex mt-2">
          {!isLoading && (
            <>
              {tasks && (
                <>
                  {tasks.map((task: Task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      editable={true}
                      completeTask={(data: EditTaskApi) => completeTask(data)}
                      deleteTask={(taskId: number) => deleteTask(taskId)}
                      editTask={(task: Task) => editTask(task)}
                    />
                  ))}
                  <div
                    className="align-self-center add-task align-items-center mt-2"
                    onClick={addTask}
                  >
                    {tasks.length > 0 && (
                      <Button>
                        <AiOutlinePlus /> Add task
                      </Button>
                    )}
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
                    Organize your life. Achieve more every day by creating a
                    task
                  </p>
                  <Button handler={addTask}>
                    <AiOutlinePlus /> Create task
                  </Button>
                </div>
              )}
            </>
          )}

          {isLoading && <Loader />}
        </div>

        {newTaskHandler && projectId && (
          <NewTaskDialog
            deferred={newTaskHandler}
            projectId={projectId}
            taskToEdit={taskToEdit}
          />
        )}
      </div>
    </div>
  );
};
