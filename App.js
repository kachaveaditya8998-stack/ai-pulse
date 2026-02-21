import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import FeedScreen from "./src/screens/FeedScreen";
import ToolsScreen from "./src/screens/ToolsScreen";
import TipScreen from "./src/screens/TipScreen";

const TABS = [
  { key: "feed", label: "News", icon: "N" },
  { key: "tools", label: "Tools", icon: "T" },
  { key: "tip", label: "Daily Tip", icon: "D" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("feed");
  const isDark = activeTab === "feed";

  const renderScreen = () => {
    switch (activeTab) {
      case "feed":
        return <FeedScreen />;
      case "tools":
        return <ToolsScreen />;
      case "tip":
        return <TipScreen />;
      default:
        return <FeedScreen />;
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#4f46e5" }
      ]}
    >
      <ExpoStatusBar style="light" />

      <View
        style={[
          styles.header,
          { backgroundColor: isDark ? "#0f172a" : "#4f46e5" }
        ]}
      >
        <Text style={styles.headerBrand}>AI Pulse</Text>
        <Text
          style={[
            styles.headerTagline,
            { color: isDark ? "#475569" : "#c7d2fe" }
          ]}
        >
          Your Daily AI Briefing
        </Text>
      </View>

      <View
        style={[
          styles.body,
          { backgroundColor: isDark ? "#0f172a" : "#f1f5f9" }
        ]}
      >
        {renderScreen()}
      </View>

      <View
        style={[
          styles.tabBar,
          isDark && {
            backgroundColor: "#0f172a",
            borderTopColor: "#1e293b"
          }
        ]}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => setActiveTab(tab.key)}
            >
              <View
                style={[
                  styles.tabIconWrap,
                  isDark && { backgroundColor: "#1e293b" },
                  isActive && styles.tabIconWrapActive
                ]}
              >
                <Text
                  style={[
                    styles.tabIcon,
                    isDark && { color: "#475569" },
                    isActive && styles.tabIconActive
                  ]}
                >
                  {tab.icon}
                </Text>
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isDark && { color: "#475569" },
                  isActive && styles.tabLabelActive
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4f46e5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14
  },
  headerBrand: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.5
  },
  headerTagline: {
    color: "#c7d2fe",
    fontSize: 14,
    marginTop: 2
  },
  body: {
    flex: 1,
    backgroundColor: "#f1f5f9"
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingBottom: Platform.OS === "ios" ? 20 : 8,
    paddingTop: 8
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3
  },
  tabIconWrapActive: {
    backgroundColor: "#4f46e5"
  },
  tabIcon: {
    fontSize: 15,
    fontWeight: "800",
    color: "#94a3b8"
  },
  tabIconActive: {
    color: "#ffffff"
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94a3b8"
  },
  tabLabelActive: {
    color: "#4f46e5"
  }
});
