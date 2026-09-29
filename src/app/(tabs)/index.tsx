import { Link } from 'expo-router';
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSaftAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSaftAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-5xl font-sans-extrabold">Home</Text>
      
      <Link
        href='/onboarding'
        className='mt-4 font-sans-bold rounded bg-primary text-white p-4'
      >
        Go to Onboarding
      </Link>

      <Link
        href='/(auth)/signup'
        className='mt-4 font-sans-bold rounded bg-primary text-white p-4'
      >
        Go to Sign Up
      </Link>

      <Link
        href='/(auth)/signin'
        className='mt-4 font-sans-bold rounded bg-primary text-white p-4'
      >
        Go to Sign In
      </Link>
    </SafeAreaView>
  );
}
