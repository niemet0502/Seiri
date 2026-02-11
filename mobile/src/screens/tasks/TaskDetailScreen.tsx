import React, { useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { TaskCard } from '../../components/tasks/TaskCard';
import { TaskFormModal } from '../../components/tasks/TaskFormModal';
import { useDeleteTask, useTask, useUpdateTask } from '../../hooks/useTasks';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Task } from '../../types';
import { displayDuedate } from '../../utils/date';

export const TaskDetailScreen: React.FC<any> = ({ navigation, route }) => {
  const { task: initialTask, project } = route.params;
  const { data: task, isLoading, refetch, isRefetching } = useTask(initialTask.id);
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showSubTaskModal, setShowSubTaskModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  if (isLoading || !task) {
    return <LoadingSpinner />;
  }

  const handleToggleComplete = () => {
    updateTask({
      id: task.id,
      isDone: !task.isDone,
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(task.id, {
              onSuccess: () => {
                navigation.goBack();
              },
            });
          },
        },
      ]
    );
  };

  const handleRefresh = async () => {
    await refetch();
  };

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

  const subTasks = task.children || [];
  const completedSubTasks = subTasks.filter((t: Task) => t.isDone).length;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowMenu(!showMenu)}
        >
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Dropdown */}
      {showMenu && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setShowMenu(false);
              setShowEditModal(true);
            }}
          >
            <Text style={styles.menuItemText}>✏️ Edit Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemDanger]}
            onPress={() => {
              setShowMenu(false);
              handleDelete();
            }}
          >
            <Text style={[styles.menuItemText, styles.menuItemDangerText]}>
              🗑️ Delete Task
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Task Header */}
        <View style={styles.taskHeader}>
          <TouchableOpacity
            style={[styles.checkbox, task.isDone && styles.checkboxChecked]}
            onPress={handleToggleComplete}
          >
            {task.isDone && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={[styles.title, task.isDone && styles.titleCompleted]}>
            {task.title}
          </Text>
        </View>

        {/* Metadata */}
        <View style={styles.metadata}>
          {task.dueDate && status !== 'none' && (
            <View style={[styles.badge, { backgroundColor: getDueDateColor() + '30' }]}>
              <Text style={[styles.badgeText, { color: getDueDateColor() }]}>
                📅 {label}
              </Text>
            </View>
          )}
          {task.isDone && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>✓ Completed</Text>
            </View>
          )}
        </View>

        {/* Description */}
        {task.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        )}

        {/* Project Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project</Text>
          <Text style={styles.projectName}>{project.name}</Text>
        </View>

        {/* Sub-tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Sub-tasks ({completedSubTasks}/{subTasks.length})
            </Text>
            <TouchableOpacity onPress={() => setShowSubTaskModal(true)}>
              <Text style={styles.addButton}>+ Add</Text>
            </TouchableOpacity>
          </View>

          {subTasks.length > 0 ? (
            subTasks.map((subTask: Task) => (
              <TaskCard
                key={subTask.id}
                task={subTask}
                onPress={() =>
                  navigation.push('TaskDetail', { task: subTask, project })
                }
                onToggleComplete={(t: Task) =>
                  updateTask({ id: t.id, isDone: !t.isDone })
                }
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No sub-tasks yet</Text>
          )}
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <TaskFormModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        project={project}
        task={task}
      />

      {/* Sub-task Modal */}
      <TaskFormModal
        visible={showSubTaskModal}
        onClose={() => setShowSubTaskModal(false)}
        project={project}
        parentTask={task}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.text,
  },
  headerTitle: {
    flex: 1,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: colors.text,
  },
  menuDropdown: {
    position: 'absolute',
    top: 70,
    right: spacing.lg,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 1000,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  menuItem: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemDanger: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: typography.fontSize.base,
    color: colors.text,
  },
  menuItemDangerText: {
    color: colors.error,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  checkbox: {
    width: 28,
    height: 28,
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
    fontSize: 16,
    fontWeight: typography.fontWeight.bold,
  },
  title: {
    flex: 1,
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    lineHeight: 32,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  badgeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  completedBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.success + '30',
  },
  completedBadgeText: {
    fontSize: typography.fontSize.sm,
    color: colors.success,
    fontWeight: typography.fontWeight.semibold,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  projectName: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  addButton: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  emptyText: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});
