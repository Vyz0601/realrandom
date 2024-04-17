import { useRouter } from 'expo-router';
import React from 'react';

import { Cover } from '@/components/cover';
import { useAuth } from '@/core';
import { useIsFirstTime } from '@/core/hooks';
import { Button, FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';
export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const signIn = useAuth.use.signIn();
  const router = useRouter();
  return (
    <View className="flex h-full items-center  justify-center">
      <FocusAwareStatusBar />
      <View className="w-full flex-1">
        <Cover />
      </View>
      <View className="justify-end ">
        <Text className="my-3 text-center text-5xl font-bold">
          Real random application
        </Text>
        <Text className="mb-2 text-center text-lg text-gray-600">
          The right way to get random number
        </Text>

        <Text className="my-1 pt-6 text-left text-lg">🚀 Real random </Text>
        <Text className="my-1 text-left text-lg">🥷 Can not modify result</Text>
        <Text className="my-1 text-left text-lg">
          🧩 Minimal code and dependencies
        </Text>
      </View>
      <SafeAreaView className="mt-6">
        <Button
          label="Let's Get Started "
          onPress={() => {
            setIsFirstTime(false);
            signIn({ access: 'access-token', refresh: 'refresh-token' });
            router.replace('/');
          }}
        />
      </SafeAreaView>
    </View>
  );
}
