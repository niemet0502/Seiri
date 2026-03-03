import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColors } from '../../contexts/ThemeContext';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { transformDate } from '../../utils/date';

export const NoteDetailScreen: React.FC<any> = ({ navigation, route }) => {
  const colors = useThemeColors();
  const { note, project } = route.params;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Note</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.text }]}>{note.title}</Text>

        <View style={styles.metadata}>
          <Text style={[styles.metadataText, { color: colors.textMuted }]}>Updated {transformDate(note.updatedAt)}</Text>
          <Text style={[styles.metadataText, { color: colors.textMuted }]}>•</Text>
          <Text style={[styles.projectName, { color: colors.primary }]}>{project.name}</Text>
        </View>

        <View style={[styles.contentSection, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
          <Text style={[styles.noteContent, { color: colors.text }]}>{note.content || 'No content'}</Text>
        </View>
      </ScrollView>
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
  headerTitle: { flex: 1, fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold },
  menuButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing.lg },
  title: { fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.md },
  metadata: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  metadataText: { fontSize: typography.fontSize.sm },
  projectName: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium },
  contentSection: { borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 1 },
  noteContent: { fontSize: typography.fontSize.base, lineHeight: 24 },
});
