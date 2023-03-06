import { useCallback, useContext, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiDotsHorizontalRounded, BiTaskX } from "react-icons/bi";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../..";
import { Button, IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { PageHeader } from "../../components/PageHeader";
import { TaskItem } from "../../components/TaskItem";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { EditTaskApi, Task } from "../../types";
import { Deferred } from "../../utils/Deferred";
import { NewTaskDialog } from "./NewTaskDialog";

export const TasksList: React.FC = () => {
  const querykey = ["tasks"];

  const { projectId } = useParams<{ projectId: string }>();
  const { apiClient } = useContext(ApiClientContext);

  const [newTaskHandler, setNewTaskHandler] = useState<Deferred<Task>>();

  const { isLoading, data } = useQuery([querykey, projectId], () =>
    apiClient.getTasksByProject(projectId)
  );

  const { mutate: completeTask } = useMutation(
    (data: EditTaskApi) => apiClient.editTask(data),
    {
      onSuccess: () => {
        //add toast
        queryClient.invalidateQueries([querykey, projectId]);
      },
    }
  );

  const tasks = data || [];

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
              {tasks.map((task: Task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  editable={true}
                  completeTask={(data: EditTaskApi) => completeTask(data)}
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
                Organize your life. Achieve more every day by creating a task
              </p>
              <Button handler={addTask}>
                <AiOutlinePlus /> Create task
              </Button>
            </div>
          )}
        </div>

        {newTaskHandler && projectId && (
          <NewTaskDialog deferred={newTaskHandler} projectId={projectId} />
        )}
      </div>
    </div>
  );
};
