import { Button, Text } from 'react-native';
import { ModulePlaceholder } from '@/components/module-placeholder';
import { useAuth } from '@/context/auth-context';

export default function Settings() {
  const { signOut } = useAuth();
  return <ModulePlaceholder title="Configuración" description="Preferencias de la aplicación y perfil de usuario."><Text> </Text><Button title="Cerrar sesión" onPress={signOut} color="#DC2626" /></ModulePlaceholder>;
}
