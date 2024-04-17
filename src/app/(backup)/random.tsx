import React from "react";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

import { ItemsContainer } from "@/components/settings/items-container";
import { LanguageItem } from "@/components/settings/language-item";
import { ThemeItem } from "@/components/settings/theme-item";
import { translate } from "@/core";
import {
  Button,
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
} from "@/ui";

export const StyledSpinner = styled(Animated.View)`
  height: 300px;
  width: 300px;
  margin: 20px;
  border-radius: 90px;
  border-width: 10px;
  border-top-color: "transparent";
  border-right-color: "transparent";
  border-bottom-color: "transparent";
  border-left-color: "red";
`;

export default function Style() {
  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  React.useEffect(() => {
    // `rotation.value = withRepeat(
    // `  withTiming(3600, {
    // `    duration: 10000,
    // `    easing: Easing.linear,
    // `  }),
    // `  200
    // `);
    rotation.value = withTiming(60, {
      duration: 10000,
      easing: Easing.linear,
    });
    return () => cancelAnimation(rotation);
  }, [rotation]);

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <SafeAreaView className="flex-1 px-4">
          <Text className="text-xl font-bold">
            {translate("settings.title")}
          </Text>
          <ItemsContainer title="settings.generale">
            <LanguageItem />
            <ThemeItem />
            <Button
              label="start"
              onPress={() => {
                // rotation.value = withTiming(60, {
                //   duration: 10000,
                //   easing: Easing.linear,
                // });
                rotation.value = withTiming(Math.random() * 1000);
              }}
            />
          </ItemsContainer>
          <StyledSpinner style={[animatedStyles]} />
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
