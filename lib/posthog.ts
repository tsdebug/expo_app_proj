import Constants from 'expo-constants'
import PostHog from 'posthog-react-native'

const extra = Constants.expoConfig?.extra
const projectToken = extra?.posthogProjectToken as string | undefined
const host = extra?.posthogHost as string | undefined

if (__DEV__ && (!projectToken || !host)) {
  console.warn(
    'PostHog is not configured. Set EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN and EXPO_PUBLIC_POSTHOG_HOST to enable analytics.',
  )
}

export const posthog =
  projectToken && host
    ? new PostHog(projectToken, {
        host,
        logs: {
          serviceName: 'recurrly-mobile',
          environment: __DEV__ ? 'development' : 'production',
          serviceVersion: Constants.expoConfig?.version,
        },
        errorTracking: {
          autocapture: {
            uncaughtExceptions: true,
            unhandledRejections: true,
          },
        },
      })
    : undefined
