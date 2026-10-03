import { useSubscriptionStore } from "../../../lib/subscriptionStore";
import { formatCurrency } from "../../../lib/utils";
import dayjs from "dayjs";
import { styled } from "nativewind";
import { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const CATEGORY_COLORS = ["#ea7a53", "#8fd1bd", "#f5c542", "#b8d4e3", "#e8def8"];

export default function Insights() {
  const subscriptions = useSubscriptionStore();

  const insightData = useMemo(() => {
    const activeSubscriptions = subscriptions.filter(
      (subscription) => subscription.status !== "cancelled",
    );
    const monthlySpend = activeSubscriptions.reduce(
      (total, subscription) =>
        total + subscription.price / (subscription.billing === "Yearly" ? 12 : 1),
      0,
    );
    const yearlySpend = monthlySpend * 12;
    const categoryTotals = activeSubscriptions.reduce<Record<string, number>>((totals, subscription) => {
      const category = subscription.category || "Other";
      totals[category] =
        (totals[category] || 0) +
        subscription.price / (subscription.billing === "Yearly" ? 12 : 1);
      return totals;
    }, {});
    const categories = Object.entries(categoryTotals)
      .sort(([, first], [, second]) => second - first)
      .map(([name, amount], index) => ({
        name,
        amount,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      }));
    const upcoming = [...activeSubscriptions]
      .filter((subscription) => subscription.renewalDate)
      .sort(
        (first, second) =>
          dayjs(first.renewalDate).valueOf() - dayjs(second.renewalDate).valueOf(),
      )
      .slice(0, 3);

    return { activeSubscriptions, monthlySpend, yearlySpend, categories, upcoming };
  }, [subscriptions]);

  const largestCategory = insightData.categories[0];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-30 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <Text className="insights-title">Insights</Text>
        <Text className="insights-subtitle">A clear view of your recurring spending</Text>

        <View className="insights-hero">
          <Text className="insights-hero-label">Estimated monthly spend</Text>
          <Text className="insights-hero-amount">{formatCurrency(insightData.monthlySpend)}</Text>
          <View className="insights-hero-footer">
            <Text className="insights-hero-meta">
              {formatCurrency(insightData.yearlySpend)} estimated yearly
            </Text>
            <Text className="insights-hero-meta">
              {insightData.activeSubscriptions.length} active
            </Text>
          </View>
        </View>

        <View className="insights-summary-row">
          <View className="insights-summary-card">
            <Text className="insights-summary-label">Top category</Text>
            <Text className="insights-summary-value" numberOfLines={1}>
              {largestCategory?.name || "No data"}
            </Text>
            <Text className="insights-summary-meta">
              {largestCategory ? formatCurrency(largestCategory.amount) : "$0.00"} / month
            </Text>
          </View>
          <View className="insights-summary-card">
            <Text className="insights-summary-label">Categories</Text>
            <Text className="insights-summary-value">{insightData.categories.length}</Text>
            <Text className="insights-summary-meta">spending groups</Text>
          </View>
        </View>

        <Text className="insights-section-title">Spending by category</Text>
        <View className="insights-card">
          {insightData.categories.length === 0 ? (
            <Text className="home-empty-state">Add subscriptions to see your spending breakdown.</Text>
          ) : (
            insightData.categories.map((category) => {
              const percentage =
                insightData.monthlySpend > 0
                  ? (category.amount / insightData.monthlySpend) * 100
                  : 0;
              return (
                <View key={category.name} className="insights-category">
                  <View className="insights-category-header">
                    <View className="insights-category-name">
                      <View className="insights-category-dot" style={{ backgroundColor: category.color }} />
                      <Text className="insights-category-label">{category.name}</Text>
                    </View>
                    <Text className="insights-category-amount">
                      {formatCurrency(category.amount)}
                    </Text>
                  </View>
                  <View className="insights-progress-track">
                    <View
                      className="insights-progress-bar"
                      style={{ width: `${Math.max(percentage, 2)}%`, backgroundColor: category.color }}
                    />
                  </View>
                </View>
              );
            })
          )}
        </View>

        <Text className="insights-section-title">Upcoming renewals</Text>
        <View className="insights-card">
          {insightData.upcoming.length === 0 ? (
            <Text className="home-empty-state">No upcoming renewals.</Text>
          ) : (
            insightData.upcoming.map((subscription) => (
              <View key={subscription.id} className="insights-renewal-row">
                <View className="insights-renewal-copy">
                  <Text className="insights-renewal-name" numberOfLines={1}>
                    {subscription.name}
                  </Text>
                  <Text className="insights-renewal-date">
                    {dayjs(subscription.renewalDate).format("MMM D, YYYY")}
                  </Text>
                </View>
                <Text className="insights-renewal-price">
                  {formatCurrency(subscription.price, subscription.currency)}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
