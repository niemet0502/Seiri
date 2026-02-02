import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useCreateTask, useUpdateTask } from '../../hooks/useTasks';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Project, Task } from '../../types';
import { Button } from '../common/Button';
import { DatePickerInput } from '../common/DatePickerInput';
import { Input } from '../common/Input';
import { ModalContainer } from '../common/ModalContainer';

interface TaskFormModalProps {
  visible: boolean;
  onClose: () => void;
  project: Project;
  task?: Task;
  parentTask?: Task;
}

interface TaskFormData {
  title: string;
  description?: string;
  dueDate?: string;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  visible,
  onClose,
  project,
  task,
  parentTask,
}) => {
  const isEditing = !!task;
  const isSubTask = !!parentTask;

  const { control, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      dueDate: task?.dueDate ? (typeof task.dueDate === 'string' ? task.dueDate : task.dueDate.toISOString().split('T')[0]) : '',
    },
  });

  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (visible) {
      reset({
        title: task?.title || '',
        description: task?.description || '',
        dueDate: task?.dueDate ? (typeof task.dueDate === 'string' ? task.dueDate : task.dueDate.toISOString().split('T')[0]) : '',
      });
    }
  }, [visible, task, reset]);

  const onSubmit = (data: TaskFormData) => {
    if (isEditing && task) {
      const payload: any = {
        id: task.id,
        title: data.title,
      };
      
      // Only include description if it has a value
      if (data.description?.trim()) {
        payload.description = data.description;
      }
      
      // Only include dueDate if it has a value
      if (data.dueDate?.trim()) {
        payload.dueDate = new Date(data.dueDate);
      }
      
      updateTask(payload, {
        onSuccess: () => {
          onClose();
          reset();
        },
        onError: (error: any) => {
          Alert.alert('Error', error.response?.data?.message || 'Failed to update task');
        },
      });
    } else {
      const payload: any = {
        title: data.title,
        projectId: project.id,
      };
      
      // Only include description if it has a value
      if (data.description?.trim()) {
        payload.description = data.description;
      }
      
      // Only include dueDate if it has a value
      if (data.dueDate?.trim()) {
        payload.dueDate = new Date(data.dueDate);
      }
      
      // Only include parentId if creating a sub-task
      if (parentTask?.id) {
        payload.parentId = parentTask.id;
      }
      
      createTask(payload, {
        onSuccess: () => {
          onClose();
          reset();
        },
        onError: (error: any) => {
          Alert.alert('Error', error.response?.data?.message || 'Failed to create task');
        },
      });
    }
  };

  const getTitle = () => {
    if (isEditing) return 'Edit Task';
    if (isSubTask) return 'Create Sub-task';
    return 'Create Task';
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} title={getTitle()}>
      <View style={styles.form}>
        <Controller
          control={control}
          name="title"
          rules={{ required: 'Title is required' }}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Title"
              value={value}
              onChangeText={onChange}
              placeholder="Enter task title"
              error={errors.title?.message}
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
              placeholder="Enter task description"
              multiline
              numberOfLines={3}
              style={{ height: 80 }}
            />
          )}
        />

        <Controller
          control={control}
          name="dueDate"
          render={({ field: { onChange, value } }) => (
            <DatePickerInput
              label="Due Date (optional)"
              value={value}
              onChange={onChange}
              placeholder="Select due date"
              error={errors.dueDate?.message}
            />
          )}
        />

        {isSubTask && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              This will be a sub-task of: {parentTask?.title}
            </Text>
          </View>
        )}

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
  infoBox: {
    backgroundColor: colors.primary + '20',
    borderRadius: spacing.sm,
    padding: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
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
