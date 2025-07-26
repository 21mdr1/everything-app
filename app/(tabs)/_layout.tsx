import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Header from '@/components/header';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Header />
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
          name="index"
          options={{
            title: 'Menu',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="daily"
          options={{
            title: 'Daily',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="weekly"
          options={{
            title: 'Weekly',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />
          }}
        />
        <Tabs.Screen
          name="packing"
          options={{
            title: 'Packing',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />
          }}
        />
        <Tabs.Screen
          name="storage"
          options={{
            title: 'Storage',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />
          }}
        />
        <Tabs.Screen
          name="projects"
          options={{
            title: 'Projects',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />
          }}
        />
      </Tabs>
    </>
  );
}
