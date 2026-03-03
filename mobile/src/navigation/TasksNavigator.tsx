import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useThemeColors } from '../contexts/ThemeContext';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ProjectTasksScreen } from '../screens/tasks/ProjectTasksScreen';
import { TaskDetailScreen } from '../screens/tasks/TaskDetailScreen';
import { TaskProjectsListScreen } from '../screens/tasks/TaskProjectsListScreen';

const Stack = createStackNavigator();

export const TasksNavigator = () => {
  const colors = useThemeColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="TaskProjects" component={TaskProjectsListScreen} />
      <Stack.Screen name="ProjectTasks" component={ProjectTasksScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
