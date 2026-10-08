# Recurrly 📱

Recurrly is a React Native subscription-management app built with Expo. It helps users keep track of subscriptions, renewal dates, billing details, and spending in one simple dashboard.

This project is also a practical way to learn React Native by building a real mobile product instead of isolated examples.

## What you can learn

While working through the project, you will practice:

- Building screens and reusable components with React Native and TypeScript
- Creating file-based navigation with Expo Router
- Organising authentication and protected app flows
- Building tab navigation for Home, Subscriptions, Insights, and Settings
- Managing local app state with React hooks and `useSyncExternalStore`
- Creating searchable and expandable subscription cards
- Handling dynamic routes, such as subscription detail pages
- Styling React Native screens with NativeWind and Tailwind CSS
- Loading custom fonts and managing the splash screen
- Adding analytics and screen tracking with PostHog
- Integrating authentication with Clerk
- Running the same Expo project on Android, iOS, and the web

## See the live project

You can use the deployed product without setting up the project locally:

1. Open the **About** section of this repository.
2. Select the APK/install link provided there.
3. Download the APK on an Android phone.
4. Install it and open Recurrly to explore the current build.

The live APK is useful when you want to compare your local changes with the deployed product while learning.

## Tech stack

- **React Native** — mobile UI
- **Expo SDK 57** — development and native app tooling
- **Expo Router** — file-based routing
- **TypeScript** — type-safe JavaScript
- **NativeWind + Tailwind CSS** — utility-first styling
- **Clerk** — authentication
- **PostHog** — analytics and error tracking
- **Day.js** — date formatting and calculations
- **React Native Reanimated** — animations and interactions
- **React Native Web** — web support

## Project structure

```text
src/app/           Routes and screens
src/app/(auth)/     Authentication screens
src/app/(tabs)/     Main tab screens
src/app/subscriptions/  Subscription routes and details
components/        Reusable UI components
constants/          App data, icons, and shared values
lib/               State, analytics, and utility functions
assets/             Fonts and images
global.css          Shared styling
```

The `src/app` directory is the main place to start. With Expo Router, the file and folder structure automatically becomes the navigation structure of the app.

## Run the project locally

### Prerequisites

Install:

- Node.js LTS
- npm
- A phone with Expo Go, an Android emulator, an iOS simulator, or a web browser

### 1. Clone the repository

```bash
git clone https://github.com/tsdebug/expo_app_proj.git
cd expo_app_proj
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN=your_posthog_project_token
EXPO_PUBLIC_POSTHOG_HOST=https://your-posthog-host
```

The Clerk key is required for the app to start. PostHog is optional; leave the PostHog values out if you do not need analytics during local development. You can use `.env.example` as a starting point.

### 4. Start the development server

```bash
npx expo start
```

Then choose how to open the app:

```bash
npm run android   # Android emulator or connected Android device
npm run ios       # iOS simulator
npm run web       # Web browser
```

You can also scan the QR code shown by Expo with Expo Go. Your phone and computer should normally be connected to the same network.

## Useful commands

```bash
npm run lint            # Check the project with Expo ESLint
npx expo start -c       # Start Expo and clear the cache
```

To test a feature, run the app, change the relevant file in `src/app` or `components`, and reload the app. Expo will usually apply changes automatically through Fast Refresh.

## Recommended learning path

1. Start with `src/app/_layout.tsx` to understand providers, fonts, authentication, analytics, and the root navigator.
2. Explore `src/app/(tabs)` to see how the main app screens are organised.
3. Read the reusable components in `components/`.
4. Follow the data flow from `constants/data.ts` into the subscription store and subscription cards.
5. Try a small change, such as adding a field, changing a card style, or creating a new route.
6. Compare your local result with the APK linked in the repository About section.

## Documentation to keep open

This project uses Expo SDK 57. Prefer the versioned documentation when checking Expo APIs:

- [Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Expo tutorial](https://docs.expo.dev/tutorial/introduction/)
- [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [Expo Go](https://expo.dev/go)
- [Expo TypeScript guide](https://docs.expo.dev/guides/typescript/)
- [NativeWind documentation](https://www.nativewind.dev/)
- [Clerk Expo documentation](https://clerk.com/docs/expo/getting-started/overview)
- [PostHog React Native documentation](https://posthog.com/docs/libraries/react-native)

## Notes

- This is a learning-focused project, so some data is currently local/sample data.
- Keep secrets out of Git. Use environment variables for Clerk and PostHog configuration.
- If the app behaves unexpectedly after dependency or configuration changes, try `npx expo start -c`.

## License

See [LICENSE](./LICENSE) for licensing information.
