import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Linking,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const CARD_WIDTH = SCREEN_WIDTH - 32;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.62;

const GRADIENT_SETS = [
  ["#4f46e5", "#7c3aed"],
  ["#0891b2", "#0d9488"],
  ["#dc2626", "#ea580c"],
  ["#7c3aed", "#c026d3"],
  ["#0369a1", "#4f46e5"],
  ["#059669", "#0d9488"],
  ["#b91c1c", "#be185d"],
  ["#1d4ed8", "#6366f1"]
];

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

const extractImage = (xml) => {
  const mediaMatch = xml.match(/<media:content[^>]*url="([^"]+)"[^>]*>/);
  if (mediaMatch) return mediaMatch[1];
  const mediaThumbnail = xml.match(/<media:thumbnail[^>]*url="([^"]+)"[^>]*>/);
  if (mediaThumbnail) return mediaThumbnail[1];
  const enclosure = xml.match(/<enclosure[^>]*url="([^"]+)"[^>]*type="image[^"]*"[^>]*>/);
  if (enclosure) return enclosure[1];
  const imgTag = xml.match(/<img[^>]*src="([^"]+)"[^>]*>/);
  if (imgTag) return imgTag[1];
  return null;
};

const extractSource = (link) => {
  if (!link) return "AI News";
  try {
    const host = new URL(link).hostname.replace("www.", "");
    if (host.includes("techcrunch")) return "TechCrunch";
    if (host.includes("theverge")) return "The Verge";
    if (host.includes("wired")) return "Wired";
    if (host.includes("arstechnica")) return "Ars Technica";
    return host.split(".")[0].charAt(0).toUpperCase() + host.split(".")[0].slice(1);
  } catch {
    return "AI News";
  }
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
    const image = extractImage(block);
    if (title) {
      items.push({
        title,
        link,
        pubDate,
        description: description.substring(0, 160),
        image,
        source: extractSource(link)
      });
    }
  }

  while ((match = entryRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = stripHtml(extractTag(block, "title"));
    const linkMatch = block.match(/<link[^>]*href="([^"]*)"[^>]*\/?>/);
    const link = linkMatch ? linkMatch[1] : extractTag(block, "link");
    const pubDate = extractTag(block, "published") || extractTag(block, "updated");
    const description = stripHtml(extractTag(block, "summary") || extractTag(block, "content"));
    const image = extractImage(block);
    if (title) {
      items.push({
        title,
        link,
        pubDate,
        description: description.substring(0, 160),
        image,
        source: extractSource(link)
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
    const diffHrs = Math.floor((now - d) / (1000 * 60 * 60));
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

function SwipeableCard({ article, index, isTop, onSwipedLeft, onSwipedRight }) {
  const position = useRef(new Animated.ValueXY()).current;
  const [imgFailed, setImgFailed] = useState(false);
  const gradientColors = GRADIENT_SETS[index % GRADIENT_SETS.length];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTop,
      onMoveShouldSetPanResponder: (_, g) => isTop && (Math.abs(g.dx) > 5 || Math.abs(g.dy) > 5),
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
            duration: 300,
            useNativeDriver: false
          }).start(() => onSwipedRight());
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
            duration: 300,
            useNativeDriver: false
          }).start(() => onSwipedLeft());
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false
          }).start();
        }
      }
    })
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-8deg", "0deg", "8deg"],
    extrapolate: "clamp"
  });

  const readOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 5],
    outputRange: [0, 1],
    extrapolate: "clamp"
  });

  const skipOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 5, 0],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  const cardStyle = isTop
    ? {
        transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }],
        zIndex: 10
      }
    : {
        transform: [{ scale: 0.95 }, { translateY: 20 }],
        zIndex: 5,
        opacity: 0.7
      };

  const hasImage = article.image && !imgFailed;

  return (
    <Animated.View
      style={[styles.card, cardStyle]}
      {...(isTop ? panResponder.panHandlers : {})}
    >
      {hasImage ? (
        <Image
          source={{ uri: article.image }}
          style={styles.cardImage}
          resizeMode="cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardImage}
        />
      )}

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.85)"]}
        locations={[0, 0.4, 1]}
        style={styles.overlay}
      />

      {isTop && (
        <>
          <Animated.View style={[styles.actionLabel, styles.readLabel, { opacity: readOpacity }]}>
            <Text style={styles.readLabelText}>READ</Text>
          </Animated.View>
          <Animated.View style={[styles.actionLabel, styles.skipLabel, { opacity: skipOpacity }]}>
            <Text style={styles.skipLabelText}>SKIP</Text>
          </Animated.View>
        </>
      )}

      <View style={styles.cardTopRow}>
        <View style={styles.sourceBadge}>
          <Text style={styles.sourceText}>{article.source}</Text>
        </View>
        {article.pubDate ? (
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>{formatDate(article.pubDate)}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.cardBottom}>
        <Text style={styles.cardTitle} numberOfLines={3}>
          {article.title}
        </Text>
        {article.description ? (
          <Text style={styles.cardDesc} numberOfLines={2}>
            {article.description}
          </Text>
        ) : null}
        <View style={styles.swipeHintRow}>
          <Text style={styles.swipeHint}>Swipe right to read  /  left to skip</Text>
        </View>
      </View>
    </Animated.View>
  );
}

export default function FeedScreen() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchNews = useCallback(async () => {
    try {
      setError(false);
      const results = await Promise.allSettled(
        RSS_FEEDS.map((url) =>
          fetch(url).then((res) => res.text()).then(parseRSS)
        )
      );
      const allArticles = results
        .filter((r) => r.status === "fulfilled")
        .flatMap((r) => r.value);
      allArticles.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));
      setArticles(allArticles);
      setCurrentIndex(0);
      if (allArticles.length === 0) setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSwipeLeft = useCallback(() => {
    setCurrentIndex((i) => i + 1);
  }, []);

  const handleSwipeRight = useCallback(() => {
    const article = articles[currentIndex];
    if (article?.link) Linking.openURL(article.link);
    setCurrentIndex((i) => i + 1);
  }, [articles, currentIndex]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading your AI briefing...</Text>
      </View>
    );
  }

  if (error && articles.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorEmoji}>!</Text>
        <Text style={styles.errorTitle}>No connection</Text>
        <Text style={styles.errorSub}>Check your internet and try again.</Text>
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={() => { setLoading(true); fetchNews(); }}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (currentIndex >= articles.length) {
    return (
      <View style={styles.center}>
        <View style={styles.doneCircle}>
          <Text style={styles.doneCheck}>✓</Text>
        </View>
        <Text style={styles.doneTitle}>You're all caught up!</Text>
        <Text style={styles.doneSub}>
          No more AI news right now.{"\n"}Pull in fresh stories anytime.
        </Text>
        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={() => { setLoading(true); fetchNews(); }}
        >
          <Text style={styles.refreshText}>Load New Stories</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const visibleCards = articles.slice(currentIndex, currentIndex + 2);

  return (
    <View style={styles.screen}>
      <View style={styles.counterRow}>
        <Text style={styles.counterText}>
          {currentIndex + 1} of {articles.length} stories
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {visibleCards.map((article, i) => (
          <SwipeableCard
            key={`${article.title}-${currentIndex + i}`}
            article={article}
            index={currentIndex + i}
            isTop={i === 0}
            onSwipedLeft={handleSwipeLeft}
            onSwipedRight={handleSwipeRight}
          />
        )).reverse()}
      </View>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.actionBtnSkip} onPress={handleSwipeLeft}>
          <Text style={styles.actionBtnSkipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtnRead} onPress={handleSwipeRight}>
          <Text style={styles.actionBtnReadText}>Read Article</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 32
  },
  loadingText: { color: "#94a3b8", fontSize: 15, marginTop: 16 },
  errorEmoji: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ef4444",
    backgroundColor: "#1e293b",
    width: 56,
    height: 56,
    borderRadius: 28,
    textAlign: "center",
    lineHeight: 56,
    overflow: "hidden",
    marginBottom: 16
  },
  errorTitle: { fontSize: 20, fontWeight: "700", color: "#f1f5f9" },
  errorSub: { color: "#94a3b8", marginTop: 8, textAlign: "center" },
  retryBtn: {
    marginTop: 24,
    backgroundColor: "#4f46e5",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14
  },
  retryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  doneCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  doneCheck: { fontSize: 32, color: "#22c55e", fontWeight: "700" },
  doneTitle: { fontSize: 22, fontWeight: "800", color: "#f1f5f9" },
  doneSub: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
    fontSize: 15
  },
  refreshBtn: {
    marginTop: 28,
    backgroundColor: "#4f46e5",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14
  },
  refreshText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  counterRow: {
    paddingTop: 12,
    paddingBottom: 8
  },
  counterText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: "relative"
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "#1e293b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12
  },
  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  actionLabel: {
    position: "absolute",
    top: 60,
    zIndex: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 3
  },
  readLabel: {
    right: 20,
    borderColor: "#22c55e",
    backgroundColor: "rgba(34,197,94,0.15)"
  },
  readLabelText: {
    color: "#22c55e",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 2
  },
  skipLabel: {
    left: 20,
    borderColor: "#ef4444",
    backgroundColor: "rgba(239,68,68,0.15)"
  },
  skipLabelText: {
    color: "#ef4444",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 2
  },
  cardTopRow: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 15
  },
  sourceBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backdropFilter: "blur(10px)"
  },
  sourceText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3
  },
  timeBadge: {
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20
  },
  timeText: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "600"
  },
  cardBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 22
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 30,
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4
  },
  cardDesc: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12
  },
  swipeHintRow: {
    alignItems: "center"
  },
  swipeHint: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontWeight: "500"
  },
  bottomActions: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  actionBtnSkip: {
    flex: 1,
    backgroundColor: "#1e293b",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155"
  },
  actionBtnSkipText: {
    color: "#94a3b8",
    fontWeight: "700",
    fontSize: 16
  },
  actionBtnRead: {
    flex: 1.5,
    backgroundColor: "#4f46e5",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center"
  },
  actionBtnReadText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16
  }
});
