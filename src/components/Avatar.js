import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export const Avatar = React.memo(({ name, imageUri, size = 48 }) => {
 const getInitials = (fullName) => {
 if (!fullName) return '?';
 const parts = fullName.trim().split(' ');
 if (parts.length >= 2) {
 return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
 }
 return fullName.substring(0, 2).toUpperCase();
 };
 const getColorFromName = (str) => {
 if (!str) return colors.avatarPalette[0];
 let hash = 0;
 for (let i = 0; i < str.length; i++) {
 hash = str.charCodeAt(i) + ((hash << 5) - hash);
 }
 const index = Math.abs(hash) % colors.avatarPalette.length;
 return colors.avatarPalette[index];
 };
 const backgroundColor = getColorFromName(name);
 const fontSize = size * 0.4;
 if (imageUri) {
 return (
 <Image
 source={{ uri: imageUri }}
 style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
 />
 );
 }
 return (
 <View
 style={[
 styles.avatar,
 styles.initialsContainer,
 { width: size, height: size, borderRadius: size / 2, backgroundColor }
 ]}
 >
 <Text style={[styles.initialsText, { fontSize }]}>{getInitials(name)}</Text>
 </View>
 );
});
const styles = StyleSheet.create({
 avatar: {
 alignItems: 'center',
 justifyContent: 'center',
 },
 initialsContainer: {
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 1 },
 shadowOpacity: 0.1,
 shadowRadius: 2,
 elevation: 2,
 },
 initialsText: {
 color: '#FFFFFF',
 fontWeight: '700',
 }
});