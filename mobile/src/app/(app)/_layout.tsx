import { ActivityIndicator, View } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '@/context/auth-context';

export default function AppLayout() {
  const { session, isLoading } = useAuth();
  if (isLoading) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color="#0284C7" /></View>;
  if (!session) return <Redirect href="/login" />;

  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#0284C7' }}>
    <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
    <Tabs.Screen name="appointments" options={{ title: 'Citas' }} />
    <Tabs.Screen name="patients" options={{ title: 'Pacientes' }} />
    <Tabs.Screen name="reports" options={{ title: 'Reportes' }} />
    <Tabs.Screen name="settings" options={{ title: 'Más' }} />
  </Tabs>;
}
