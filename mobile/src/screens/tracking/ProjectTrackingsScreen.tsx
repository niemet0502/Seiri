import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
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
import { TrackingCard } from '../../components/tracking/TrackingCard';
import {
    TrackingFormData,
    TrackingFormModal,
} from '../../components/tracking/TrackingFormModal';
import { useThemeColors } from '../../contexts/ThemeContext';
import { useTrackingStorage } from '../../hooks/useTrackingStorage';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const ProjectTrackingsScreen: React.FC<any> = ({ navigation, route }) => {
  const colors = useThemeColors();
  const { project } = route.params;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data: trackings, isLoading, refetch, createTracking } = useTrackingStorage(project.id);

  const totalBalance = useMemo(
    () => trackings.reduce((sum, t) => sum + Number(t.balance), 0),
    [trackings],
  );

  const handleCreateTracking = async (formData: TrackingFormData) => {
    await createTracking({
      title: formData.title,
      description: formData.description,
      target: parseFloat(formData.target),
      dueDate: formData.dueDate,
    });
  };

  if (isLoading) return <LoadingSpinner />;

  const renderSummaryCard = () => (
    <View style={[styles.summaryCard, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
      <View style={styles.summaryHeader}>
        <Ionicons name="trending-up" size={20} color={colors.primary} />
        <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>{project.name}</Text>
      </View>
      <Text style={[styles.summaryAmount, { color: colors.text }]}>
        {totalBalance.toLocaleString('fr-FR')}
      </Text>
      <TouchableOpacity
        style={[styles.createButton, { backgroundColor: colors.primary }]}
        onPress={() => setShowCreateModal(true)}
        activeOpacity={0.8}
      >
        <Text style={[styles.createButtonText, { color: colors.white }]}>
          <Ionicons name="add" size={16} color={colors.white} />   Create new tracker
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>{project.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={trackings}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor={colors.primary} />}
        ListHeaderComponent={renderSummaryCard}
        renderItem={({ item }) => (
          <TrackingCard
            tracking={item}
            onPress={() => navigation.navigate('TrackingDetail', { trackingId: item.id, projectId: project.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyTitle, { color: colors.textSecondary }]}>No trackers yet</Text>
            <Text style={[styles.emptySubtext, { color: colors.textMuted }]}>Tap the button above to create your first tracker</Text>
          </View>
        }
      />

      <TrackingFormModal visible={showCreateModal} onClose={() => setShowCreateModal(false)} onSubmit={handleCreateTracking} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.md, borderBottomWidth: 1,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: {
    flex: 1, fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold,
    textAlign: 'center', marginHorizontal: spacing.md,
  },
  placeholder: { width: 40 },
  summaryCard: { borderRadius: borderRadius.xl, padding: spacing.lg, marginBottom: spacing.lg, borderWidth: 1 },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  summaryLabel: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium },
  summaryAmount: { fontSize: typography.fontSize['4xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.md },
  createButton: { borderRadius: borderRadius.full, paddingVertical: spacing.md, alignItems: 'center', justifyContent: 'center' },
  createButtonText: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.bold },
  listContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 40 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xxl },
  emptyTitle: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.xs },
  emptySubtext: { fontSize: typography.fontSize.sm, textAlign: 'center' },
});
