import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { dailyTips } from "../data/tips";

const CATEGORY_STYLES = {
  Writing: { bg: "#f5f3ff", color: "#7c3aed", gradient: ["#8b5cf6", "#6d28d9"] },
  Research: { bg: "#eff6ff", color: "#2563eb", gradient: ["#3b82f6", "#1d4ed8"] },
  Meetings: { bg: "#fffbeb", color: "#d97706", gradient: ["#f59e0b", "#d97706"] },
  Learning: { bg: "#ecfdf5", color: "#059669", gradient: ["#10b981", "#047857"] },
  Productivity: { bg: "#ecfdf5", color: "#059669", gradient: ["#10b981", "#059669"] },
  Strategy: { bg: "#eef2ff", color: "#4f46e5", gradient: ["#6366f1", "#4338ca"] },
  Career: { bg: "#fdf2f8", color: "#db2777", gradient: ["#ec4899", "#be185d"] },
  Communication: { bg: "#fff7ed", color: "#ea580c", gradient: ["#f97316", "#ea580c"] },
  Creativity: { bg: "#fdf4ff", color: "#a855f7", gradient: ["#a855f7", "#7c3aed"] },
  Design: { bg: "#fdf2f8", color: "#ec4899", gradient: ["#ec4899", "#db2777"] },
  Management: { bg: "#eff6ff", color: "#2563eb", gradient: ["#3b82f6", "#2563eb"] }
};

const DEFAULT_STYLE = { bg: "#f1f5f9", color: "#475569", gradient: ["#64748b", "#475569"] };

const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
};

const getTodaysTip = () => dailyTips[getDayOfYear() % dailyTips.length];

const getRecentTips = () => {
  const todayIdx = getDayOfYear() % dailyTips.length;
  const recent = [];
  for (let i = 1; i <= 3; i++) {
    const idx = (todayIdx - i + dailyTips.length) % dailyTips.length;
    recent.push(dailyTips[idx]);
  }
  return recent;
};

const getUpcomingTip = () => {
  const todayIdx = getDayOfYear() % dailyTips.length;
  return dailyTips[(todayIdx + 1) % dailyTips.length];
};

export default function TipScreen() {
  const todaysTip = useMemo(() => getTodaysTip(), []);
  const recentTips = useMemo(() => getRecentTips(), []);
  const tomorrowTip = useMemo(() => getUpcomingTip(), []);
  const catStyle = CATEGORY_STYLES[todaysTip.category] || DEFAULT_STYLE;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Tip of the Day</Text>
      <Text style={styles.sub}>
        One insight from the best AI newsletters, daily.
      </Text>

      {/* Hero Tip */}
      <View style={styles.heroCard}>
        <LinearGradient
          colors={catStyle.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <View style={styles.heroBadgeRow}>
            <View style={styles.todayBadge}>
              <Text style={styles.todayBadgeText}>TODAY</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{todaysTip.category}</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>{todaysTip.title}</Text>
        </LinearGradient>

        <View style={styles.heroBody}>
          <View style={styles.sourceRow}>
            <Text style={styles.sourceLabel}>Inspired by</Text>
            <Text style={[styles.sourceName, { color: catStyle.color }]}>
              {todaysTip.source}
            </Text>
          </View>
          <Text style={styles.heroTip}>{todaysTip.tip}</Text>
        </View>
      </View>

      {/* Tomorrow Preview */}
      <View style={styles.tomorrowCard}>
        <View style={styles.tomorrowHeader}>
          <View style={styles.tomorrowBadge}>
            <Text style={styles.tomorrowBadgeText}>TOMORROW</Text>
          </View>
        </View>
        <Text style={styles.tomorrowTitle}>{tomorrowTip.title}</Text>
        <View style={styles.tomorrowMeta}>
          <View
            style={[
              styles.tomorrowCat,
              {
                backgroundColor:
                  (CATEGORY_STYLES[tomorrowTip.category] || DEFAULT_STYLE).bg
              }
            ]}
          >
            <Text
              style={[
                styles.tomorrowCatText,
                {
                  color:
                    (CATEGORY_STYLES[tomorrowTip.category] || DEFAULT_STYLE)
                      .color
                }
              ]}
            >
              {tomorrowTip.category}
            </Text>
          </View>
          <Text style={styles.tomorrowSource}>{tomorrowTip.source}</Text>
        </View>
      </View>

      {/* Recent */}
      <Text style={styles.recentHeading}>Recent Tips</Text>
      {recentTips.map((tip, i) => {
        const cs = CATEGORY_STYLES[tip.category] || DEFAULT_STYLE;
        return (
          <View key={tip.id} style={styles.recentCard}>
            <View style={[styles.recentAccent, { backgroundColor: cs.color }]} />
            <View style={styles.recentBody}>
              <Text style={styles.recentTitle}>{tip.title}</Text>
              <Text style={styles.recentTip} numberOfLines={2}>
                {tip.tip}
              </Text>
              <View style={styles.recentMeta}>
                <View style={[styles.recentCat, { backgroundColor: cs.bg }]}>
                  <Text style={[styles.recentCatText, { color: cs.color }]}>
                    {tip.category}
                  </Text>
                </View>
                <Text style={styles.recentSource}>{tip.source}</Text>
              </View>
            </View>
          </View>
        );
      })}

      {/* Stats */}
      <View style={styles.statsCard}>
        <LinearGradient
          colors={["#4f46e5", "#7c3aed"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statsGradient}
        >
          <Text style={styles.statsTitle}>Your AI Knowledge Journey</Text>
          <Text style={styles.statsBody}>
            A new tip from top AI newsletters every day.{"\n"}Open daily to stay
            ahead of the curve.
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{dailyTips.length}</Text>
              <Text style={styles.statLabel}>Tips</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>6+</Text>
              <Text style={styles.statLabel}>Sources</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1/day</Text>
              <Text style={styles.statLabel}>New Tip</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 16, paddingBottom: 40 },
  heading: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 4
  },
  sub: { color: "#64748b", fontSize: 14, marginBottom: 18 },

  // Hero
  heroCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6
  },
  heroGradient: { padding: 24, paddingBottom: 28 },
  heroBadgeRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  todayBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20
  },
  todayBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1
  },
  categoryBadge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20
  },
  categoryBadgeText: { color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: "700" },
  heroTitle: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 36
  },
  heroBody: { padding: 20 },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14
  },
  sourceLabel: { color: "#94a3b8", fontSize: 12, fontWeight: "600" },
  sourceName: { fontSize: 12, fontWeight: "700" },
  heroTip: {
    color: "#334155",
    fontSize: 16,
    lineHeight: 26
  },

  // Tomorrow
  tomorrowCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  tomorrowHeader: { marginBottom: 10 },
  tomorrowBadge: {
    backgroundColor: "#eef2ff",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8
  },
  tomorrowBadgeText: {
    color: "#4f46e5",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5
  },
  tomorrowTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 8
  },
  tomorrowMeta: { flexDirection: "row", alignItems: "center", gap: 8 },
  tomorrowCat: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  tomorrowCatText: { fontSize: 11, fontWeight: "700" },
  tomorrowSource: { color: "#94a3b8", fontSize: 11, fontWeight: "600" },

  // Recent
  recentHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 14
  },
  recentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  recentAccent: { width: 4 },
  recentBody: { flex: 1, padding: 14 },
  recentTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4
  },
  recentTip: { color: "#64748b", fontSize: 13, lineHeight: 20, marginBottom: 8 },
  recentMeta: { flexDirection: "row", alignItems: "center", gap: 8 },
  recentCat: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  recentCatText: { fontSize: 11, fontWeight: "700" },
  recentSource: { color: "#94a3b8", fontSize: 11, fontWeight: "600" },

  // Stats
  statsCard: {
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 14
  },
  statsGradient: { padding: 24 },
  statsTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8
  },
  statsBody: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  statItem: { alignItems: "center" },
  statNumber: { fontSize: 26, fontWeight: "900", color: "#ffffff" },
  statLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 2 },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.2)"
  }
});
