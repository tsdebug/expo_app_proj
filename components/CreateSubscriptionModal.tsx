import { clsx } from "clsx";
import dayjs from "dayjs";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { icons } from "../constants/icons";

const FREQUENCIES = ["Monthly", "Yearly"] as const;
const CATEGORIES = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
] as const;

const CATEGORY_COLORS: Record<(typeof CATEGORIES)[number], string> = {
  Entertainment: "#ff6b6b",
  "AI Tools": "#b8d4e3",
  "Developer Tools": "#e8def8",
  Design: "#f5c542",
  Productivity: "#95e1d3",
  Cloud: "#c7d9f5",
  Music: "#f4c2a1",
  Other: "#d4d4d4",
};

type CreateSubscriptionModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (subscription: Subscription) => void;
};

export default function CreateSubscriptionModal({
  visible,
  onClose,
  onSubmit,
}: CreateSubscriptionModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<(typeof FREQUENCIES)[number]>("Monthly");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Other");

  const parsedPrice = Number(price.trim());
  const isValid =
    name.trim().length > 0 &&
    price.trim().length > 0 &&
    Number.isFinite(parsedPrice) &&
    parsedPrice > 0;

  const resetForm = () => {
    setName("");
    setPrice("");
    setFrequency("Monthly");
    setCategory("Other");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const startDate = dayjs();
    const renewalDate = startDate
      .add(1, frequency === "Monthly" ? "month" : "year")
      .toISOString();

    onSubmit({
      id: `sub-${Date.now()}`,
      name: name.trim(),
      price: parsedPrice,
      currency: "USD",
      frequency,
      category,
      status: "active",
      startDate: startDate.toISOString(),
      renewalDate,
      icon: icons.wallet,
      billing: frequency,
      color: CATEGORY_COLORS[category],
    });

    handleClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        className="modal-overlay"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable className="flex-1" onPress={handleClose}>
          <Pressable className="modal-container" onPress={(event) => event.stopPropagation()}>
            <View className="modal-header">
              <Text className="modal-title">New Subscription</Text>
              <Pressable
                accessibilityLabel="Close new subscription form"
                className="modal-close"
                onPress={handleClose}
              >
                <Text className="modal-close-text">X</Text>
              </Pressable>
            </View>

            <ScrollView
              className="modal-body"
              contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View className="auth-field">
                <Text className="auth-label">Name</Text>
                <TextInput
                  className="auth-input"
                  placeholder="Subscription name"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View className="auth-field">
                <Text className="auth-label">Price</Text>
                <TextInput
                  className="auth-input"
                  placeholder="0.00"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="decimal-pad"
                />
              </View>

              <View className="auth-field">
                <Text className="auth-label">Frequency</Text>
                <View className="picker-row">
                  {FREQUENCIES.map((option) => {
                    const active = frequency === option;
                    return (
                      <Pressable
                        key={option}
                        className={clsx("picker-option", active && "picker-option-active")}
                        onPress={() => setFrequency(option)}
                      >
                        <Text
                          className={clsx(
                            "picker-option-text",
                            active && "picker-option-text-active",
                          )}
                        >
                          {option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View className="auth-field">
                <Text className="auth-label">Category</Text>
                <View className="category-scroll">
                  {CATEGORIES.map((option) => {
                    const active = category === option;
                    return (
                      <Pressable
                        key={option}
                        className={clsx("category-chip", active && "category-chip-active")}
                        onPress={() => setCategory(option)}
                      >
                        <Text
                          className={clsx(
                            "category-chip-text",
                            active && "category-chip-text-active",
                          )}
                        >
                          {option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <Pressable
                className={clsx("auth-button", !isValid && "auth-button-disabled")}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text className="auth-button-text">Create Subscription</Text>
              </Pressable>
            </ScrollView>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
