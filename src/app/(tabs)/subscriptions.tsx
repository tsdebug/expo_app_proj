import { styled } from "nativewind";
import { Text } from 'react-native';
import { SafeAreaView as RNSaftAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSaftAreaView);

const Subscriptions = () => {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text>Subscriptions</Text>
    </SafeAreaView>
  )
}

export default Subscriptions