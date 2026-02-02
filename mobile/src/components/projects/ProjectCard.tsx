import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
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
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isDefault && styles.defaultCard,
        { borderLeftColor: project.color || colors.primary },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.icon}>{isDefault ? '⭐' : '📁'}</Text>
          <View style={styles.textContent}>
            <Text style={styles.projectName}>{project.name}</Text>
            {isDefault && (
              <Text style={styles.description}>Default list for all new items</Text>
            )}
            {project.description && !isDefault && (
              <Text style={styles.description}>{project.description}</Text>
            )}
          </View>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{taskCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    borderLeftWidth: 4,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  defaultCard: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderLeftWidth: 4,
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
    fontSize: 24,
    marginRight: spacing.md,
  },
  textContent: {
    flex: 1,
  },
  projectName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  badge: {
    backgroundColor: colors.primary + '30',
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
    color: colors.primary,
  },
});
