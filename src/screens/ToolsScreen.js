import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { aiTools, categories } from "../data/tools";

export default function ToolsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = useMemo(() => {
    if (selectedCategory === "All") return aiTools;
    return aiTools.filter((tool) => tool.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.list}>
      <Text style={styles.heading}>AI Tools for Professionals</Text>
      <Text style={styles.sub}>
        Curated tools to boost your productivity. Tap any tool for a pro tip.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={styles.filterContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterChip,
              selectedCategory === cat && styles.filterChipActive
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === cat && styles.filterTextActive
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredTools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </ScrollView>
  );
}

function ToolCard({ tool }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.cardTop}>
        <View style={styles.nameRow}>
          <Text style={styles.toolName}>{tool.name}</Text>
          {tool.free ? (
            <View style={styles.freeBadge}>
              <Text style={styles.freeBadgeText}>Free</Text>
            </View>
          ) : (
            <View style={styles.paidBadge}>
              <Text style={styles.paidBadgeText}>Paid</Text>
            </View>
          )}
        </View>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryTagText}>{tool.category}</Text>
        </View>
      </View>
      <Text style={styles.toolDesc}>{tool.description}</Text>

      {expanded && (
        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>PRO TIP</Text>
          <Text style={styles.tipText}>{tool.tip}</Text>
        </View>
      )}

      <Text style={styles.expandHint}>
        {expanded ? "Tap to collapse" : "Tap for pro tip"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f1f5f9" },
  list: { padding: 16, paddingBottom: 32 },
  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4
  },
  sub: { color: "#64748b", fontSize: 14, lineHeight: 21, marginBottom: 12 },
  filterRow: { marginBottom: 16, flexGrow: 0 },
  filterContent: { gap: 8, paddingRight: 16 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  filterChipActive: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5"
  },
  filterText: { color: "#475569", fontWeight: "600", fontSize: 13 },
  filterTextActive: { color: "#ffffff" },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  toolName: { fontSize: 17, fontWeight: "700", color: "#0f172a" },
  freeBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  freeBadgeText: { color: "#16a34a", fontSize: 11, fontWeight: "700" },
  paidBadge: {
    backgroundColor: "#fef3c7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  paidBadgeText: { color: "#d97706", fontSize: 11, fontWeight: "700" },
  categoryTag: {
    backgroundColor: "#eef2ff",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6
  },
  categoryTagText: { color: "#4f46e5", fontSize: 11, fontWeight: "600" },
  toolDesc: { color: "#475569", fontSize: 14, lineHeight: 21 },
  tipBox: {
    marginTop: 12,
    backgroundColor: "#fefce8",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#fde68a"
  },
  tipLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#d97706",
    letterSpacing: 0.5,
    marginBottom: 4
  },
  tipText: { color: "#78350f", fontSize: 14, lineHeight: 21 },
  expandHint: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 10,
    textAlign: "right"
  }
});
