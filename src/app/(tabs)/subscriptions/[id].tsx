import { Text, View } from 'react-native';

import { Link, useLocalSearchParams } from 'expo-router';

const SubscriptionDetails = () => {

  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Subscription Detail: {id}</Text>
      <Link href='/'>Go Back</Link>
    </View>
  )
}

export default SubscriptionDetails