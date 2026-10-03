const appConfig = require('./app.json')

module.exports = () => ({
  ...appConfig.expo,
  android: {
    ...appConfig.expo.android,
    package: 'com.tsdebug.expoapp',
  },
  extra: {
    ...appConfig.expo.extra,
    posthogProjectToken: process.env.EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN,
    posthogHost: process.env.EXPO_PUBLIC_POSTHOG_HOST,
  },
})
