import { Redirect, SplashScreen, Tabs } from "expo-router";
import React, { useCallback, useEffect } from "react";

import { useAuth, useIsFirstTime } from "@/core";
import { Settings as SettingsIcon } from "@/ui/icons";
import { Dice as DiceIcon } from "@/ui/icons";
import { Num as NumIcon } from "@/ui/icons";
import { Abc as AbcIcon } from "@/ui/icons";

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  // const hideSplash = useCallback(async () => {
  //   await SplashScreen.hideAsync();
  // }, []);
  // useEffect(() => {
  //   if (status !== 'idle') {
  //     setTimeout(() => {
  //       hideSplash();
  //     }, 1000);
  //   }
  // }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === "signOut") {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Number",
          headerShown: false,
          tabBarIcon: ({ color }) => <NumIcon color={color} />,
          tabBarTestID: "index-tab",
        }}
      />
      <Tabs.Screen
        name="dice"
        options={{
          title: "Dice",
          headerShown: false,
          tabBarIcon: ({ color }) => <DiceIcon color={color} />,
          tabBarTestID: "dice-tab",
        }}
      />
      <Tabs.Screen
        name="name"
        options={{
          title: "Name",
          headerShown: false,
          tabBarIcon: ({ color }) => <AbcIcon color={color} />,
          tabBarTestID: "name-tab",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Setting",
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarTestID: "setting-tab",
        }}
      />
    </Tabs>
  );
}
