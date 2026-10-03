import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { ContactsScreen } from '../screens/ContactScreen';
import { ContactDetailsScreen } from '../screens/ContactDetailScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.textInverse,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          title: 'Contacts Directory',
        }}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetailsScreen}
        options={({ route }) => ({
          title: route.params?.contact?.fullName || 'Contact Profile',
          headerBackTitle: 'Back',
        })}
      />
    </Stack.Navigator>
  );
}