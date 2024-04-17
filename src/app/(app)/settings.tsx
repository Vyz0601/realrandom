import { Env } from "@env";

import { Item } from "@/components/settings/item";
import { ItemsContainer } from "@/components/settings/items-container";
import { LanguageItem } from "@/components/settings/language-item";
import { ThemeItem } from "@/components/settings/theme-item";
import { translate } from "@/core";
import { FocusAwareStatusBar, ScrollView, Text, View } from "@/ui";

export default function Settings() {
  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <Text className="text-xl font-bold">
            {translate("settings.title")}
          </Text>
          <ItemsContainer title="settings.generale">
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>
        </View>
      </ScrollView>
    </>
  );
}
