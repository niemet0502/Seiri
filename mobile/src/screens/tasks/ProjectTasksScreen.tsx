import React, { useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { TaskCard } from '../../components/tasks/TaskCard';
import { TaskFormModal } from '../../components/tasks/TaskFormModal';
import { useTasks, useUpdateTask } from '../../hooks/useTasks';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Task } from '../../types';

export const ProjectTasksScreen: React.FC<any> = ({
  navigation,
  route,
}) => {
  const { project } = route.params;
  const [showCompleted, setShowCompleted] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data: tasks, isLoading, refetch, isRefetching } = useTasks(project.id, showCompleted);
  const { mutate: updateTask } = useUpdateTask();

  const handleTaskPress = (task: Task) => {
    navigation.navigate('TaskDetail', { task, project });
  };

  const handleToggleComplete = (task: Task) => {
    updateTask({
      id: task.id,
      isDone: !task.isDone,
    });
  };

  const handleCreateTask = () => {
    setShowCreateModal(true);
  };

  const handleRefresh = async () => {
    await refetch();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const incompleteTasks = tasks?.filter((t: Task) => !t.isDone) || [];
  const completedTasks = tasks?.filter((t: Task) => t.isDone) || [];

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
        <Text style={styles.title} numberOfLines={1}>
          {project.name}
        </Text>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Tasks List */}
      <FlatList
        data={[...incompleteTasks, ...(showCompleted ? completedTasks : [])]}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => handleTaskPress(item)}
            onToggleComplete={handleToggleComplete}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the + button to create your first task
            </Text>
          </View>
        }
        ListHeaderComponent={
          completedTasks.length > 0 ? (
            <TouchableOpacity
              style={styles.toggleCompleted}
              onPress={() => setShowCompleted(!showCompleted)}
            >
              <Text style={styles.toggleText}>
                {showCompleted ? '▼' : '▶'} Completed ({completedTasks.length})
              </Text>
            </TouchableOpacity>
          ) : null
        }
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={handleCreateTask}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Create Task Modal */}
      <TaskFormModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        project={project}
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
  title: {
    flex: 1,
    fontSize: typography.fontSize['2xl'],
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
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  toggleCompleted: {
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  toggleText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.semibold,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
});
