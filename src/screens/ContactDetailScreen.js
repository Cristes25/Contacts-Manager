import React from 'react';
import {
 View,
 Text,
 ScrollView,
 StyleSheet,
 Linking,
 Alert
} from 'react-native';
import { colors } from '../theme/colors';
import { Avatar } from '../components/Avatar';
import { ActionButton } from '../components/ActionButton';
export function ContactDetailsScreen({ route }) {
 const { contact } = route.params || {};
 if (!contact) {
 return (
 <View style={styles.errorContainer}>
 <Text style={styles.errorText}>No contact payload provided.</Text>
 </View>
 );
 }
 const phones = contact.phones || contact.phoneNumbers || [];
 const emails = contact.emails || [];
 const primaryPhone = phones[0]?.number;
 const primaryEmail = emails[0]?.email;
 const handleCall = () => {
 if (!primaryPhone) {
 Alert.alert('Unavailable', 'This contact has no registered phone number.');
 return;
 }
 Linking.openURL(`tel:${primaryPhone}`);
 };
 const handleMessage = () => {
 if (!primaryPhone) {
 Alert.alert('Unavailable', 'This contact has no registered phone number.');
 return;
 }
 Linking.openURL(`sms:${primaryPhone}`);
 };
 const handleEmail = () => {
 if (!primaryEmail) {
 Alert.alert('Unavailable', 'This contact has no registered email address.');
 return;
 }
 Linking.openURL(`mailto:${primaryEmail}`);
 };
 return (
 <ScrollView style={styles.container} contentContainerStyle={styles.content}>
 {/* Hero Header */}
 <View style={styles.heroSection}>
 <Avatar name={contact.fullName} size={92} />
 <Text style={styles.heroName}>{contact.fullName || 'Unnamed Contact'}</Text>
 {(contact.jobTitle || contact.company) && (
 <Text style={styles.heroSub}>
 {[contact.jobTitle, contact.company].filter(Boolean).join(' • ')}
 </Text>
 )}
 </View>
 {/* Quick Actions Bar */}
 <View style={styles.actionsBar}>
 <ActionButton icon="📞📞" label="Call" onPress={handleCall} primary />
 <ActionButton icon="💬💬" label="Message" onPress={handleMessage} />
 <ActionButton icon="✉" label="Email" onPress={handleEmail} />
 </View>
 {/* Detail Cards */}
 <View style={styles.card}>
 <Text style={styles.cardHeader}>PHONE NUMBERS</Text>
 {phones.length > 0 ? (
 phones.map((p, idx) => (
 <View key={p.id || idx} style={styles.detailRow}>
 <View>
 <Text style={styles.label}>{p.label?.toUpperCase() || 'MOBILE'}</Text>
 <Text style={styles.value}>{p.number}</Text>
 </View>
 </View>
 ))
 ) : (
 <Text style={styles.emptyCardText}>No phone numbers recorded</Text>
 )}
 </View>
 <View style={styles.card}>
 <Text style={styles.cardHeader}>EMAIL ADDRESSES</Text>
 {emails.length > 0 ? (
 emails.map((e, idx) => (
 <View key={e.id || idx} style={styles.detailRow}>
 <View>
 <Text style={styles.label}>{e.label?.toUpperCase() || 'WORK'}</Text>
 <Text style={styles.value}>{e.email}</Text>
 </View>
 </View>
 ))
 ) : (
 <Text style={styles.emptyCardText}>No email addresses recorded</Text>
 )}
 </View>
 {contact.note && (
 <View style={styles.card}>
 <Text style={styles.cardHeader}>NOTES & ANNOTATIONS</Text>
 <Text style={styles.noteText}>{contact.note}</Text>
 </View>
 )}
 </ScrollView>
 );
}
const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: colors.background,
 },
 content: {
 paddingBottom: 40,
 },
 errorContainer: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 },
 errorText: {
 color: colors.error,
 fontSize: 16,
 },
 heroSection: {
 alignItems: 'center',
 paddingVertical: 24,
 backgroundColor: colors.surface,
 borderBottomWidth: 1,
 borderColor: colors.border,
 },
 heroName: {
 fontSize: 22,
 fontWeight: '700',
 color: colors.textPrimary,
 marginTop: 12,
 },
 heroSub: {
 fontSize: 14,
 color: colors.textSecondary,
 marginTop: 4,
 fontWeight: '500',
 },
 actionsBar: {
 flexDirection: 'row',
 paddingHorizontal: 16,
 marginVertical: 18,
 },
 card: {
 backgroundColor: colors.surface,
 marginHorizontal: 16,
 marginBottom: 14,
 borderRadius: 14,
 padding: 16,
 borderWidth: 1,
 borderColor: colors.border,
 },
 cardHeader: {
 fontSize: 11,
 fontWeight: '700',
 color: colors.secondary,
 letterSpacing: 0.8,
 marginBottom: 10,
 },
 detailRow: {
 paddingVertical: 6,
 borderBottomWidth: StyleSheet.hairlineWidth,
 borderColor: colors.borderLight,
 },
 label: {
 fontSize: 11,
 color: colors.textSecondary,
 fontWeight: '600',
 marginBottom: 2,
 },
 value: {
 fontSize: 15,
 color: colors.textPrimary,
 fontWeight: '500',
 },
 emptyCardText: {
 fontSize: 13,
 color: colors.textMuted,
 fontStyle: 'italic',
 },
 noteText: {
 fontSize: 14,
 color: colors.textPrimary,
 lineHeight: 20,
 }
});