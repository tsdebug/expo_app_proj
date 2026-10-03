import { useSyncExternalStore } from "react";
import { HOME_SUBSCRIPTIONS } from "../constants/data";

let subscriptions: Subscription[] = [...HOME_SUBSCRIPTIONS];
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => subscriptions;

export const addSubscription = (subscription: Subscription) => {
  subscriptions = [subscription, ...subscriptions];
  listeners.forEach((listener) => listener());
};

export const useSubscriptionStore = () =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
