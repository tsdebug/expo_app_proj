import clsx from "clsx";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tabs, type AppTab } from "../../../constants/data";
import { icons, type IconKey } from "../../../constants/icons";
import { theme } from "../../../constants/theme";

type TabIconProps = {
  focused: boolean;
  icon: IconKey;
};

const TabLayout = () => {
  const insets = useSafeAreaInsets();
  const { tabBar } = theme.components;

  const TabIcon = ({ focused, icon }: TabIconProps) => {
    return (
      <View className="tabs-icon" style={{ justifyContent: "center" }}>
        <View
          className={clsx("tabs-pill", focused && "tabs-active")}
          style={{ marginTop: 26 }}
        >
          <Image
            source={icons[icon]}
            resizeMode="contain"
            className="tabs-glyph"
            style={{ tintColor: focused ? "#ffffff" : "#a5b4c8" }}
          />
        </View>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: 68,
          marginHorizontal: 18,
          borderTopWidth: 0,
          borderRadius: tabBar.radius,
          backgroundColor: "#0b0d12",
          elevation: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 0,
        },
      }}
    >
      {tabs.map((tab: AppTab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={tab.icon} />,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;