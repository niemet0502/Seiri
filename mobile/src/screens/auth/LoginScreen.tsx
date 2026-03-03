import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../contexts/AuthContext';
import { useThemeColors } from '../../contexts/ThemeContext';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const LoginScreen: React.FC<any> = ({ navigation }) => {
  const colors = useThemeColors();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true); setError('');
    try { await login({ email, password }); }
    catch (err: any) { setError(err.response?.data?.message || 'Login failed. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <View style={[styles.logoBorder, { backgroundColor: colors.primary }]} />
              <View style={styles.logoContent}>
                <Image source={require('../../../assets/white-logo.png')} style={styles.logo} resizeMode="contain" />
                <Text style={[styles.appTitle, { color: colors.text }]}>Seiri</Text>
              </View>
              <View style={[styles.logoBorder, { backgroundColor: colors.primary }]} />
            </View>
          </View>

          <View style={styles.formSection}>
            <View style={styles.formHeader}>
              <Text style={[styles.title, { color: colors.text }]}>Sign in to your account</Text>
              <View style={styles.subtitleContainer}>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={[styles.link, { color: colors.primary }]}>Create one</Text>
                </TouchableOpacity>
              </View>
            </View>

            {error ? (
              <View style={[styles.errorContainer, { backgroundColor: colors.error + '20', borderColor: colors.error }]}>
                <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.form}>
              <Input label="Email address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" placeholder="Enter your email" />
              <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" autoComplete="password" placeholder="Enter your password" />
              <Button onPress={handleLogin} loading={loading} disabled={loading}>Sign in</Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: spacing.lg },
  logoSection: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: spacing.xxl },
  logoContainer: { alignItems: 'center' },
  logoBorder: { width: 100, height: 2, marginVertical: spacing.md },
  logoContent: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  logo: { width: 40, height: 40 },
  appTitle: { fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold },
  formSection: { flex: 1.5, justifyContent: 'center', paddingBottom: spacing.xxl },
  formHeader: { marginBottom: spacing.xl },
  title: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.sm },
  subtitleContainer: { flexDirection: 'row', alignItems: 'center' },
  subtitle: { fontSize: typography.fontSize.sm },
  link: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold },
  errorContainer: { borderWidth: 1, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.lg },
  errorText: { fontSize: typography.fontSize.sm },
  form: { gap: spacing.md },
});
