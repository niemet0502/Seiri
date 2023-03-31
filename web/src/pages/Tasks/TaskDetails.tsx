import { useCallback, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  AiOutlineCheck,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { queryClient } from "../..";
import { Button, IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { FormInput } from "../../components/Input";
import { Loader } from "../../components/Loader";
import { PageHeader } from "../../components/PageHeader";
import { TaskItem } from "../../components/TaskItem";
import { TextArea } from "../../components/TextArea";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { ConfirmDialogContext } from "../../provider/confirmDialogProvider";
import { useToasts } from "../../provider/toastProvider";
import { EditTaskApi, Task } from "../../types";
import { Deferred } from "../../utils/Deferred";
import { NewTaskDialog } from "./NewTaskDialog";

export const TaskDetails: React.FC = () => {
  const { taskId, projectId } = useParams<{
    taskId: string;
    projectId: string;
  }>();
  const { apiClient } = useContext(ApiClientContext);
  const { goBack } = useHistory();
  const { pushToast } = useToasts();
  const { confirm } = useContext(ConfirmDialogContext);

  const [editing, setEditing] = useState<boolean>(false);
  const [newTaskHandler, setNewTaskHandler] = useState<Deferred<Task>>();
  const [isChildrenVisible, setIsChildrenVisible] = useState(true);

  const { data: task, isLoading } = useQuery(["tasks", taskId], () =>
    apiClient.getTask(taskId)
  );

  const { handleSubmit, control, reset } = useForm<EditTaskApi>();

  const { mutate: completeTask } = useMutation(
    (data: EditTaskApi) => apiClient.editTask(data),
    {
      onSuccess: (editedTask) => {
        pushToast({
          title: "Task edited",
          message: editedTask.title,
        });
        queryClient.invalidateQueries(["tasks", taskId]);
      },
    }
  );

  const { mutate: deleteTask } = useMutation(
    (taskId: number) => apiClient.deleteTask(taskId),
    {
      onSuccess: (deletedTask) => {
        pushToast({
          title: "Task deleted",
          message: deletedTask.title,
        });
        queryClient.invalidateQueries(["tasks", taskId]);
      },
    }
  );

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

  const edit = (data: EditTaskApi) => {
    try {
      completeTask(data);
      reset();
    } catch (e) {
    } finally {
      setEditing(false);
    }
  };

  useEffect(() => {
    if (!task) return;
    reset(task);
  }, [task, reset]);

  const onDelete = async (taskId: number, redirect?: boolean) => {
    if (
      await confirm({
        title: "Delete Task ?",
        message: "Are you sure you want to delete this task ?",
      })
    ) {
      deleteTask(taskId);
    }

    if (redirect) goBack();
  };

  return (
    <div className="flex page-content flex-2">
      <div className="task-details">
        <div className="task-content">
          <PageHeader task={task}>
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

              <DropdownItem
                handler={() => {
                  onDelete(task.id, true);
                }}
              >
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

                  <p
                    className="desc"
                    placeholder="Add description"
                    style={{ fontSize: "20px" }}
                  >
                    {task.description}
                  </p>
                </div>
              )}

              {editing && (
                <form onSubmit={handleSubmit(edit)}>
                  <div className="flex flex-column form p-1">
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <FormInput
                          label="Title"
                          variant="dark"
                          {...field}
                          {...fieldState}
                          autoFocus
                        />
                      )}
                    />

                    <Controller
                      name="description"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextArea
                          label="Description"
                          variant="dark"
                          {...field}
                          {...fieldState}
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-2 justify-content-end mt-2">
                    <Button
                      variant="secondary"
                      handler={() => setEditing((prev) => !prev)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </div>
                </form>
              )}

              <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center gap-2">
                  <IconButton
                    handler={() => setIsChildrenVisible((prev) => !prev)}
                  >
                    {!isChildrenVisible && <IoIosArrowForward />}
                    {isChildrenVisible && <IoIosArrowDown />}
                  </IconButton>
                  <h6>Sub-tasks</h6>
                </div>
                <IconButton handler={addTask}>
                  <AiOutlinePlus />
                </IconButton>
              </div>
              {isChildrenVisible && (
                <div className="">
                  {task.children.map((task: Task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      editable={false}
                      completeTask={completeTask}
                      deleteTask={(taskId: number) => onDelete(taskId)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="task-attributes flex flex-column">
          <div className="task-detail-header">
            <PageHeader title="Details" />
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
