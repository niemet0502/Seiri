import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeColors } from '../../contexts/ThemeContext';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Tracking } from '../../types';

interface TrackingCardProps {
  tracking: Tracking;
  onPress?: () => void;
}

export const TrackingCard: React.FC<TrackingCardProps> = ({
  tracking,
  onPress,
}) => {
  const colors = useThemeColors();

  const percentage = tracking.target > 0
    ? Math.min(Math.round((tracking.balance / tracking.target) * 100), 100)
    : 0;

  const getProgressColor = () => {
    if (percentage >= 100) return colors.success;
    if (percentage >= 60) return colors.primary;
    if (percentage >= 30) return colors.warning;
    return colors.error;
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {tracking.title}
        </Text>
        <Text style={[styles.percentage, { color: colors.primary }]}>{percentage}%</Text>
      </View>

      {/* Description */}
      {tracking.description ? (
        <Text style={[styles.description, { color: colors.textMuted }]} numberOfLines={1}>
          {tracking.description}
        </Text>
      ) : null}

      {/* Progress bar */}
      <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${percentage}%`,
              backgroundColor: getProgressColor(),
            },
          ]}
        />
      </View>

      {/* Values row */}
      <View style={styles.valuesRow}>
        <Text style={styles.valuesText}>
          <Text style={[styles.currentValue, { color: colors.text }]}>
            {Number(tracking.balance).toLocaleString('fr-FR')}
          </Text>
          <Text style={[styles.separator, { color: colors.textMuted }]}> / </Text>
          <Text style={[styles.goalValue, { color: colors.textSecondary }]}>
            {Number(tracking.target).toLocaleString('fr-FR')}
          </Text>
        </Text>
        {tracking.dueDate ? (
          <View style={styles.dueDateRow}>
            <Ionicons name="calendar-outline" size={12} color={colors.textMuted} />
            <Text style={[styles.dueDate, { color: colors.textMuted }]}>
              {' '}{new Date(tracking.dueDate).toLocaleDateString()}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginRight: spacing.sm,
  },
  percentage: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  description: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.sm,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  valuesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valuesText: {
    fontSize: typography.fontSize.sm,
  },
  currentValue: {
    fontWeight: typography.fontWeight.semibold,
  },
  separator: {},
  goalValue: {},
  dueDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: typography.fontSize.xs,
  },
});
