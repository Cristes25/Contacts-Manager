import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
export const EmptyState = ({ title, message, onAction, actionLabel }) => {
 return (
 <View style={styles.container}>
 <Text style={styles.icon}>📇📇</Text>
 <Text style={styles.title}>{title}</Text>
 <Text style={styles.message}>{message}</Text>
 {onAction && actionLabel && (
 <TouchableOpacity style={styles.button} onPress={onAction} activeOpacity={0.85}>
 <Text style={styles.buttonText}>{actionLabel}</Text>
 </TouchableOpacity>
 )}
 </View>
 );
};
const styles = StyleSheet.create({
 container: {
 alignItems: 'center',
 justifyContent: 'center',
 paddingVertical: 60,
 paddingHorizontal: 30,
 },
 icon: {
 fontSize: 48,
 marginBottom: 12,
 },
 title: {
 fontSize: 18,
 fontWeight: '700',
 color: colors.textPrimary,
 marginBottom: 6,
 },
 message: {
 fontSize: 14,
 color: colors.textSecondary,
 textAlign: 'center',
 lineHeight: 20,
 marginBottom: 16,
 },
 button: {
 backgroundColor: colors.primary,
 paddingHorizontal: 20,
 paddingVertical: 10,
 borderRadius: 20,
 },
 buttonText: {
 color: colors.textInverse,
 fontWeight: '600',
 fontSize: 14,
 }
});