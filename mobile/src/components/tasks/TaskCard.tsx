import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
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
      style={[styles.card, task.isDone && styles.completedCard]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.checkbox, task.isDone && styles.checkboxChecked]}
          onPress={() => onToggleComplete?.(task)}
        >
          {task.isDone && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        <View style={styles.taskContent}>
          <Text style={[styles.title, task.isDone && styles.completedTitle]}>
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
              <View style={styles.subtaskBadge}>
                <Text style={styles.subtaskText}>
                  👥 {completedChildren}/{childrenCount}
                </Text>
              </View>
            )}

            {task.isDone && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedBadgeText}>Completed</Text>
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
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
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
    borderColor: colors.border,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
  },
  taskContent: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
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
    backgroundColor: colors.backgroundLight,
  },
  subtaskText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  completedBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.success + '30',
  },
  completedBadgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.success,
    fontWeight: typography.fontWeight.semibold,
  },
});
