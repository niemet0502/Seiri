import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { queryClient } from "../..";
import { Button } from "../../components/Button";
import { Dialog, DIALOG_CLOSED_REASON } from "../../components/Dialog";
import { FormInput } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { ApiClientContext } from "../../provider/apiClientProvider";
import { CreateProject, Project } from "../../types";
import { Deferred } from "../../utils/Deferred";

export const ProjectModal: React.FC<{
  deferred: Deferred<void>;
  projectToEdit?: Project;
}> = ({ deferred, projectToEdit }) => {
  const { apiClient } = useContext(ApiClientContext);
  const { control, handleSubmit, reset } = useForm<CreateProject>({
    defaultValues: projectToEdit
      ? { name: projectToEdit.name, description: projectToEdit.description }
      : undefined,
  });

  const { mutate: addProjectMutation } = useMutation(
    (data: CreateProject) => apiClient.addProject(data),
    {
      onSuccess: (newProject) => {
        deferred.resolve(newProject);
        reset();
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  const { mutate: editProjectMutation } = useMutation(
    (data: CreateProject) => apiClient.addProject(data),
    {
      onSuccess: (newProject) => {
        deferred.resolve(newProject);
        reset();
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );

  const submit = async (data: CreateProject) => {
    try {
      if (projectToEdit) {
        addProjectMutation(data);
      } else {
        editProjectMutation(data);
      }

      // display toast
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Dialog
      title={
        projectToEdit ? `Edit Project "${projectToEdit.name}"` : "New Project"
      }
      onClose={() => deferred.reject(DIALOG_CLOSED_REASON)}
    >
      <form onSubmit={handleSubmit(submit)}>
        <div className="p-2 flex flex-column gap-2">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormInput
                label="Name"
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
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Dialog>
  );
};
