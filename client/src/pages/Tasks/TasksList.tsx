import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useMemo, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiDotsHorizontalRounded, BiTaskX } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { queryClient } from "../..";
import { Button, IconButton } from "../../components/Button";
import { CompletedTaskItem } from "../../components/CompletedTaskItem";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { Loader } from "../../components/Loader";
import { PageHeader } from "../../components/PageHeader";
import { TaskItem } from "../../components/TaskItem";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { ConfirmDialogContext } from "../../provider/confirmDialogProvider";
import { useToasts } from "../../provider/toastProvider";
import { DeleteMultipleTasksApi, EditTaskApi, Task } from "../../types";
import { transformDateToMMDDFormat } from "../../utils/Date";
import { Deferred } from "../../utils/Deferred";
import { groupTasksByCompletedDate } from "../../utils/Helpers";
import { NewTaskDialog } from "./NewTaskDialog";

export const TasksList: React.FC = () => {
  const querykey = ["tasks"];

  const { projectId } = useParams<{ projectId: string }>();
  const { apiClient } = useContext(ApiClientContext);
  const { pushToast } = useToasts();
  const { confirm } = useContext(ConfirmDialogContext);

  const [newTaskHandler, setNewTaskHandler] = useState<Deferred<Task>>();
  const [taskToEdit, setTaskToEdit] = useState<Task>();
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  const { isLoading, data: tasks } = useQuery({
    queryKey: [querykey, projectId, showCompleted],
    queryFn: () => apiClient.getTasksByProject(projectId, showCompleted),
  });

  const { data: project } = useQuery({
    queryKey: ["projects", { id: projectId }],
    queryFn: () => apiClient.getProject(projectId),
  });

  const { mutate: completeTask } = useMutation({
    mutationFn: (data: EditTaskApi) => apiClient.editTask(data),

    onSuccess: (editedTask) => {
      pushToast({
        title: "Task completed",
        message: editedTask.title,
      });

      queryClient.invalidateQueries({ queryKey: [querykey, projectId] });
    },
  });

  const { mutate: deleteTask } = useMutation({
    mutationFn: (taskId: number) => apiClient.deleteTask(taskId),

    onSuccess: ({ data }) => {
      pushToast({
        title: "Task deleted",
        message: "",
      });

      queryClient.invalidateQueries({ queryKey: [querykey, projectId] });
    },
  });

  const { mutate: deleteMultipleTask } = useMutation({
    mutationFn: (data: DeleteMultipleTasksApi) =>
      apiClient.deleteMultipleTasks(data),

    onSuccess: ({ data }) => {
      pushToast({
        title: "Task deleted",
        message: "",
      });

      queryClient.invalidateQueries({ queryKey: [querykey, projectId] });
    },
  });

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

  const onDelete = async (taskId: number) => {
    if (
      await confirm({
        title: "Delete Task ?",
        message: "Are you sure you want to delete this task ?",
      })
    ) {
      deleteTask(taskId);
    }
  };

  const onMultipleDelete = async (projectId: string) => {
    if (
      await confirm({
        title: "Delete Tasks ?",
        message: "Are you sure you want to delete all completed tasks ?",
      })
    ) {
      deleteMultipleTask({ projectId, completed: true });
    }
  };

  const isCompleted = project && project.name === "Completed";

  const groupedTasks = useMemo(() => {
    if (!(project && project.name === "Completed") || !tasks) return;
    return groupTasksByCompletedDate(tasks);
  }, [project, tasks]);

  return (
    <div className="flex page-content flex-2">
      <div className="tasks-list ">
        <PageHeader>
          {project && !project.isDefault && (
            <Dropdown
              left="-150px"
              width="150px"
              trigger={(toggle) => (
                <IconButton handler={toggle}>
                  <BiDotsHorizontalRounded />
                </IconButton>
              )}
            >
              <>
                <DropdownItem handler={() => setShowCompleted((prev) => !prev)}>
                  <AiOutlineCheckCircle /> {showCompleted ? "Hide" : "Show"}{" "}
                  completed
                </DropdownItem>

                <DropdownItem handler={() => onMultipleDelete(projectId)}>
                  <AiOutlineDelete /> Delete completed
                </DropdownItem>
              </>
            </Dropdown>
          )}
        </PageHeader>

        <div className="body flex mt-2">
          {!isLoading && (
            <>
              {tasks && (
                <>
                  {!isCompleted &&
                    tasks.map((task: Task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        editable={true}
                        completeTask={(data: EditTaskApi) => completeTask(data)}
                        deleteTask={(taskId: number) => onDelete(taskId)}
                        editTask={(task: Task) => editTask(task)}
                      />
                    ))}

                  {isCompleted &&
                    groupedTasks &&
                    Array.from(groupedTasks?.entries()).map((value: any) => (
                      <div>
                        <div className="p-b-1 border-b">
                          <h4 className="bold">
                            {transformDateToMMDDFormat(new Date(value[0]))}
                          </h4>
                        </div>

                        {value[1].map((task: Task) => (
                          <CompletedTaskItem task={task} />
                        ))}
                      </div>
                      // <span>{JSON.stringify(value)}</span>
                    ))}
                  <div
                    className="align-self-center add-task align-items-center mt-2"
                    onClick={addTask}
                  >
                    {tasks.length > 0 && project && !project.isDefault && (
                      <Button>
                        <AiOutlinePlus /> Add task
                      </Button>
                    )}
                  </div>
                </>
              )}

              {tasks.length === 0 && !project.isDefault && (
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
