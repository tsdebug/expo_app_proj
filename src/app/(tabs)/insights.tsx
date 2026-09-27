import { styled } from "nativewind";
import { Text } from 'react-native';
import { SafeAreaView as RNSaftAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSaftAreaView);

const Insights = () => {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text>Insights</Text>
    </SafeAreaView>
  )
}

export default Insights