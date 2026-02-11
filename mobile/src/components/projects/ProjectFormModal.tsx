import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, View } from 'react-native';
import { useCreateProject, useUpdateProject } from '../../hooks/useProjects';
import { spacing } from '../../theme/spacing';
import { FeatureEnum, Project } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { ModalContainer } from '../common/ModalContainer';

interface ProjectFormModalProps {
  visible: boolean;
  onClose: () => void;
  feature: FeatureEnum; // 1 for Tasks, 2 for Notes
  project?: Project;
}

interface ProjectFormData {
  name: string;
  description?: string;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  visible,
  onClose,
  feature,
  project,
}) => {
  const isEditing = !!project;

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>({
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
    },
  });

  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (visible) {
      reset({
        name: project?.name || '',
        description: project?.description || '',
      });
    }
  }, [visible, project, reset]);

  const onSubmit = (data: ProjectFormData) => {
    if (isEditing && project) {
      const payload: any = {
        id: project.id,
        name: data.name,
      };

      // Only include description if it has a value
      if (data.description?.trim()) {
        payload.description = data.description;
      }

      updateProject(payload, {
        onSuccess: () => {
          onClose();
          reset();
        },
        onError: (error: any) => {
          Alert.alert('Error', error.response?.data?.message || 'Failed to update project');
        },
      });
    } else {
      const payload: any = {
        name: data.name,
        handledObject: feature,
      };

      // Only include description if it has a value
      if (data.description?.trim()) {
        payload.description = data.description;
      }

      createProject(payload, {
        onSuccess: () => {
          onClose();
          reset();
        },
        onError: (error: any) => {
          Alert.alert('Error', error.response?.data?.message || 'Failed to create project');
        },
      });
    }
  };

  const getTitle = () => {
    let type = 'Task';
    if (feature === FeatureEnum.Note) {
      type = 'Note';
    } else if (feature === FeatureEnum.Tracking) {
      type = 'Tracking';
    }
    return isEditing ? `Edit ${type} Project` : `Create ${type} Project`;
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} title={getTitle()}>
      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Project name is required' }}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Project Name"
              value={value}
              onChangeText={onChange}
              placeholder="Enter project name"
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Description (optional)"
              value={value}
              onChangeText={onChange}
              placeholder="Enter project description"
              multiline
              numberOfLines={3}
              style={{ height: 80 }}
            />
          )}
        />

        <View style={styles.buttonContainer}>
          <Button
            variant="secondary"
            onPress={onClose}
            style={styles.button}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            loading={isLoading}
            disabled={isLoading}
          >
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </View>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
  },
});
