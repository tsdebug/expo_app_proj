import '../../global.css';
import { ClerkProvider, useAuth } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useGlobalSearchParams, usePathname } from "expo-router";
import { useEffect } from "react";
import { PostHogProvider } from "posthog-react-native";
import { posthog } from "../../lib/posthog";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

function RootLayoutContent() {
  const { isLoaded: authLoaded, userId } = useAuth();
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  const [fontsLoaded, fontError] = useFonts({
    'sans-regular': require('../../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'sans-bold': require('../../assets/fonts/PlusJakartaSans-Bold.ttf'),
    'sans-medium': require('../../assets/fonts/PlusJakartaSans-Medium.ttf'),
    'sans-semibold': require('../../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'sans-extrabold': require('../../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'sans-light': require('../../assets/fonts/PlusJakartaSans-Light.ttf')
  });

  const fontsReady = fontsLoaded || !!fontError;

  useEffect(() => {
    if (!authLoaded || !posthog) return;

    if (userId) {
      posthog.identify(userId);
    } else {
      posthog.reset();
    }
  }, [authLoaded, userId]);

  useEffect(() => {
    if (!authLoaded || !posthog) return;

    posthog.screen(pathname, params);
  }, [authLoaded, pathname, params]);

  useEffect(() => {
    // Hide splash once fonts have loaded or failed, and auth is ready.
    if (fontsReady && authLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsReady, authLoaded])

  // Don't render app until fonts and auth are ready
  if (!fontsReady || !authLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {posthog ? (
        <PostHogProvider client={posthog} autocapture={{ captureScreens: false }}>
          <RootLayoutContent />
        </PostHogProvider>
      ) : (
        <RootLayoutContent />
      )}
    </ClerkProvider>
  );
}