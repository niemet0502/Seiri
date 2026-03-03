import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColors } from '../../contexts/ThemeContext';
import { useTrackingStorage } from '../../hooks/useTrackingStorage';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { TrackingHistory } from '../../types';

export const TrackingDetailScreen: React.FC<any> = ({ navigation, route }) => {
  const colors = useThemeColors();
  const { trackingId, projectId } = route.params;
  const { getTracking, updateTracking, addTransaction, refetch } = useTrackingStorage(projectId);

  const tracking = getTracking(trackingId);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(tracking?.title || '');
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [editedTarget, setEditedTarget] = useState(tracking?.target?.toString() || '');
  const [amountText, setAmountText] = useState('');

  useEffect(() => {
    if (tracking) {
      setEditedTitle(tracking.title);
      setEditedTarget(tracking.target?.toString() || '');
    }
  }, [tracking?.title, tracking?.target]);

  if (!tracking) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Tracker not found</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>
    );
  }

  const percentage = tracking.target > 0
    ? Math.min(Math.round((Number(tracking.balance) / Number(tracking.target)) * 100), 100) : 0;

  const getProgressColor = () => {
    if (percentage >= 100) return colors.success;
    if (percentage >= 60) return colors.primary;
    if (percentage >= 30) return colors.warning;
    return colors.error;
  };

  const handleSaveTitle = async () => {
    if (editedTitle.trim() && editedTitle !== tracking.title) {
      await updateTracking(tracking.id, { title: editedTitle.trim() });
      await refetch();
    }
    setIsEditingTitle(false);
  };

  const handleSaveTarget = async () => {
    const targetValue = parseFloat(editedTarget);
    if (!isNaN(targetValue) && targetValue > 0 && targetValue !== tracking.target) {
      await updateTracking(tracking.id, { target: targetValue });
      await refetch();
    } else if (isNaN(targetValue) || targetValue <= 0) {
      Alert.alert('Error', 'Please enter a valid target greater than 0');
      setEditedTarget(tracking.target?.toString() || '');
    }
    setIsEditingTarget(false);
  };

  const handleAddAmount = async () => {
    const amount = parseFloat(amountText);
    if (isNaN(amount) || amount === 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    await addTransaction(tracking.id, amount);
    await refetch();
    setAmountText('');
  };

  const history = [...(tracking.history || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const renderHistoryItem = ({ item }: { item: TrackingHistory }) => {
    const isPositive = item.amount >= 0;
    return (
      <View style={[styles.historyItem, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
        <View style={styles.historyLeft}>
          <View style={[styles.historyDot, { backgroundColor: isPositive ? colors.success : colors.error }]} />
          <View>
            <Text style={[styles.historyAmount, { color: colors.text }]}>
              {isPositive ? '+' : ''}{Number(item.amount).toLocaleString('fr-FR')}
            </Text>
            <Text style={[styles.historyDate, { color: colors.textMuted }]}>
              {new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>Tracker Details</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* Title (editable) */}
            <View style={styles.titleSection}>
              {isEditingTitle ? (
                <View style={styles.editTitleRow}>
                  <TextInput
                    style={[styles.titleInput, { color: colors.text, borderBottomColor: colors.primary }]}
                    value={editedTitle}
                    onChangeText={setEditedTitle}
                    autoFocus
                    onBlur={handleSaveTitle}
                    onSubmitEditing={handleSaveTitle}
                    returnKeyType="done"
                    placeholderTextColor={colors.textMuted}
                  />
                  <TouchableOpacity style={[styles.saveTitleButton, { backgroundColor: colors.primary }]} onPress={handleSaveTitle}>
                    <Ionicons name="checkmark" size={20} color={colors.white} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={() => setIsEditingTitle(true)}>
                  <View style={styles.titleRow}>
                    <Text style={[styles.title, { color: colors.text }]}>{tracking.title}</Text>
                    <Ionicons name="pencil-outline" size={16} color={colors.textMuted} />
                  </View>
                </TouchableOpacity>
              )}
              {tracking.description ? (
                <Text style={[styles.description, { color: colors.textMuted }]}>{tracking.description}</Text>
              ) : null}
            </View>

            {/* Progress card */}
            <View style={[styles.progressCard, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
              <View style={styles.progressValues}>
                <Text style={[styles.balanceAmount, { color: colors.text }]}>
                  {Number(tracking.balance).toLocaleString('fr-FR')}
                </Text>
                {isEditingTarget ? (
                  <View style={styles.editTargetRow}>
                    <Text style={[styles.targetSlash, { color: colors.textMuted }]}> / </Text>
                    <TextInput
                      style={[styles.targetInput, { color: colors.text, borderBottomColor: colors.primary }]}
                      value={editedTarget}
                      onChangeText={setEditedTarget}
                      autoFocus
                      keyboardType="numeric"
                      onBlur={handleSaveTarget}
                      onSubmitEditing={handleSaveTarget}
                      returnKeyType="done"
                      placeholderTextColor={colors.textMuted}
                    />
                    <TouchableOpacity style={[styles.saveTargetButton, { backgroundColor: colors.primary }]} onPress={handleSaveTarget}>
                      <Ionicons name="checkmark" size={16} color={colors.white} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => setIsEditingTarget(true)} style={styles.targetTouchable}>
                    <Text style={[styles.targetAmount, { color: colors.textMuted }]}>
                      / {Number(tracking.target).toLocaleString('fr-FR')}
                    </Text>
                    <Ionicons name="pencil-outline" size={14} color={colors.textMuted} style={{ marginLeft: 4 }} />
                  </TouchableOpacity>
                )}
              </View>
              <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
                <View style={[styles.progressBarFill, { width: `${percentage}%`, backgroundColor: getProgressColor() }]} />
              </View>
              <Text style={[styles.percentageText, { color: getProgressColor() }]}>{percentage}%</Text>
            </View>

            {/* Add amount */}
            <View style={[styles.addAmountCard, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Add amount</Text>
              <View style={styles.addAmountRow}>
                <TextInput
                  style={[styles.amountInput, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                  value={amountText}
                  onChangeText={setAmountText}
                  placeholder="e.g. 500 or -100"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  returnKeyType="done"
                  onSubmitEditing={handleAddAmount}
                />
                <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={handleAddAmount} activeOpacity={0.8}>
                  <Text style={[styles.addButtonText, { color: colors.white }]}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* History header */}
            <View style={styles.historyHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Transactions</Text>
              <Text style={[styles.historyCount, { color: colors.textMuted }]}>
                {history.length} {history.length === 1 ? 'entry' : 'entries'}
              </Text>
            </View>
          </>
        }
        renderItem={renderHistoryItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No transactions yet</Text>
            <Text style={[styles.emptySubtext, { color: colors.textMuted }]}>Add an amount above to get started</Text>
          </View>
        }
      />
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
    flex: 1, fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold,
    textAlign: 'center', marginHorizontal: spacing.md,
  },
  placeholder: { width: 40 },
  listContent: { padding: spacing.lg, paddingBottom: 40 },
  titleSection: { marginBottom: spacing.lg },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  title: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold },
  description: { fontSize: typography.fontSize.base, marginTop: spacing.xs },
  editTitleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  titleInput: { flex: 1, fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, borderBottomWidth: 2, paddingBottom: spacing.xs },
  saveTitleButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: borderRadius.md },
  progressCard: { borderRadius: borderRadius.xl, padding: spacing.lg, marginBottom: spacing.lg, borderWidth: 1 },
  progressValues: { flexDirection: 'row', alignItems: 'baseline', marginBottom: spacing.md },
  balanceAmount: { fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold },
  targetAmount: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.medium, marginLeft: spacing.xs },
  editTargetRow: { flexDirection: 'row', alignItems: 'center', marginLeft: spacing.xs },
  targetSlash: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.medium },
  targetInput: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.medium, borderBottomWidth: 2, paddingBottom: 2, minWidth: 80 },
  saveTargetButton: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: borderRadius.sm, marginLeft: spacing.xs },
  targetTouchable: { flexDirection: 'row', alignItems: 'center' },
  progressBarContainer: { height: 10, borderRadius: borderRadius.full, overflow: 'hidden', marginBottom: spacing.sm },
  progressBarFill: { height: '100%', borderRadius: borderRadius.full },
  percentageText: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.bold, textAlign: 'right' },
  addAmountCard: { borderRadius: borderRadius.xl, padding: spacing.lg, marginBottom: spacing.lg, borderWidth: 1 },
  addAmountRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  amountInput: { flex: 1, borderWidth: 1, borderRadius: borderRadius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 4, fontSize: typography.fontSize.base, minHeight: 48 },
  addButton: { borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, justifyContent: 'center', alignItems: 'center', minHeight: 48 },
  addButtonText: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.bold },
  sectionTitle: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  historyCount: { fontSize: typography.fontSize.sm },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1 },
  historyLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  historyDot: { width: 10, height: 10, borderRadius: 5 },
  historyAmount: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold },
  historyDate: { fontSize: typography.fontSize.xs, marginTop: 2 },
  emptyContainer: { alignItems: 'center', paddingVertical: spacing.xl },
  emptyText: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.xs },
  emptySubtext: { fontSize: typography.fontSize.sm },
});
