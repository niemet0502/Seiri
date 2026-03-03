import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeColors } from '../../contexts/ThemeContext';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Note } from '../../types';
import { transformDate } from '../../utils/date';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPress }) => {
  const colors = useThemeColors();
  const preview = note.content
    ? note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '')
    : 'No content';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {note.title}
        </Text>
        <Text style={[styles.preview, { color: colors.textSecondary }]} numberOfLines={2}>
          {preview}
        </Text>
        <Text style={[styles.date, { color: colors.textMuted }]}>
          {transformDate(note.updatedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  preview: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  date: {
    fontSize: typography.fontSize.xs,
  },
});
