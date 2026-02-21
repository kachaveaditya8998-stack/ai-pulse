import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { dailyTips } from "../data/tips";

const getTodaysTip = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
  return dailyTips[dayOfYear % dailyTips.length];
};

const getUpcomingTips = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
  const todayIndex = dayOfYear % dailyTips.length;
  const upcoming = [];
  for (let i = 1; i <= 3; i++) {
    upcoming.push(dailyTips[(todayIndex + i) % dailyTips.length]);
  }
  return upcoming;
};

export default function TipScreen() {
  const todaysTip = useMemo(() => getTodaysTip(), []);
  const upcomingTips = useMemo(() => getUpcomingTips(), []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Daily AI Tip</Text>
      <Text style={styles.sub}>
        One actionable tip every day to work smarter with AI.
      </Text>

      <View style={styles.todayCard}>
        <View style={styles.todayBadge}>
          <Text style={styles.todayBadgeText}>TODAY</Text>
        </View>
        <Text style={styles.tipTitle}>{todaysTip.title}</Text>
        <View style={styles.categoryRow}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{todaysTip.category}</Text>
          </View>
        </View>
        <Text style={styles.tipBody}>{todaysTip.tip}</Text>
      </View>

      <Text style={styles.upcomingLabel}>Coming Up Next</Text>
      {upcomingTips.map((tip, index) => (
        <View key={tip.id} style={styles.previewCard}>
          <View style={styles.previewLeft}>
            <View style={styles.dayCircle}>
              <Text style={styles.dayCircleText}>
                {index === 0 ? "TMR" : `+${index + 1}`}
              </Text>
            </View>
          </View>
          <View style={styles.previewRight}>
            <Text style={styles.previewTitle}>{tip.title}</Text>
            <Text style={styles.previewCategory}>{tip.category}</Text>
          </View>
        </View>
      ))}

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Your AI Learning Streak</Text>
        <Text style={styles.statsBody}>
          Open the app daily to build your AI knowledge. Each day brings a new
          practical tip you can apply immediately at work.
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{dailyTips.length}</Text>
            <Text style={styles.statLabel}>Total Tips</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1/day</Text>
            <Text style={styles.statLabel}>New Tip</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f1f5f9" },
  content: { padding: 16, paddingBottom: 40 },
  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4
  },
  sub: { color: "#64748b", fontSize: 14, marginBottom: 16 },
  todayCard: {
    backgroundColor: "#4f46e5",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24
  },
  todayBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12
  },
  todayBadgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1
  },
  tipTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8
  },
  categoryRow: { marginBottom: 14 },
  categoryTag: {
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6
  },
  categoryTagText: { color: "#e0e7ff", fontSize: 12, fontWeight: "600" },
  tipBody: {
    color: "#e0e7ff",
    fontSize: 16,
    lineHeight: 25
  },
  upcomingLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12
  },
  previewCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  previewLeft: { marginRight: 14 },
  dayCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#eef2ff",
    justifyContent: "center",
    alignItems: "center"
  },
  dayCircleText: { color: "#4f46e5", fontWeight: "700", fontSize: 12 },
  previewRight: { flex: 1 },
  previewTitle: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  previewCategory: { color: "#94a3b8", fontSize: 12, marginTop: 2 },
  statsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 6
  },
  statsBody: {
    color: "#64748b",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16
  },
  statsRow: { flexDirection: "row", justifyContent: "space-around" },
  statItem: { alignItems: "center" },
  statNumber: { fontSize: 22, fontWeight: "800", color: "#4f46e5" },
  statLabel: { color: "#94a3b8", fontSize: 12, marginTop: 2 }
});
