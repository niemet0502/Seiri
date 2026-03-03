import { Ionicons } from '@expo/vector-icons';
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
import { useThemeColors } from '../../contexts/ThemeContext';
import { useTasks, useUpdateTask } from '../../hooks/useTasks';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Task } from '../../types';

export const ProjectTasksScreen: React.FC<any> = ({ navigation, route }) => {
  const colors = useThemeColors();
  const { project } = route.params;
  const [showCompleted, setShowCompleted] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data: tasks, isLoading, refetch, isRefetching } = useTasks(project.id, showCompleted);
  const { mutate: updateTask } = useUpdateTask();

  if (isLoading) return <LoadingSpinner />;

  const incompleteTasks = tasks?.filter((t: Task) => !t.isDone) || [];
  const completedTasks = tasks?.filter((t: Task) => t.isDone) || [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{project.name}</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={[...incompleteTasks, ...(showCompleted ? completedTasks : [])]}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.primary} />}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => navigation.navigate('TaskDetail', { task: item, project })}
            onToggleComplete={(t: Task) => updateTask({ id: t.id, isDone: !t.isDone })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No tasks yet</Text>
            <Text style={[styles.emptySubtext, { color: colors.textMuted }]}>Tap the + button to create your first task</Text>
          </View>
        }
        ListHeaderComponent={
          completedTasks.length > 0 ? (
            <TouchableOpacity style={styles.toggleCompleted} onPress={() => setShowCompleted(!showCompleted)}>
              <Text style={[styles.toggleText, { color: colors.textSecondary }]}>
                <Ionicons name={showCompleted ? 'chevron-down' : 'chevron-forward'} size={14} color={colors.textSecondary} />
                {' '}Completed ({completedTasks.length})
              </Text>
            </TouchableOpacity>
          ) : null
        }
      />

      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={() => setShowCreateModal(true)}>
        <Ionicons name="add" size={28} color={colors.white} />
      </TouchableOpacity>

      <TaskFormModal visible={showCreateModal} onClose={() => setShowCreateModal(false)} project={project} />
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
  title: { flex: 1, fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold },
  menuButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingHorizontal: spacing.lg, paddingBottom: 100 },
  toggleCompleted: { paddingVertical: spacing.md, marginBottom: spacing.md },
  toggleText: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xxl },
  emptyText: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.xs },
  emptySubtext: { fontSize: typography.fontSize.sm },
  fab: {
    position: 'absolute', bottom: 90, right: spacing.lg, width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center', elevation: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,
  },
});
