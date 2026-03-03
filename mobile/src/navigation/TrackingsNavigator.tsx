import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useThemeColors } from '../contexts/ThemeContext';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ProjectTrackingsScreen } from '../screens/tracking/ProjectTrackingsScreen';
import { TrackingDetailScreen } from '../screens/tracking/TrackingDetailScreen';
import { TrackingProjectsListScreen } from '../screens/tracking/TrackingProjectsListScreen';

const Stack = createStackNavigator();

export const TrackingsNavigator = () => {
  const colors = useThemeColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="TrackingProjects" component={TrackingProjectsListScreen} />
      <Stack.Screen name="ProjectTrackings" component={ProjectTrackingsScreen} />
      <Stack.Screen name="TrackingDetail" component={TrackingDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
