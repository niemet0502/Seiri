import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeColors } from '../../contexts/ThemeContext';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onPress: () => void;
  taskCount?: number;
  isDefault?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onPress,
  taskCount = 0,
  isDefault = false,
}) => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.backgroundCard },
        isDefault && { borderWidth: 2, borderColor: colors.primary },
        { borderLeftColor: project.color || colors.primary },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Ionicons
            name={isDefault ? 'star' : 'folder-outline'}
            size={24}
            color={isDefault ? colors.warning : colors.textSecondary}
            style={styles.icon}
          />
          <View style={styles.textContent}>
            <Text style={[styles.projectName, { color: colors.text }]}>
              {project.name}
            </Text>
            {isDefault && (
              <Text style={[styles.description, { color: colors.textSecondary }]}>
                Default list for all new items
              </Text>
            )}
            {project.description && !isDefault && (
              <Text style={[styles.description, { color: colors.textSecondary }]}>
                {project.description}
              </Text>
            )}
          </View>
        </View>
        <View style={[styles.badge, { backgroundColor: colors.primary + '30' }]}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>{taskCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    borderLeftWidth: 4,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: spacing.md,
  },
  textContent: {
    flex: 1,
  },
  projectName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs / 2,
  },
  description: {
    fontSize: typography.fontSize.sm,
  },
  badge: {
    borderRadius: borderRadius.full,
    minWidth: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  badgeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
});
