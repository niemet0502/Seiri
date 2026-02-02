import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProjectTasksScreen } from '../screens/tasks/ProjectTasksScreen';
import { TaskDetailScreen } from '../screens/tasks/TaskDetailScreen';
import { TaskProjectsListScreen } from '../screens/tasks/TaskProjectsListScreen';

const Stack = createStackNavigator();

export const TasksNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#0f0f1a' },
      }}
    >
      <Stack.Screen name="TaskProjects" component={TaskProjectsListScreen} />
      <Stack.Screen name="ProjectTasks" component={ProjectTasksScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
};
