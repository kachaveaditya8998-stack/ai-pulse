import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const RSS_FEEDS = [
  "https://techcrunch.com/category/artificial-intelligence/feed/",
  "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml"
];

const stripHtml = (html) => {
  if (!html) return "";
  return html
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
};

const extractTag = (xml, tag) => {
  const cdataPattern = new RegExp(
    `<${tag}>[\\s]*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>[\\s]*</${tag}>`
  );
  const plainPattern = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`);
  const cdataMatch = xml.match(cdataPattern);
  if (cdataMatch) return cdataMatch[1].trim();
  const plainMatch = xml.match(plainPattern);
  return plainMatch ? plainMatch[1].trim() : "";
};

const parseRSS = (xml) => {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;

  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = stripHtml(extractTag(block, "title"));
    const link = extractTag(block, "link");
    const pubDate = extractTag(block, "pubDate");
    const description = stripHtml(extractTag(block, "description"));
    if (title) {
      items.push({
        title,
        link,
        pubDate,
        description: description.substring(0, 200)
      });
    }
  }

  while ((match = entryRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = stripHtml(extractTag(block, "title"));
    const linkMatch = block.match(/<link[^>]*href="([^"]*)"[^>]*\/>/);
    const link = linkMatch ? linkMatch[1] : extractTag(block, "link");
    const pubDate =
      extractTag(block, "published") || extractTag(block, "updated");
    const description = stripHtml(
      extractTag(block, "summary") || extractTag(block, "content")
    );
    if (title) {
      items.push({
        title,
        link,
        pubDate,
        description: description.substring(0, 200)
      });
    }
  }

  return items;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const now = new Date();
    const diffMs = now - d;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) return "Just now";
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
};

export default function FeedScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const fetchNews = useCallback(async () => {
    try {
      setError(false);
      const results = await Promise.allSettled(
        RSS_FEEDS.map((url) =>
          fetch(url)
            .then((res) => res.text())
            .then(parseRSS)
        )
      );

      const allArticles = results
        .filter((r) => r.status === "fulfilled")
        .flatMap((r) => r.value);

      allArticles.sort(
        (a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0)
      );

      setArticles(allArticles);
      if (allArticles.length === 0) setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews();
  }, [fetchNews]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Fetching AI news...</Text>
      </View>
    );
  }

  if (error && articles.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>!</Text>
        <Text style={styles.errorTitle}>Could not load news</Text>
        <Text style={styles.errorText}>
          Check your internet connection and pull down to retry.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            fetchNews();
          }}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#4f46e5"
        />
      }
    >
      <Text style={styles.sectionHeader}>Latest AI News</Text>
      <Text style={styles.sectionSub}>Pull down to refresh</Text>
      {articles.map((article, index) => (
        <TouchableOpacity
          key={`${article.title}-${index}`}
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => {
            if (article.link) Linking.openURL(article.link);
          }}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.date}>{formatDate(article.pubDate)}</Text>
          </View>
          <Text style={styles.title}>{article.title}</Text>
          {article.description ? (
            <Text style={styles.description} numberOfLines={3}>
              {article.description}
            </Text>
          ) : null}
          <Text style={styles.readMore}>Read full article</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f1f5f9" },
  list: { padding: 16, paddingBottom: 32 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    padding: 32
  },
  loadingText: { marginTop: 12, color: "#64748b", fontSize: 15 },
  errorIcon: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ef4444",
    backgroundColor: "#fee2e2",
    width: 56,
    height: 56,
    borderRadius: 28,
    textAlign: "center",
    lineHeight: 56,
    marginBottom: 16,
    overflow: "hidden"
  },
  errorTitle: { fontSize: 18, fontWeight: "700", color: "#1e293b" },
  errorText: {
    color: "#64748b",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#4f46e5",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10
  },
  retryText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4
  },
  sectionSub: { color: "#94a3b8", fontSize: 13, marginBottom: 16 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  date: { color: "#4f46e5", fontSize: 12, fontWeight: "600" },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
    lineHeight: 24,
    marginBottom: 6
  },
  description: { color: "#475569", fontSize: 14, lineHeight: 21 },
  readMore: {
    color: "#4f46e5",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 10
  }
});
