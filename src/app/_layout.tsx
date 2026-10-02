import { SplashScreen, Stack } from "expo-router";
import '../../global.css';

import { useFonts } from 'expo-font';
import { useEffect } from "react";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync(); // keep the splash screen visible while we fetch resources

export default function RootLayout() {

  // load fonts
  const [fontsLoaded, fontError] = useFonts({
    'sans-regular': require('@/assets/fonts/PlusJakartaSans-Regular.ttf'),
    'sans-bold': require('@/assets/fonts/PlusJakartaSans-Bold.ttf'),
    'sans-medium': require('@/assets/fonts/PlusJakartaSans-Medium.ttf'),
    'sans-semibold': require('@/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'sans-extrabold': require('@/assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'sans-light': require('@/assets/fonts/PlusJakartaSans-Light.ttf'),
  })


  // wait for fonts to load
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) return null;
  if (fontError) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-5">
        <Text className="text-center text-base text-foreground">
          Unable to load the app fonts. Please restart the app and try again.
        </Text>
      </View>
    );
  }

  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{ headerShown: false }}
    />
  );
}
