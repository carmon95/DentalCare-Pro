import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/auth-context';
import { Screen } from '@/components/screen';

export default function Login() {
  const { session, signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (session) return <Redirect href="/(app)" />;

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      Alert.alert('Datos requeridos', 'Ingresa tu usuario y contraseña.');
      return;
    }
    setSubmitting(true);
    try {
      await signIn(username.trim(), password);
    } catch (error) {
      Alert.alert('No fue posible iniciar sesión', error instanceof Error ? error.message : 'Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.brand}><Text style={styles.logo}>🦷</Text><Text style={styles.title}>DentalCare Pro</Text><Text style={styles.subtitle}>Tu clínica, siempre contigo.</Text></View>
      <View style={styles.form}>
        <Text style={styles.label}>Usuario</Text><TextInput value={username} onChangeText={setUsername} autoCapitalize="none" placeholder="Ej. admin" style={styles.input} />
        <Text style={styles.label}>Contraseña</Text><TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Tu contraseña" style={styles.input} />
        <Button title={submitting ? 'Ingresando...' : 'Iniciar sesión'} onPress={handleLogin} disabled={submitting} color="#0284C7" />
      </View>
      <Text style={styles.help}>Configura EXPO_PUBLIC_API_URL con la dirección de tu servidor antes de probar en un teléfono físico.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', gap: 32 }, brand: { alignItems: 'center', gap: 8 }, logo: { fontSize: 48 }, title: { color: '#0F172A', fontSize: 30, fontWeight: '800' }, subtitle: { color: '#64748B', fontSize: 16 }, form: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, gap: 10 }, label: { color: '#334155', fontWeight: '700', marginTop: 4 }, input: { borderColor: '#CBD5E1', borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 8 }, help: { color: '#64748B', fontSize: 13, lineHeight: 19, textAlign: 'center' },
});
