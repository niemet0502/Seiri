import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { Dialog, DIALOG_CLOSED_REASON } from "../../../components/Dialog";
import { FormInput } from "../../../components/Input";
import { TextArea } from "../../../components/TextArea";
import { currentFeatureContext } from "../../../provider/currentFeatureProvider";
import { CreateProject, Project } from "../../../types";
import { Deferred } from "../../../utils/Deferred";
import { useCreateProject } from "../hooks/useCreateProject";
import { useUpdateProject } from "../hooks/useProjectUpdate";

export const ProjectFormModal: React.FC<{
  deferred: Deferred<Project>;
  projectToEdit?: Project;
}> = ({ deferred, projectToEdit }) => {
  const { feature: handledObject } = useContext(currentFeatureContext);

  const { createProject } = useCreateProject();
  const { updateProject } = useUpdateProject();

  const { control, handleSubmit, reset } = useForm<CreateProject>({
    defaultValues: projectToEdit
      ? {
          name: projectToEdit.name,
          description: projectToEdit.description,
          handledObject,
        }
      : { handledObject },
  });

  const submit = (data: CreateProject) => {
    if (projectToEdit) {
      updateProject({ ...data, id: projectToEdit.id });
    } else {
      createProject(data);
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
                autoFocus={true}
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
          <Button type="submit">{projectToEdit ? "Save" : "Create"}</Button>
        </div>
      </form>
    </Dialog>
  );
};
