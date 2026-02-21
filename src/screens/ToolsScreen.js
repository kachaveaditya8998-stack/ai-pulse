import React, { useMemo } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { aiTools, categoryColors } from "../data/tools";

const getTodaysTool = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return aiTools[day % aiTools.length];
};

const getUpcomingTools = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  const todayIdx = day % aiTools.length;
  const upcoming = [];
  for (let i = 1; i <= 3; i++) {
    upcoming.push(aiTools[(todayIdx + i) % aiTools.length]);
  }
  return upcoming;
};

export default function ToolsScreen() {
  const tool = useMemo(() => getTodaysTool(), []);
  const upcoming = useMemo(() => getUpcomingTools(), []);
  const colors = categoryColors[tool.category] || categoryColors.Research;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Tool of the Day</Text>
      <Text style={styles.sub}>
        Handpicked from top AI newsletters, daily.
      </Text>

      {/* Hero Card */}
      <View style={styles.heroCard}>
        <LinearGradient
          colors={tool.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <View style={styles.heroBadgeRow}>
            <View style={styles.heroCategoryBadge}>
              <Text style={styles.heroCategoryText}>{tool.category}</Text>
            </View>
            <View style={tool.free ? styles.heroFreeBadge : styles.heroPaidBadge}>
              <Text style={styles.heroBadgeLabel}>
                {tool.free ? "Free" : "Paid"}
              </Text>
            </View>
          </View>

          <Text style={styles.heroName}>{tool.name}</Text>
          <Text style={styles.heroTagline}>{tool.tagline}</Text>
        </LinearGradient>

        <View style={styles.heroBody}>
          <View style={styles.sourceRow}>
            <Text style={styles.sourceLabel}>Featured in</Text>
            <Text style={styles.sourceName}>{tool.source}</Text>
          </View>

          <Text style={styles.heroDesc}>{tool.description}</Text>

          <Text style={styles.sectionLabel}>How professionals use it</Text>
          {tool.useCases.map((uc, i) => (
            <View key={i} style={styles.useCaseRow}>
              <View style={[styles.useCaseDot, { backgroundColor: colors.accent }]} />
              <Text style={styles.useCaseText}>{uc}</Text>
            </View>
          ))}

          <View style={styles.audienceBox}>
            <Text style={styles.audienceLabel}>Best for</Text>
            <Text style={styles.audienceText}>{tool.audience}</Text>
          </View>

          <TouchableOpacity
            style={[styles.tryBtn, { backgroundColor: colors.accent }]}
            onPress={() => Linking.openURL(tool.url)}
          >
            <Text style={styles.tryBtnText}>Try {tool.name}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Coming Up */}
      <Text style={styles.upcomingHeading}>Coming Up Next</Text>
      {upcoming.map((t, i) => {
        const c = categoryColors[t.category] || categoryColors.Research;
        return (
          <View key={t.id} style={styles.upcomingCard}>
            <LinearGradient
              colors={t.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.upcomingGradient}
            >
              <Text style={styles.upcomingDay}>
                {i === 0 ? "Tomorrow" : i === 1 ? "In 2 days" : "In 3 days"}
              </Text>
            </LinearGradient>
            <View style={styles.upcomingBody}>
              <Text style={styles.upcomingName}>{t.name}</Text>
              <Text style={styles.upcomingTagline} numberOfLines={1}>
                {t.tagline}
              </Text>
              <View style={styles.upcomingMeta}>
                <View style={[styles.upcomingCat, { backgroundColor: c.bg }]}>
                  <Text style={[styles.upcomingCatText, { color: c.accent }]}>
                    {t.category}
                  </Text>
                </View>
                <Text style={styles.upcomingSource}>{t.source}</Text>
              </View>
            </View>
          </View>
        );
      })}
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
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6
  },
  heroGradient: {
    padding: 24,
    paddingBottom: 28
  },
  heroBadgeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16
  },
  heroCategoryBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20
  },
  heroCategoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700"
  },
  heroFreeBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20
  },
  heroPaidBadge: {
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20
  },
  heroBadgeLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700"
  },
  heroName: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -0.5,
    marginBottom: 6
  },
  heroTagline: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 24
  },

  heroBody: { padding: 20 },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16
  },
  sourceLabel: { color: "#94a3b8", fontSize: 12, fontWeight: "600" },
  sourceName: { color: "#4f46e5", fontSize: 12, fontWeight: "700" },
  heroDesc: {
    color: "#334155",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12
  },
  useCaseRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 10
  },
  useCaseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 7
  },
  useCaseText: {
    flex: 1,
    color: "#475569",
    fontSize: 14,
    lineHeight: 22
  },
  audienceBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  audienceLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4
  },
  audienceText: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "600"
  },
  tryBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center"
  },
  tryBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800"
  },

  // Upcoming
  upcomingHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 14
  },
  upcomingCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  upcomingGradient: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    padding: 8
  },
  upcomingDay: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center"
  },
  upcomingBody: {
    flex: 1,
    padding: 14
  },
  upcomingName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 2
  },
  upcomingTagline: {
    color: "#64748b",
    fontSize: 13,
    marginBottom: 8
  },
  upcomingMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  upcomingCat: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  upcomingCatText: {
    fontSize: 11,
    fontWeight: "700"
  },
  upcomingSource: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "600"
  }
});
