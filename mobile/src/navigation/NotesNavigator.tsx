import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useThemeColors } from '../contexts/ThemeContext';
import { NoteDetailScreen } from '../screens/notes/NoteDetailScreen';
import { NoteProjectsListScreen } from '../screens/notes/NoteProjectsListScreen';
import { ProjectNotesScreen } from '../screens/notes/ProjectNotesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createStackNavigator();

export const NotesNavigator = () => {
  const colors = useThemeColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="NoteProjects" component={NoteProjectsListScreen} />
      <Stack.Screen name="ProjectNotes" component={ProjectNotesScreen} />
      <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
