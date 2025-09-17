// MovieCard.jsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function MovieCard({ movie, onAddToCart }) {
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

        <TouchableOpacity style={styles.button} onPress={onAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "rgba(64,224,208,0.15)", // glassy turquoise
    borderWidth: 1,
    borderColor: "#40E0D0",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#40E0D0",
    fontWeight: "bold",
  },
});
