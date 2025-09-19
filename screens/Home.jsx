import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MovieCard from "../components/MovieCard";
import MovieDetails from "./MovieDetails";

const API_URL = "http://192.168.18.62:5000/api/items";

export default function Home({ addToCart }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setMovies(data.items || []);
      } catch (err) {
        console.error(err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#40E0D0" />
      </View>
    );
  }
  const featuredMovie = movies[3];
  const featuredMovies = movies.slice(0, 4);
  const genres = ["All", ...new Set(movies.map((movie) => movie.genre))];
  const heroMovie = movies[2]; // first movie as hero

  // filtering section
  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((m) => m.genre === selectedGenre);

  return (
    <LinearGradient colors={["#000000", "#0d0d0d"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero Section */}
        {heroMovie && (
          <ImageBackground
            source={{ uri: heroMovie.imageUrl }}
            style={styles.hero}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.95)"]}
              style={styles.heroOverlay}
            />
            <View style={styles.heroContent}>
              <Text style={styles.featuredLabel}>Featured Movie</Text>
              <Text style={styles.heroTitle}>
                {heroMovie.title} ({heroMovie.releaseYear || "N/A"})
              </Text>
              <Text style={styles.heroDescription} numberOfLines={3}>
                {heroMovie.description}
              </Text>

              {/* Glass buttons */}
              <View style={styles.heroButtons}>
                <TouchableOpacity style={styles.glassButton} onPress={() => addToCart(featuredMovie)}>
                  <Text style={styles.glassButtonText}>RENT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.glassButtonSecondary} onPress={() => setShowDetails(true)}>
                  <Text style={styles.glassButtonText}>VIEW INFO</Text>
                </TouchableOpacity>
              </View>
              {showDetails && (
                <MovieDetails movie={heroMovie} onClose={() => setShowDetails(false)} />
              )}
            </View>
          </ImageBackground>
        )}

        {/* Genre Filter */}
        <View style={styles.filterBar}>
          {["All", "Action", "Comedy", "Drama", "Horror", "Crime", "Thriller","Romance"].map((genre) => (
            <TouchableOpacity
              key={genre}
              style={[
                styles.filterChip,
                selectedFilter === genre && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(genre)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === genre && styles.filterTextActive,
                ]}
              >
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Featured Movies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Releases</Text>
          <FlatList
            horizontal
            data={featuredMovies}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <MovieCard movie={item} onAddToCart={() => addToCart(item)} />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {selectedFilter === "All"
        ? genres.map((genre) => {
            const moviesByGenre = movies.filter((m) => m.genre === genre);
            return (
              <View style={styles.section} key={genre}>
                <Text style={styles.sectionTitle}>{genre}</Text>
                <FlatList
                  horizontal
                  data={moviesByGenre}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <MovieCard
                      movie={item}
                      onAddToCart={() => addToCart(item)}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
                <View style={styles.divider} />
              </View>
            );
          })
        : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{selectedFilter}</Text>
            <FlatList
              horizontal
              data={filteredMovies}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <MovieCard
                  movie={item}
                  onAddToCart={() => addToCart(item)}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.divider} />
          </View>
        )}

        {/* Movies by Genre (filtered) */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedGenre === "All" ? "All Movies" : selectedGenre}
          </Text>
          <FlatList
            horizontal
            data={filteredMovies}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <MovieCard movie={item} onAddToCart={() => addToCart(item)} />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View> */}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  hero: {
    height: 420,
    justifyContent: "flex-end",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    padding: 20,
  },
  featuredLabel: {
    color: "#bbb",
    fontSize: 13,
    marginBottom: 5,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 16,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 12,
  },
  glassButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  glassButtonSecondary: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  glassButtonText: {
    color: "#fff",
    fontWeight: "600",
    letterSpacing: 1,
  },
  filterBar: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  filterChipActive: {
    backgroundColor: "#40E0D0",
    borderColor: "#40E0D0",
  },
  filterText: {
    color: "#bbb",
    fontSize: 13,
  },
  filterTextActive: {
    color: "#000",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 15,
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 20,
    paddingLeft: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
});
