import { Platform } from 'react-native';
import * as Contacts from 'expo-contacts';
// High-fidelity fallback contacts for simulators and web testing
export const MOCK_CONTACTS = [
 {
 id: 'mock-1',
 fullName: 'Dr. Arthur Pendelton',
 firstName: 'Arthur',
 lastName: 'Pendelton',
 company: 'Quantum Dynamics Inc.',
 jobTitle: 'Principal Research Scientist',
 phoneNumbers: [{ id: 'p1', label: 'mobile', number: '+1 (555) 234-8901' }],
 emails: [{ id: 'e1', label: 'work', email: 'a.pendelton@quantum.io' }],
 note: 'Consultant for high-performance cross-platform mobile architectures.'
 },
 {
 id: 'mock-2',
 fullName: 'Elena Rostova',
 firstName: 'Elena',
 lastName: 'Rostova',
 company: 'CyberCore Systems',
 jobTitle: 'VP of Product Engineering',
 phoneNumbers: [
 { id: 'p2', label: 'mobile', number: '+1 (555) 789-0123' },
 { id: 'p3', label: 'work', number: '+1 (555) 789-0124' }
 ],
 emails: [{ id: 'e2', label: 'work', email: 'elena.rostova@cybercore.net' }],
 note: 'Speaker at Global Mobile Dev Summit 2026.'
 },
 {
 id: 'mock-3',
 fullName: 'Marcus Vance',
 firstName: 'Marcus',
 lastName: 'Vance',
 company: 'Apex Cloud Logistics',
 jobTitle: 'Chief Technical Architect',
 phoneNumbers: [{ id: 'p4', label: 'mobile', number: '+1 (555) 345-6789' }],
 emails: [{ id: 'e3', label: 'personal', email: 'marcus.vance@gmail.com' }],
 note: 'Coordinates native SDK driver bridges.'
 },
 {
 id: 'mock-4',
 fullName: 'Sophia Chen-Valdez',
 firstName: 'Sophia',
 lastName: 'Chen-Valdez',
 company: 'NextGen Mobile Labs',
 jobTitle: 'Lead UX Researcher',
 phoneNumbers: [{ id: 'p5', label: 'mobile', number: '+1 (555) 456-7890' }],
 emails: [{ id: 'e4', label: 'work', email: 'sophia@nextgenlabs.org' }],
 note: 'Specializes in touch ergonomics and accessibility.'
 },
 {
 id: 'mock-5',
 fullName: 'Lucas Santiago',
 firstName: 'Lucas',
 lastName: 'Santiago',
 company: 'Veritas Security Group',
 jobTitle: 'Mobile Security Engineer',
 phoneNumbers: [{ id: 'p6', label: 'mobile', number: '+1 (555) 901-2345' }],
 emails: [{ id: 'e5', label: 'work', email: 'lsantiago@veritas-sec.com' }],
 note: 'Audits native permissions and biometric hardware APIs.'
 }
];
export async function requestContactsPermission() {
 try {
 const { status } = await Contacts.requestPermissionsAsync();
 return status === 'granted';
 } catch (error) {
 console.warn('[ContactsService] Permission request failed:', error);
 return false;
 }
}
export async function checkContactsPermission() {
 try {
 const { status } = await Contacts.getPermissionsAsync();
 return status === 'granted';
 } catch (error) {
 console.warn('[ContactsService] Permission check failed:', error);
 return false;
 }
}
export async function fetchAllContacts() {
 try {
 const isGranted = await requestContactsPermission();
 if (!isGranted) {
 console.log('[ContactsService] Permission denied. Loading mock fallback dataset.');
 return { success: false, data: MOCK_CONTACTS, isMock: true };
 }
 // Expo SDK 57 ExpoContactsNext API query
 const contactList = await Contacts.Contact.getAllDetails(
 [
 Contacts.ContactField.FULL_NAME,
 Contacts.ContactField.GIVEN_NAME,
 Contacts.ContactField.FAMILY_NAME,
 Contacts.ContactField.PHONES,
 Contacts.ContactField.EMAILS,
 Contacts.ContactField.COMPANY,
 Contacts.ContactField.JOB_TITLE,
 Contacts.ContactField.IMAGE,
 Contacts.ContactField.NOTE
 ],
 {
 sortOrder: Contacts.ContactsSortOrder.GivenName
 }
 );
 // If native address book is empty (clean simulator), supply mock data
 if (!contactList || contactList.length === 0) {
 console.log('[ContactsService] Empty address book detected. Supplying mock dataset.');
 return { success: true, data: MOCK_CONTACTS, isMock: true };
 }
 return { success: true, data: contactList, isMock: false };
 } catch (error) {
 console.error('[ContactsService] Error querying native contacts:', error);
 return { success: false, data: MOCK_CONTACTS, isMock: true, error };
 }
}