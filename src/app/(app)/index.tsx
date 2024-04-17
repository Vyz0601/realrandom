import React, { useState } from "react";
import Modal from "react-native-modal";
import Animated from "react-native-reanimated";
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
  height: 300px;
  width: 300px;
  margin: 20px;
  border-radius: 150px;
  border-width: 10px;
  border-top-color: "transparent";
  border-right-color: "transparent";
  border-bottom-color: "transparent";
  border-left-color: "red";
`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Style() {
  const [randomNumber, setRandomNumber] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [randomTimes, setRandomTimes] = React.useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  React.useEffect(() => {
    if (!running) return;
    if (randomTimes === 0) {
      setRunning(false);
      return;
    }
    (async () => {
      await sleep(100);
      setRandomNumber(parseInt(`${Math.random() * 100}`, 10));
      setRandomTimes(randomTimes - 1);
    })();
  }, [running, randomTimes]);

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <SafeAreaView className="flex-1 px-4">
          <Text className="text-xl font-bold">{translate("number.title")}</Text>
          <ItemsContainer title="number.setting">
            <View className="p-3">
              <Button
                label={running ? translate("running") : translate("start")}
                onPress={async () => {
                  if (running) return;
                  toggleModal();
                  setRunning(true);
                  setRandomTimes(10);
                }}
              />
            </View>
          </ItemsContainer>
          <ItemsContainer title="number.result">
            <View className="p-10">
              <Text className="text-center align-middle text-6xl">
                {randomNumber}
              </Text>
            </View>
          </ItemsContainer>
          <Modal isVisible={isModalVisible}>
            <View
              style={{ backgroundColor: "white", flex: 1 }}
              className="rounded-md p-4"
            >
              <View
                style={{ backgroundColor: "white", flex: 1 }}
                className="p-4"
              >
                <Text className="pt-20 text-center align-middle text-9xl">
                  {randomNumber}
                </Text>
              </View>
              <Button label="Done" onPress={toggleModal} />
            </View>
          </Modal>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
