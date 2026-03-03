import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { useThemeColors } from '../contexts/ThemeContext';
import { borderRadius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const colors = useThemeColors();

  const handleLogout = async () => {
    await logout();
  };

  const getInitial = () => {
    if (user?.firstname) return user.firstname.charAt(0).toUpperCase();
    if (user?.lastname) return user.lastname.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return '?';
  };

  const getFullName = () => {
    const parts = [];
    if (user?.firstname) parts.push(user.firstname);
    if (user?.lastname) parts.push(user.lastname);
    if (parts.length > 0) return parts.join(' ');
    return user?.email || 'User';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: colors.primary, borderColor: colors.backgroundCard }]}>
            <Text style={[styles.avatarText, { color: colors.white }]}>{getInitial()}</Text>
          </View>
        </View>

        <Text style={[styles.fullName, { color: colors.text }]}>{getFullName()}</Text>
        <Text style={[styles.email, { color: colors.textMuted }]}>{user?.email}</Text>

        {/* Settings button */}
        <TouchableOpacity
          style={[styles.settingsButton, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.7}
        >
          <View style={styles.settingsLeft}>
            <Ionicons name="settings-outline" size={22} color={colors.primary} />
            <Text style={[styles.settingsText, { color: colors.text }]}>Paramètres</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutButtonText, { color: colors.white }]}>Logout</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold },
  placeholder: { width: 40 },
  content: { flex: 1, alignItems: 'center', paddingTop: spacing.xxl, paddingHorizontal: spacing.lg },
  avatarContainer: { marginBottom: spacing.xl },
  avatar: {
    width: 120, height: 120, borderRadius: 60,
    justifyContent: 'center', alignItems: 'center', borderWidth: 4,
  },
  avatarText: { fontSize: 48, fontWeight: typography.fontWeight.bold },
  fullName: {
    fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs, textAlign: 'center',
  },
  email: { fontSize: typography.fontSize.base, marginBottom: spacing.xl, textAlign: 'center' },
  settingsButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    width: '100%', paddingHorizontal: spacing.lg, paddingVertical: spacing.md + 2,
    borderRadius: borderRadius.lg, borderWidth: 1, marginBottom: spacing.lg,
  },
  settingsLeft: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
  },
  settingsText: {
    fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium,
  },
  logoutButton: {
    paddingHorizontal: spacing.xl, paddingVertical: spacing.md,
    borderRadius: borderRadius.lg, minWidth: 200, alignItems: 'center', marginTop: spacing.lg,
  },
  logoutButtonText: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold },
});
