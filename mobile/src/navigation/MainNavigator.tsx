import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { NotesNavigator } from './NotesNavigator';
import { TasksNavigator } from './TasksNavigator';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundCard,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.semibold,
        },
      }}
    >
      <Tab.Screen
        name="TasksTab"
        component={TasksNavigator}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="📋" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="NotesTab"
        component={NotesNavigator}
        options={{
          tabBarLabel: 'Notes',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="📝" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Simple icon component using emoji

const TabIcon: React.FC<{ icon: string; color: string; size: number }> = ({
  icon,
}) => {
  return <Text style={{ fontSize: 24 }}>{icon}</Text>;
};
