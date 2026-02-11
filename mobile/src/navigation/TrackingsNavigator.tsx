import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ProjectTrackingsScreen } from '../screens/tracking/ProjectTrackingsScreen';
import { TrackingProjectsListScreen } from '../screens/tracking/TrackingProjectsListScreen';

const Stack = createStackNavigator();

export const TrackingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#0f0f1a' },
      }}
    >
      <Stack.Screen name="TrackingProjects" component={TrackingProjectsListScreen} />
      <Stack.Screen name="ProjectTrackings" component={ProjectTrackingsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
