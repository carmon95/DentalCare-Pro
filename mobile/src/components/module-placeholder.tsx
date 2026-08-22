import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/screen';

export function ModulePlaceholder({ title, description, children }: PropsWithChildren<{ title: string; description: string }>) {
  return (
    <Screen>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.note}>Este módulo está listo para conectarse a la API de DentalCare Pro.</Text>
        {children}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: '#0F172A', fontSize: 28, fontWeight: '800', marginBottom: 20 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, gap: 12 },
  description: { color: '#0F172A', fontSize: 17, fontWeight: '600' },
  note: { color: '#64748B', fontSize: 15, lineHeight: 22 },
});
