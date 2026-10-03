import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export const SearchBar = ({ value, onChangeText, onClear, placeholder = 'Search by name or phone...' }) => {
 return (
 <View style={styles.container}>
 <Text style={styles.icon}>🔍🔍</Text>
 <TextInput
 style={styles.input}
 value={value}
 onChangeText={onChangeText}
 placeholder={placeholder}
 placeholderTextColor={colors.textMuted}
 autoCorrect={false}
 clearButtonMode="while-editing"
 />
 {value.length > 0 && (
 <TouchableOpacity style={styles.clearBtn} onPress={onClear} hitSlop={{ top: 8, bottom: 8, left: 8,
right: 8 }}>
 <Text style={styles.clearText}>✕</Text>
 </TouchableOpacity>
 )}
 </View>
 );
};
const styles = StyleSheet.create({
 container: {
 flexDirection: 'row',
 alignItems: 'center',
 backgroundColor: colors.surfaceSubtle,
 borderRadius: 12,
 paddingHorizontal: 12,
 height: 44,
 marginHorizontal: 16,
 marginVertical: 10,
 borderWidth: 1,
 borderColor: colors.border,
 },
 icon: {
 fontSize: 15,
 marginRight: 8,
 },
 input: {
 flex: 1,
 fontSize: 15,
 color: colors.textPrimary,
 paddingVertical: 0,
 },
 clearBtn: {
 padding: 4,
 },
 clearText: {
 fontSize: 14,
 color: colors.textSecondary,
 fontWeight: '700',
 }
});