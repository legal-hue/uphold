import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.upheld.app",
  appName: "Upheld",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  ios: {
    contentInset: "automatic",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FAFAF7",
      showSpinner: false,
    },
  },
};

export default config;
