import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { Avatar } from './Avatar';
export const ContactListItem = React.memo(({ contact, onPress }) => {
 const primaryPhone = contact.phones?.[0]?.number || contact.phoneNumbers?.[0]?.number || 'No phone listed';
 const subtitle = contact.jobTitle || contact.company || primaryPhone;
 return (
 <Pressable
 onPress={() => onPress(contact)}
 style={({ pressed }) => [
 styles.rowContainer,
 pressed && styles.rowPressed
 ]}
 android_ripple={{ color: colors.borderLight }}
 >
 <Avatar name={contact.fullName} size={46} />
 <View style={styles.metaContainer}>
 <Text style={styles.nameText} numberOfLines={1}>{contact.fullName || 'Unnamed Contact'}</Text>
 <Text style={styles.subText} numberOfLines={1}>{subtitle}</Text>
 </View>
 <Text style={styles.chevron}>›</Text>
 </Pressable>
 );
});
const styles = StyleSheet.create({
 rowContainer: {
 flexDirection: 'row',
 alignItems: 'center',
 paddingVertical: 12,
 paddingHorizontal: 16,
 backgroundColor: colors.surface,
 },
 rowPressed: {
 backgroundColor: colors.surfaceSubtle,
 },
 metaContainer: {
 flex: 1,
 marginLeft: 14,
 justifyContent: 'center',
 },
 nameText: {
 fontSize: 16,
 fontWeight: '600',
 color: colors.textPrimary,
 marginBottom: 2,
 },
 subText: {
 fontSize: 13,
 color: colors.textSecondary,
 },
 chevron: {
 fontSize: 22,
 color: colors.textMuted,
 fontWeight: '300',
 marginLeft: 8,
 }
});