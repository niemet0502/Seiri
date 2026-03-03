import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { TaskCard } from '../../components/tasks/TaskCard';
import { TaskFormModal } from '../../components/tasks/TaskFormModal';
import { useThemeColors } from '../../contexts/ThemeContext';
import { useDeleteTask, useTask, useUpdateTask } from '../../hooks/useTasks';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Task } from '../../types';
import { displayDuedate } from '../../utils/date';

export const TaskDetailScreen: React.FC<any> = ({ navigation, route }) => {
  const colors = useThemeColors();
  const { task: initialTask, project } = route.params;
  const { data: task, isLoading, refetch, isRefetching } = useTask(initialTask.id);
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showSubTaskModal, setShowSubTaskModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  if (isLoading || !task) return <LoadingSpinner />;

  const handleToggleComplete = () => {
    updateTask({ id: task.id, isDone: !task.isDone });
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: () => { deleteTask(task.id, { onSuccess: () => navigation.goBack() }); },
      },
    ]);
  };

  const { status, label } = displayDuedate(task.dueDate);

  const getDueDateColor = () => {
    switch (status) {
      case 'overdue': return colors.overdue;
      case 'today': return colors.today;
      case 'tomorrow': return colors.tomorrow;
      case 'week': return colors.week;
      default: return colors.textMuted;
    }
  };

  const subTasks = task.children || [];
  const completedSubTasks = subTasks.filter((t: Task) => t.isDone).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Task Details</Text>
        <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenu(!showMenu)}>
          <Ionicons name="ellipsis-vertical" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {showMenu && (
        <View style={[styles.menuDropdown, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]} onPress={() => { setShowMenu(false); setShowEditModal(true); }}>
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              <Ionicons name="pencil-outline" size={16} color={colors.text} /> Edit Task
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => { setShowMenu(false); handleDelete(); }}>
            <Text style={[styles.menuItemText, { color: colors.error }]}>
              <Ionicons name="trash-outline" size={16} color={colors.error} /> Delete Task
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.primary} />}
      >
        <View style={styles.taskHeader}>
          <TouchableOpacity
            style={[styles.checkbox, { borderColor: colors.border }, task.isDone && { backgroundColor: colors.primary, borderColor: colors.primary }]}
            onPress={handleToggleComplete}
          >
            {task.isDone && <Ionicons name="checkmark" size={16} color={colors.white} />}
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }, task.isDone && { textDecorationLine: 'line-through', color: colors.textMuted }]}>
            {task.title}
          </Text>
        </View>

        <View style={styles.metadata}>
          {task.dueDate && status !== 'none' && (
            <View style={[styles.badge, { backgroundColor: getDueDateColor() + '30' }]}>
              <Text style={[styles.badgeText, { color: getDueDateColor() }]}>
                <Ionicons name="calendar-outline" size={12} color={getDueDateColor()} /> {label}
              </Text>
            </View>
          )}
          {task.isDone && (
            <View style={[styles.completedBadge, { backgroundColor: colors.success + '30' }]}>
              <Text style={[styles.completedBadgeText, { color: colors.success }]}>
                <Ionicons name="checkmark-circle" size={12} color={colors.success} /> Completed
              </Text>
            </View>
          )}
        </View>

        {task.description && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>{task.description}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Project</Text>
          <Text style={[styles.projectName, { color: colors.primary }]}>{project.name}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Sub-tasks ({completedSubTasks}/{subTasks.length})</Text>
            <TouchableOpacity onPress={() => setShowSubTaskModal(true)}>
              <Text style={[styles.addButton, { color: colors.primary }]}>+ Add</Text>
            </TouchableOpacity>
          </View>
          {subTasks.length > 0 ? (
            subTasks.map((subTask: Task) => (
              <TaskCard
                key={subTask.id}
                task={subTask}
                onPress={() => navigation.push('TaskDetail', { task: subTask, project })}
                onToggleComplete={(t: Task) => updateTask({ id: t.id, isDone: !t.isDone })}
              />
            ))
          ) : (
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No sub-tasks yet</Text>
          )}
        </View>
      </ScrollView>

      <TaskFormModal visible={showEditModal} onClose={() => setShowEditModal(false)} project={project} task={task} />
      <TaskFormModal visible={showSubTaskModal} onClose={() => setShowSubTaskModal(false)} project={project} parentTask={task} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.md, gap: spacing.md,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { flex: 1, fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold },
  menuButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  menuDropdown: {
    position: 'absolute', top: 70, right: spacing.lg,
    borderRadius: borderRadius.md, borderWidth: 1, zIndex: 1000, elevation: 5,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4,
  },
  menuItem: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1 },
  menuItemText: { fontSize: typography.fontSize.base },
  content: { flex: 1 },
  contentContainer: { padding: spacing.lg },
  taskHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.md },
  checkbox: {
    width: 28, height: 28, borderRadius: borderRadius.sm, borderWidth: 2,
    marginRight: spacing.md, justifyContent: 'center', alignItems: 'center', marginTop: 2,
  },
  title: { flex: 1, fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, lineHeight: 32 },
  metadata: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  badge: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  badgeText: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold },
  completedBadge: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  completedBadgeText: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold },
  section: { marginBottom: spacing.xl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionTitle: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.sm },
  description: { fontSize: typography.fontSize.base, lineHeight: 24 },
  projectName: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium },
  addButton: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold },
  emptyText: { fontSize: typography.fontSize.sm, fontStyle: 'italic' },
});
