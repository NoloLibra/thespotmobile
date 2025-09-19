// MovieCard.jsx
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import MovieDetails from "../screens/MovieDetails";

export default function MovieCard({ movie, onAddToCart }) {
  const [showDetails, setShowDetails] = useState(false);

    //Show Movie Details Popup
  const handleShowDetails = () => {
    setShowDetails(true);
  };
    //Close Movie Details Popup
  const handleCloseDetails = () => {
    setShowDetails(false);
  };


  return (
    <View style={styles.card}>
      {/* Background image */}
      <Image
        source={{ uri: movie.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Dark gradient overlay */}
      <View style={styles.overlay} />

      {/* Glassmorphism text container */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {movie.description}
        </Text>
        <Text style={styles.price}>R {movie.dailyRate}</Text>
        <Text style={styles.rating}>⭐ {movie.rating}</Text>

        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity style={styles.detailsButton} onPress={() => setShowDetails(true)}>
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {showDetails && (
        <MovieDetails movie={movie} onClose={() => setShowDetails(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    height: 260,
    borderRadius: 16,
    marginRight: 12,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.4)", // glassy effect
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    elevation: 6,
    shadowColor: "#40E0D0",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // dark gradient
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.08)", // glass panel
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: "#ddd",
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#40E0D0",
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: "#bbb",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#40E0D0",
    color: "#000",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  detailsButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#40E0D0",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 6,
    paddingHorizontal: 10,
  },
  detailsButtonText: {
    color: "#40E0D0",
    fontWeight: "bold",
  },
});
