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
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ProjectFormModal } from '../../components/projects/ProjectFormModal';
import { useThemeColors } from '../../contexts/ThemeContext';
import { useProjects } from '../../hooks/useProjects';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { FeatureEnum, Project } from '../../types';

export const NoteProjectsListScreen: React.FC<any> = ({ navigation }) => {
  const colors = useThemeColors();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data: projects, isLoading, refetch } = useProjects(FeatureEnum.Note, false);

  if (isLoading) return <LoadingSpinner />;

  const defaultProject = projects?.find((p: Project) => p.isDefault);
  const regularProjects = projects?.filter((p: Project) => !p.isDefault) || [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Notes</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={regularProjects}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor={colors.primary} />}
        ListHeaderComponent={
          defaultProject ? (
            <ProjectCard
              project={defaultProject}
              onPress={() => navigation.navigate('ProjectNotes', { project: defaultProject })}
              taskCount={defaultProject.notes?.length || 0}
              isDefault
            />
          ) : null
        }
        renderItem={({ item }) => (
          <ProjectCard project={item} onPress={() => navigation.navigate('ProjectNotes', { project: item })} taskCount={item.notes?.length || 0} />
        )}
        ListEmptyComponent={
          !defaultProject ? (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No projects yet</Text>
              <Text style={[styles.emptySubtext, { color: colors.textMuted }]}>Tap the + button to create your first project</Text>
            </View>
          ) : null
        }
      />

      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={() => setShowCreateModal(true)}>
        <Ionicons name="add" size={28} color={colors.white} />
      </TouchableOpacity>

      <ProjectFormModal visible={showCreateModal} onClose={() => setShowCreateModal(false)} feature={FeatureEnum.Note} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.md,
  },
  title: { fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold },
  headerIcons: { flexDirection: 'row', gap: spacing.sm },
  iconButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingHorizontal: spacing.lg, paddingBottom: 100 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xxl },
  emptyText: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.xs },
  emptySubtext: { fontSize: typography.fontSize.sm },
  fab: {
    position: 'absolute', bottom: 90, right: spacing.lg, width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center', elevation: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,
  },
});
