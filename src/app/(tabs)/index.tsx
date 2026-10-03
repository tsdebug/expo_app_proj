import CreateSubscriptionModal from "../../../components/CreateSubscriptionModal";
import ListHeading from "../../../components/ListHeading";
import SubscriptionCard from "../../../components/SubscriptionCard";
import UpcomingSubscriptionCard from "../../../components/UpcomingSubscriptionCard";
import {
  HOME_BALANCE,
  HOME_USER,
  UPCOMING_SUBSCRIPTIONS,
} from "../../../constants/data";
import { icons } from "../../../constants/icons";
import images from "../../../constants/images";
import { useSubscriptionStore, addSubscription } from "../../../lib/subscriptionStore";
import { formatCurrency } from "../../../lib/utils";
import { posthog } from "../../../lib/posthog";
import dayjs from "dayjs";
import { styled } from "nativewind";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

function HomeHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <>
      <View className="home-header">
        <View className="home-user">
          <Image source={images.avatar} className="home-avatar" />
          <Text className="home-user-name">{HOME_USER.name}</Text>
        </View>
        <Pressable accessibilityLabel="Add subscription" onPress={onAdd}>
          <Image source={icons.add} className="home-add-icon" />
        </Pressable>
      </View>

      <View className="home-balance-card">
        <Text className="home-balance-label">Balance</Text>
        <View className="home-balance-row">
          <Text className="home-balance-amount">{formatCurrency(HOME_BALANCE.amount)}</Text>
          <Text className="home-balance-date">
            {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
          </Text>
        </View>
      </View>

      <View className="mb-5">
        <ListHeading title="Upcoming" />
        <FlatList
          data={UPCOMING_SUBSCRIPTIONS}
          renderItem={({ item }) => <UpcomingSubscriptionCard data={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<Text className="home-empty-state">No upcoming renewals yet.</Text>}
        />
      </View>
      <ListHeading title="All Subscriptions" />
    </>
  );
}

export default function Home() {
  const subscriptions = useSubscriptionStore();
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const handleSubscriptionPress = (id: string) => {
    if (expandedSubscriptionId !== id) {
      posthog?.capture("subscription_card_expanded", { subscription_id: id });
    }
    setExpandedSubscriptionId((currentId) => (currentId === id ? null : id));
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <FlatList
        ListHeaderComponent={<HomeHeader onAdd={() => setIsCreateModalVisible(true)} />}
        data={subscriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard
            {...item}
            expanded={expandedSubscriptionId === item.id}
            onPress={() => handleSubscriptionPress(item.id)}
          />
        )}
        extraData={expandedSubscriptionId}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text className="home-empty-state">No subscriptions yet.</Text>}
        contentContainerClassName="pb-30"
      />
      <CreateSubscriptionModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onSubmit={addSubscription}
      />
    </SafeAreaView>
  );
}
