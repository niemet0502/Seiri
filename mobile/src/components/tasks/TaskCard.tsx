import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeColors } from '../../contexts/ThemeContext';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Task } from '../../types';
import { displayDuedate } from '../../utils/date';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggleComplete?: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  onToggleComplete,
}) => {
  const colors = useThemeColors();
  const { status, label } = displayDuedate(task.dueDate);

  const getDueDateColor = () => {
    switch (status) {
      case 'overdue':
        return colors.overdue;
      case 'today':
        return colors.today;
      case 'tomorrow':
        return colors.tomorrow;
      case 'week':
        return colors.week;
      default:
        return colors.textMuted;
    }
  };

  const childrenCount = task.children?.length || 0;
  const completedChildren = task.children?.filter((t) => t.isDone).length || 0;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.backgroundCard, borderColor: colors.border },
        task.isDone && styles.completedCard,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            { borderColor: colors.border },
            task.isDone && { backgroundColor: colors.primary, borderColor: colors.primary },
          ]}
          onPress={() => onToggleComplete?.(task)}
        >
          {task.isDone && (
            <Ionicons name="checkmark" size={14} color={colors.white} />
          )}
        </TouchableOpacity>

        <View style={styles.taskContent}>
          <Text
            style={[
              styles.title,
              { color: colors.text },
              task.isDone && { textDecorationLine: 'line-through', color: colors.textMuted },
            ]}
          >
            {task.title}
          </Text>

          <View style={styles.metadata}>
            {task.dueDate && status !== 'none' && !task.isDone && (
              <View style={[styles.badge, { backgroundColor: getDueDateColor() + '30' }]}>
                <Text style={[styles.badgeText, { color: getDueDateColor() }]}>
                  {label}
                </Text>
              </View>
            )}

            {childrenCount > 0 && (
              <View style={[styles.subtaskBadge, { backgroundColor: colors.backgroundLight }]}>
                <Text style={[styles.subtaskText, { color: colors.textSecondary }]}>
                  <Ionicons name="people-outline" size={12} color={colors.textSecondary} />{' '}
                  {completedChildren}/{childrenCount}
                </Text>
              </View>
            )}

            {task.isDone && (
              <View style={[styles.completedBadge, { backgroundColor: colors.success + '30' }]}>
                <Text style={[styles.completedBadgeText, { color: colors.success }]}>
                  Completed
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  completedCard: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  taskContent: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  subtaskBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
  },
  subtaskText: {
    fontSize: typography.fontSize.xs,
  },
  completedBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
  },
  completedBadgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
});
