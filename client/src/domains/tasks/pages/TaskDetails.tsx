import { useMutation } from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";
import { queryClient } from "../../..";
import { Button, IconButton } from "../../../components/Button";
import { Dropdown } from "../../../components/Dropdown";
import { DropdownItem } from "../../../components/DropdownItem";
import { FormInput } from "../../../components/Input";
import { Loader } from "../../../components/Loader";
import { PageHeader } from "../../../components/PageHeader";
import { TaskItem } from "../../../components/TaskItem";
import { TextArea } from "../../../components/TextArea";
import { ApiClientContext } from "../../../provider/apiClientProvider";
import { ConfirmDialogContext } from "../../../provider/confirmDialogProvider";
import { useToasts } from "../../../provider/toastProvider";
import { Task } from "../../../types";
import {
  displayDuedate,
  transformDateToYYYMMDDFormat,
} from "../../../utils/Date";
import { Deferred } from "../../../utils/Deferred";
import { NewTaskDialog } from "../components/NewTaskDialog";
import { useGetTask } from "../hooks/useGetTask";
import { useUpdateTask } from "../hooks/useUpdateTask";

const TaskDetails: React.FC = () => {
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
  const inputDateRef = useRef<HTMLInputElement>(null);

  const { data: task, isLoading } = useGetTask(+taskId);

  const formattedContent = (task?.description || "").replace(/\n/g, "<br>");

  const { handleSubmit, control, reset } = useForm<Task>();

  const { updateTask } = useUpdateTask();

  const { mutate: deleteTask } = useMutation({
    mutationFn: (taskId: number) => apiClient.deleteTask(taskId),
    onSuccess: (deletedTask) => {
      pushToast({
        title: "Task deleted",
        message: deletedTask.title,
      });
      queryClient.invalidateQueries({ queryKey: ["tasks", taskId] });
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

  const edit = (data: Task) => {
    try {
      updateTask(data);
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

  const { status, label } = displayDuedate(task?.dueDate);

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
                        updateTask({
                          ...task,
                          isDone: !task.isDone,
                        })
                      }
                    >
                      <AiOutlineCheck />
                    </div>
                    <span style={{ fontSize: "22px", marginLeft: "9px" }}>
                      {task.title}
                    </span>
                  </div>

                  <div
                    className="desc"
                    placeholder="Add description"
                    style={{ fontSize: "20px" }}
                    dangerouslySetInnerHTML={{ __html: formattedContent }}
                  />
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
                  <h4>Sub-tasks</h4>
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
                      editTask={edit}
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
                <div className="flex align-items-center gap-1">
                  <div
                    style={{
                      width: "17px",
                      height: "17px",
                      flex: "none",
                      borderColor: task.isDone ? "transparent" : "#2c2d3c",
                    }}
                    className={`statut isdone-${task.isDone}`}
                  >
                    <AiOutlineCheck />
                  </div>
                  {task.isDone ? "Completed" : "To do"}
                </div>
              </div>
              <div className=" flex mt-2  attributes">
                <div className="label">Project</div>
                <div>{task.project.name}</div>
              </div>
              <div className=" flex mt-2  attributes ">
                <div className="label mt-1">Due date</div>
                <div className="flex flex-column">
                  <div
                    className="flex flex-1 justify-content-between "
                    style={{ marginTop: "6px" }}
                  >
                    <IconButton
                      handler={() => inputDateRef.current?.showPicker()}
                    >
                      {task.dueDate ? (
                        <span
                          className={`flex align-items-center gap-1 duedate-${status}`}
                          style={{ fontSize: "16px" }}
                        >
                          <MdOutlineDateRange />
                          <p>{label}</p>
                        </span>
                      ) : (
                        <span className="color" style={{ fontSize: "16px" }}>
                          Set date
                        </span>
                      )}
                    </IconButton>

                    {task.dueDate && (
                      <IconButton
                        handler={() => edit({ ...task, dueDate: null })}
                      >
                        <IoCloseSharp />
                      </IconButton>
                    )}
                  </div>
                  <input
                    type="date"
                    ref={inputDateRef}
                    style={{ opacity: "0" }}
                    onChange={(event) =>
                      edit({ ...task, dueDate: event.target.value })
                    }
                    min={transformDateToYYYMMDDFormat(new Date())}
                    value={transformDateToYYYMMDDFormat(
                      new Date(task.dueDate ? task.dueDate : null)
                    )}
                  />
                </div>
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

export default TaskDetails;
