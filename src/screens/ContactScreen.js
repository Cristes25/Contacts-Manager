import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
 View,
 Text,
 FlatList,
 ActivityIndicator,
 RefreshControl,
 StyleSheet,
 StatusBar
} from 'react-native';
import { colors } from '../theme/colors';
import { fetchAllContacts } from '../services/contactsService';
import { ContactListItem } from '../components/ContactListItem';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';
export function ContactsScreen({ navigation }) {
 const [contacts, setContacts] = useState([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [isLoading, setIsLoading] = useState(true);
 const [isRefreshing, setIsRefreshing] = useState(false);
 const [isMockData, setIsMockData] = useState(false);
 const loadData = useCallback(async (refresh = false) => {
 if (refresh) setIsRefreshing(true);
 else setIsLoading(true);
 const result = await fetchAllContacts();
 setContacts(result.data || []);
 setIsMockData(result.isMock);
 setIsLoading(false);
 setIsRefreshing(false);
 }, []);
 useEffect(() => {
 loadData();
 }, [loadData]);
 // Memoized client-side search filter
 const filteredContacts = useMemo(() => {
 if (!searchQuery.trim()) return contacts;
 const query = searchQuery.toLowerCase().trim();
 return contacts.filter(c => {
 const nameMatch = c.fullName?.toLowerCase().includes(query);
 const phoneMatch = (c.phones || c.phoneNumbers)?.some(p => p.number?.includes(query));
 return nameMatch || phoneMatch;
 });
 }, [contacts, searchQuery]);
 const handleContactPress = useCallback((contact) => {
 navigation.navigate('ContactDetails', { contact });
 }, [navigation]);
 const renderItem = useCallback(({ item }) => (
 <ContactListItem contact={item} onPress={handleContactPress} />
 ), [handleContactPress]);
 const keyExtractor = useCallback((item) => item.id || item.fullName, []);
 const renderSeparator = useCallback(() => (
 <View style={styles.separator} />
 ), []);
 if (isLoading) {
 return (
 <View style={styles.centerContainer}>
 <ActivityIndicator size="large" color={colors.primary} />
 <Text style={styles.loadingText}>Synchronizing contacts address book...</Text>
 </View>
 );
 }
 return (
 <View style={styles.screen}>
 <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

 {isMockData && (
 <View style={styles.mockBanner}>
 <Text style={styles.mockBannerText}>
 ℹ Running in Demo Mode (Mock dataset active for testing)
 </Text>
 </View>
 )}
 <SearchBar
 value={searchQuery}
 onChangeText={setSearchQuery}
 onClear={() => setSearchQuery('')}
 />
 <FlatList
 data={filteredContacts}
 renderItem={renderItem}
 keyExtractor={keyExtractor}
 ItemSeparatorComponent={renderSeparator}
 contentContainerStyle={filteredContacts.length === 0 ? styles.emptyContainer : null}
 ListEmptyComponent={
 <EmptyState
 title={searchQuery ? "No Matches Found" : "No Contacts Found"}
 message={searchQuery ? `No contacts matching "${searchQuery}".` : "Your address book is empty."}
 onAction={searchQuery ? () => setSearchQuery('') : () => loadData(true)}
 actionLabel={searchQuery ? "Clear Search" : "Refresh List"}
 />
 }
 refreshControl={
 <RefreshControl
 refreshing={isRefreshing}
 onRefresh={() => loadData(true)}
 colors={[colors.primary]}
 tintColor={colors.primary}
 />
 }
 initialNumToRender={15}
 maxToRenderPerBatch={10}
 windowSize={5}
 removeClippedSubviews={true}
 />
 </View>
 );
 }
const styles = StyleSheet.create({
 screen: {
 flex: 1,
 backgroundColor: colors.background,
 },
 centerContainer: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: colors.background,
 padding: 20,
 },
 loadingText: {
 marginTop: 14,
 fontSize: 14,
 color: colors.textSecondary,
 fontWeight: '500',
 },
 mockBanner: {
 backgroundColor: colors.secondaryLight,
 paddingVertical: 8,
 paddingHorizontal: 16,
 borderBottomWidth: 1,
 borderColor: '#EBD89F',
 },
 mockBannerText: {
 fontSize: 12,
 color: '#8A6812',
 fontWeight: '600',
 textAlign: 'center',
 },
 separator: {
 height: StyleSheet.hairlineWidth,
 backgroundColor: colors.border,
 marginLeft: 76, // Aligns clean with avatar margin
 },
 emptyContainer: {
 flexGrow: 1,
 }
});