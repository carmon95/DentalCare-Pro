import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/screen';
import { useAuth } from '@/context/auth-context';

export default function Dashboard() {
  const { session } = useAuth();
  return <Screen><Text style={styles.greeting}>Hola, {session?.user.name}</Text><Text style={styles.subtitle}>Resumen de tu clínica</Text><View style={styles.card}><Text style={styles.cardTitle}>Próximo paso</Text><Text style={styles.cardText}>Conectaremos aquí las citas de hoy y los indicadores clave de DentalCare Pro.</Text></View></Screen>;
}

const styles = StyleSheet.create({ greeting: { color: '#0F172A', fontSize: 28, fontWeight: '800' }, subtitle: { color: '#64748B', fontSize: 16, marginTop: 6, marginBottom: 22 }, card: { backgroundColor: '#E0F2FE', borderRadius: 16, padding: 20 }, cardTitle: { color: '#075985', fontSize: 18, fontWeight: '800', marginBottom: 8 }, cardText: { color: '#0C4A6E', fontSize: 15, lineHeight: 22 } });
