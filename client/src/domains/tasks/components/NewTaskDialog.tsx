import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { Dialog, DIALOG_CLOSED_REASON } from "../../../components/Dialog";
import { FormInput } from "../../../components/Input";
import { TextArea } from "../../../components/TextArea";
import { CreateTaskApi, Task } from "../../../types";
import { Deferred } from "../../../utils/Deferred";
import { useCreateTask } from "../hooks/useCreateTask";
import { useUpdateTask } from "../hooks/useUpdateTask";

export const NewTaskDialog: React.FC<{
  deferred: Deferred<Task>;
  parentId?: string;
  taskToEdit?: Task;
  projectId: string;
}> = ({ deferred, parentId, taskToEdit, projectId }) => {
  const { handleSubmit, control, reset } = useForm<CreateTaskApi>({
    defaultValues: taskToEdit
      ? taskToEdit
      : { parentId: parentId || undefined },
  });

  const { createTask } = useCreateTask();
  const { updateTask, data: updatedTask } = useUpdateTask();

  const submit = async (data: CreateTaskApi) => {
    try {
      if (taskToEdit) {
        updateTask({
          ...data,
          id: taskToEdit.id,
          isDone: taskToEdit.isDone,
          completedAt: taskToEdit.completedAt,
        });
        deferred.resolve(updatedTask);
      } else {
        deferred.resolve(await createTask({ ...data, projectId }));
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
            name="dueDate"
            control={control}
            rules={{ required: false }}
            render={({ field, fieldState }) => (
              <FormInput
                label="Due date"
                type="date"
                variant="dark"
                {...field}
                {...fieldState}
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
          <Button type="submit">{taskToEdit ? "Save" : "Create"}</Button>
        </div>
      </form>
    </Dialog>
  );
};
