import React from "react";
import Modal from "react-native-modal";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

import { ItemsContainer } from "@/components/settings/items-container";
import { translate } from "@/core";
import {
  Button,
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "@/ui";

export const StyledSpinner = styled(Animated.View)`
  height: 64px;
  width: 64px;
  padding: 16px;
  border-radius: 16px;
  border-width: 1px;
  background-color: "red";
`;

export default function Style() {
  const [time, setTime] = React.useState(1);
  const [number1, setNumber1] = React.useState(1);
  const [number2, setNumber2] = React.useState(1);
  const [number3, setNumber3] = React.useState(1);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
    rotation.value = withTiming(600, {
      duration: 100,
      easing: Easing.linear,
    });
    return () => cancelAnimation(rotation);
  }, [rotation]);

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <SafeAreaView className="flex-1 px-4">
          <Text className="text-xl font-bold">{translate("dice.title")}</Text>
          <ItemsContainer title="dice.generale">
            <View className="p-3">
              <Button
                label={translate("start")}
                onPress={() => {
                  toggleModal();
                  setTime(time + 1);
                  rotation.value = withTiming(100000 * time);
                  setNumber1(Math.floor(Math.random() * 6) + 1);
                  setNumber2(Math.floor(Math.random() * 6) + 1);
                  setNumber3(Math.floor(Math.random() * 6) + 1);
                }}
              />
            </View>
            <View className={"flex-1 flex-row justify-between p-4"}>
              <View className={"p-4"}>
                <StyledSpinner
                  style={[{ backgroundColor: "white" }, animatedStyles]}
                >
                  <Text
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {number1}
                  </Text>
                </StyledSpinner>
              </View>
              <View className={"p-4"}>
                <StyledSpinner
                  style={[{ backgroundColor: "white" }, animatedStyles]}
                >
                  <Text
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {number2}
                  </Text>
                </StyledSpinner>
              </View>
              <View className={"p-4"}>
                <StyledSpinner
                  style={[{ backgroundColor: "white" }, animatedStyles]}
                >
                  <Text
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {number3}
                  </Text>
                </StyledSpinner>
              </View>
            </View>
          </ItemsContainer>
          <Modal isVisible={isModalVisible}>
            <View
              style={{ backgroundColor: "white", flex: 1 }}
              className="rounded-md p-4"
            >
              <View className={"flex-1 flex-row justify-between pt-12"}>
                <View className={"p-4"}>
                  <StyledSpinner
                    style={[{ backgroundColor: "white" }, animatedStyles]}
                  >
                    <Text
                      style={{
                        color: "black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {number1}
                    </Text>
                  </StyledSpinner>
                </View>
                <View className={"p-4"}>
                  <StyledSpinner
                    style={[{ backgroundColor: "white" }, animatedStyles]}
                  >
                    <Text
                      style={{
                        color: "black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {number2}
                    </Text>
                  </StyledSpinner>
                </View>
                <View className={"p-4"}>
                  <StyledSpinner
                    style={[{ backgroundColor: "white" }, animatedStyles]}
                  >
                    <Text
                      style={{
                        color: "black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {number3}
                    </Text>
                  </StyledSpinner>
                </View>
              </View>
              <Button label="Done" onPress={toggleModal} />
            </View>
          </Modal>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
