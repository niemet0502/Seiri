import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { queryClient } from "../..";
import { Button } from "../../components/Button";
import { Dialog, DIALOG_CLOSED_REASON } from "../../components/Dialog";
import { FormInput } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { CreateTaskApi, EditTaskApi, Task } from "../../types";
import { Deferred } from "../../utils/Deferred";

export const NewTaskDialog: React.FC<{
  deferred: Deferred<Task>;
  parentId?: string;
  taskToEdit?: Task;
  projectId: string;
}> = ({ deferred, parentId, taskToEdit, projectId }) => {
  const { apiClient } = useContext(ApiClientContext);

  const { handleSubmit, control, reset } = useForm<CreateTaskApi>({
    defaultValues: taskToEdit
      ? taskToEdit
      : { projectId, parentId: parentId || undefined },
  });

  const { mutate: createTask } = useMutation(
    (data: CreateTaskApi) => apiClient.createTask(data),
    {
      onSuccess: (newTask) => {
        deferred.resolve(newTask);
        reset();
        if (parentId) {
          queryClient.invalidateQueries(["tasks", parentId]);
        } else {
          queryClient.invalidateQueries([["tasks"], projectId]);
        }
      },
    }
  );

  const { mutate: editTask } = useMutation(
    (data: EditTaskApi) => apiClient.editTask(data),
    {
      onSuccess: () => {
        //add toast
        deferred.resolve(taskToEdit as Task);
        queryClient.invalidateQueries([["tasks"], projectId]);
      },
    }
  );

  const submit = (data: CreateTaskApi) => {
    try {
      if (taskToEdit) {
        editTask({ ...data, id: taskToEdit.id } as EditTaskApi);
      } else {
        createTask(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      title={parentId ? "New subtask" : taskToEdit ? "Edit Task" : "New Task"}
      onClose={() => deferred.reject(DIALOG_CLOSED_REASON)}
    >
      <form onSubmit={handleSubmit(submit)}>
        <div className="p-2 flex flex-column gap-2">
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

        <div className="flex gap-2 justify-content-end p-2 mt-2">
          <Button
            variant="secondary"
            handler={() => deferred.reject(DIALOG_CLOSED_REASON)}
          >
            Cancel
          </Button>
          <Button>Create</Button>
        </div>
      </form>
    </Dialog>
  );
};
