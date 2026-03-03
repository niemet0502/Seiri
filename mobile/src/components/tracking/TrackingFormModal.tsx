import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, View } from 'react-native';
import { useThemeColors } from '../../contexts/ThemeContext';
import { spacing } from '../../theme/spacing';
import { Button } from '../common/Button';
import { DatePickerInput } from '../common/DatePickerInput';
import { Input } from '../common/Input';
import { ModalContainer } from '../common/ModalContainer';

interface TrackingFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: TrackingFormData) => Promise<void>;
}

export interface TrackingFormData {
  title: string;
  description?: string;
  target: string;
  dueDate?: string;
}

export const TrackingFormModal: React.FC<TrackingFormModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const colors = useThemeColors();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TrackingFormData>({
    defaultValues: {
      title: '',
      description: '',
      target: '',
      dueDate: '',
    },
  });

  useEffect(() => {
    if (visible) {
      reset({
        title: '',
        description: '',
        target: '',
        dueDate: '',
      });
    }
  }, [visible, reset]);

  const handleFormSubmit = async (data: TrackingFormData) => {
    const targetValue = parseFloat(data.target);
    if (isNaN(targetValue) || targetValue <= 0) {
      Alert.alert('Error', 'Please enter a valid goal value greater than 0');
      return;
    }

    try {
      await onSubmit(data);
      onClose();
      reset();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create tracker');
    }
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} title="New Tracker">
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
              placeholder="e.g. Monthly savings, Reading goal..."
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
              placeholder="Describe what you're tracking"
              multiline
              numberOfLines={3}
              style={{ height: 80 }}
            />
          )}
        />

        <Controller
          control={control}
          name="target"
          rules={{ required: 'Goal is required' }}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Goal"
              value={value}
              onChangeText={onChange}
              placeholder="e.g. 1000"
              keyboardType="numeric"
              error={errors.target?.message}
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
            />
          )}
        />

        <View style={styles.buttonContainer}>
          <Button
            variant="secondary"
            onPress={onClose}
            style={styles.button}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onPress={handleSubmit(handleFormSubmit)}
            style={styles.button}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Create
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
