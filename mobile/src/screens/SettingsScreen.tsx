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
import { useTheme, useThemeColors } from '../contexts/ThemeContext';
import { borderRadius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeOption {
  key: ThemeMode;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const themeOptions: ThemeOption[] = [
  { key: 'light', label: 'Mode clair', icon: 'sunny-outline' },
  { key: 'dark', label: 'Mode sombre', icon: 'moon-outline' },
  { key: 'system', label: 'Système', icon: 'settings-outline' },
];

interface LanguageOption {
  key: string;
  label: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  { key: 'fr', label: 'Français', flag: '🇫🇷' },
  { key: 'en', label: 'English', flag: '🇬🇧' },
];

export const SettingsScreen: React.FC<any> = ({ navigation }) => {
  const colors = useThemeColors();
  const { mode, setMode } = useTheme();

  // Language is static for now — ready for future i18n
  const selectedLanguage = 'fr';

  const accentColor = '#10b981';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={accentColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Paramètres</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* ── Appearance Section ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="color-palette-outline" size={20} color={accentColor} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Apparence</Text>
          </View>
          <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
            Choisissez le mode d'affichage de l'application.
          </Text>

          <View style={styles.optionsList}>
            {themeOptions.map((option) => {
              const isSelected = mode === option.key;
              return (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.optionCard,
                    {
                      backgroundColor: isSelected ? accentColor + '15' : colors.backgroundCard,
                      borderColor: isSelected ? accentColor : colors.border,
                    },
                  ]}
                  onPress={() => setMode(option.key)}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionLeft}>
                    <View
                      style={[
                        styles.optionIconContainer,
                        { backgroundColor: isSelected ? accentColor + '20' : colors.backgroundLight },
                      ]}
                    >
                      <Ionicons
                        name={option.icon}
                        size={20}
                        color={isSelected ? accentColor : colors.textMuted}
                      />
                    </View>
                    <Text
                      style={[
                        styles.optionLabel,
                        { color: isSelected ? accentColor : colors.text },
                        isSelected && styles.optionLabelSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={[styles.checkCircle, { backgroundColor: accentColor }]}>
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Language Section ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="globe-outline" size={20} color={accentColor} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Langue</Text>
          </View>
          <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
            Choisissez la langue de l'application.
          </Text>

          <View style={styles.optionsList}>
            {languageOptions.map((option) => {
              const isSelected = selectedLanguage === option.key;
              return (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.optionCard,
                    {
                      backgroundColor: isSelected ? accentColor + '15' : colors.backgroundCard,
                      borderColor: isSelected ? accentColor : colors.border,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionLeft}>
                    <View
                      style={[
                        styles.optionIconContainer,
                        { backgroundColor: isSelected ? accentColor + '20' : colors.backgroundLight },
                      ]}
                    >
                      <Text style={styles.flagText}>{option.flag}</Text>
                    </View>
                    <Text
                      style={[
                        styles.optionLabel,
                        { color: isSelected ? accentColor : colors.text },
                        isSelected && styles.optionLabelSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={[styles.checkCircle, { backgroundColor: accentColor }]}>
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  placeholder: { width: 40 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: 40,
  },
  // Sections
  section: {
    marginBottom: spacing.xl + spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  sectionSubtitle: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.md,
  },
  // Options
  optionsList: {
    gap: spacing.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  optionLabelSelected: {
    fontWeight: typography.fontWeight.semibold,
  },
  flagText: {
    fontSize: 20,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
