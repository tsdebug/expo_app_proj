import { type IconKey } from "./icons";

export type AppTab = {
    name: "index" | "subscriptions" | "insights" | "settings";
    title: string;
    icon: IconKey;
};

export const tabs: AppTab[] = [
    { name: "index", title: "Home", icon: "home" },
    { name: "subscriptions", title: "Subscriptions", icon: "wallet" },
    { name: "insights", title: "Insights", icon: "activity" },
    { name: "settings", title: "Settings", icon: "setting" },
];