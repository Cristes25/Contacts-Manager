import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export const ActionButton = ({ icon, label, onPress, primary = false }) => {
 return (
 <TouchableOpacity
 style={[styles.btn, primary ? styles.btnPrimary : styles.btnSecondary]}
 onPress={onPress}
 activeOpacity={0.8}
 >
 <Text style={styles.icon}>{icon}</Text>
 <Text style={[styles.label, primary ? styles.labelPrimary : styles.labelSecondary]}>
 {label}
 </Text>
 </TouchableOpacity>
 );
};
const styles = StyleSheet.create({
 btn: {
 flex: 1,
 alignItems: 'center',
 justifyContent: 'center',
 paddingVertical: 12,
 borderRadius: 14,
 marginHorizontal: 5,
 },
 btnPrimary: {
 backgroundColor: colors.primary,
 },
 btnSecondary: {
 backgroundColor: colors.surface,
 borderWidth: 1,
 borderColor: colors.border,
 },
 icon: {
 fontSize: 20,
 marginBottom: 4,
 },
 label: {
 fontSize: 12,
 fontWeight: '600',
 },
 labelPrimary: {
 color: colors.textInverse,
 },
 labelSecondary: {
 color: colors.textPrimary,
 }
});