import React, { useState } from "react";
import { Platform, View } from "react-native";
import Modal from "react-native-modal";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import { ItemsContainer } from "@/components/settings/items-container";
import { translate } from "@/core";
import {
  Button,
  FocusAwareStatusBar,
  Input,
  SafeAreaView,
  ScrollView,
  Text,
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
  const [randomNameInput, setRandomNameInput] = React.useState("");
  const [randomName, setRandomName] = React.useState("");
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
      const array = randomNameInput.split("\n");

      // Generate a random index between 0 and array length - 1
      const randomIndex = Math.floor(Math.random() * array.length);

      // Retrieve the random item from the array
      const randomItem = array[randomIndex];

      setRandomName(randomItem);
      setRandomTimes(randomTimes - 1);
    })();
  }, [running, randomTimes, randomNameInput]);

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <SafeAreaView className="flex-1 p-4">
          <Text className="text-xl font-bold">{translate("name.title")}</Text>
          <ItemsContainer title="name.setting">
            <View className="p-4">
              <Input
                multiline={true}
                numberOfLines={Platform.OS === "ios" ? undefined : 4}
                onChangeText={setRandomNameInput}
              />
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
            <View className="p-3">
              <Text className="text-center align-middle text-3xl">
                {randomName}
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
                <Text className="pt-20 text-center align-middle text-8xl">
                  {randomName}
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
