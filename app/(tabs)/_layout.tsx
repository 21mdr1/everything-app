import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="daily"
          options={{
            title: 'Daily',
            // tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
            tabBarIcon: ({ color }) => <FontAwesome5 name="clipboard" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="weekly"
          options={{
            title: 'Weekly',
            // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />
            tabBarIcon: ({ color }) => <AntDesign name="calendar" size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name="projects"
          options={{
            title: 'Projects',
            // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />
            tabBarIcon: ({ color }) => <AntDesign name="folderopen" size={24} color={color} />
          }}
        />
      </Tabs>
    </>
  );
}
