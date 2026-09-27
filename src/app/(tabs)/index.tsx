import { Link } from 'expo-router';
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSaftAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSaftAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>

      <Link
        href='/onboarding'
        className='mt-4 rounded bg-primary text-white p-4'
      >
        Go to Onboarding
      </Link>

      <Link
        href='/(auth)/signup'
        className='mt-4 rounded bg-primary text-white p-4'
      >
        Go to Sign Up
      </Link>

      <Link
        href='/(auth)/signin'
        className='mt-4 rounded bg-primary text-white p-4'
      >
        Go to Sign In
      </Link>

      <Link
        href='/subscriptions/spotify'
        className='mt-4 rounded bg-primary text-white p-4'
      >
        Spotify Subscription
      </Link>

      <Link
        href='/subscriptions/claude'
        className='mt-4 rounded bg-primary text-white p-4'
      >
        Claude Max Subscription
      </Link>
    </SafeAreaView>
  );
}
