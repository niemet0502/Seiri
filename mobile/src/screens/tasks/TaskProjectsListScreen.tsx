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
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ProjectFormModal } from '../../components/projects/ProjectFormModal';
import { useProjects } from '../../hooks/useProjects';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { FeatureEnum, Project } from '../../types';

interface TaskProjectsListScreenProps {
  navigation: any;
}

export const TaskProjectsListScreen: React.FC<TaskProjectsListScreenProps> = ({
  navigation,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data: projects, isLoading, refetch } = useProjects(FeatureEnum.Task, false);

  const handleProjectPress = (project: Project) => {
    navigation.navigate('ProjectTasks', { project });
  };

  const handleCreateProject = () => {
    setShowCreateModal(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Separate default and regular projects
  const defaultProject = projects?.find((p: Project) => p.isDefault);
  const regularProjects = projects?.filter((p: Project) => !p.isDefault) || [];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.icon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Projects List */}
      <FlatList
        data={regularProjects}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={
          defaultProject ? (
            <ProjectCard
              project={defaultProject}
              onPress={() => handleProjectPress(defaultProject)}
              taskCount={defaultProject.tasks?.length || 0}
              isDefault
            />
          ) : null
        }
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onPress={() => handleProjectPress(item)}
            taskCount={item.tasks?.length || 0}
          />
        )}
        ListEmptyComponent={
          !defaultProject ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No projects yet</Text>
              <Text style={styles.emptySubtext}>
                Tap the + button to create your first project
              </Text>
            </View>
          ) : null
        }
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={handleCreateProject}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Create Project Modal */}
      <ProjectFormModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        feature={FeatureEnum.Task}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
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
