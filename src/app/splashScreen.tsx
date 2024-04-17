import * as Updates from "expo-updates";
import React, { useEffect } from "react";
import { Animated, Easing, LogBox, Platform, View, Image } from "react-native";
import ReactNativeBlobUtil from "react-native-blob-util";
import DeviceInfo, { getBundleId } from "react-native-device-info";
import { useRouter, Redirect } from "expo-router";
import { useAuth, useIsFirstTime } from "@/core";
import * as SplashScreenExpo from "expo-splash-screen";
SplashScreenExpo.hideAsync();

function Splash(props: any) {
  const router = useRouter();
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const fetchUpdateAsync = async () => {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      // return <Redirect href="/onboarding" />;
    }
  };

  // const getTokenApp = async () => {
  //   try {
  //     const authStatus = await messaging().requestPermission();
  //     await messaging().registerDeviceForRemoteMessages();

  //     let tokenNotification = await messaging().getToken();
  //     console.log("tokenNotification", tokenNotification);
  //   } catch (error) {
  //     console.log("tokenNotification_error", error);
  //   }
  // };

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        return fetchUpdateAsync();
      }
      // return <Redirect href="/onboarding" />;
    } catch (error) {
      // return <Redirect href="/onboarding" />;
    }
  }
  useEffect(() => {
    // getTokenApp();
    setTimeout(() => {
      onFetchUpdateAsync();
    }, 1200);
  }, []);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === "signOut") {
    return <Redirect href="/login" />;
  }

  return (
    <View className="flex h-full items-center  justify-center">
      <Image
        source={require("../../assets/splash.png")}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}

export default Splash;
