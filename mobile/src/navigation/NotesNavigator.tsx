import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NoteDetailScreen } from '../screens/notes/NoteDetailScreen';
import { NoteProjectsListScreen } from '../screens/notes/NoteProjectsListScreen';
import { ProjectNotesScreen } from '../screens/notes/ProjectNotesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export const NotesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#0f0f1a' },
      }}
    >
      <Stack.Screen name="NoteProjects" component={NoteProjectsListScreen} />
      <Stack.Screen name="ProjectNotes" component={ProjectNotesScreen} />
      <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
