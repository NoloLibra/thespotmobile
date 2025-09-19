import React from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const MovieDetails = ({ movie, onClose }) => {
  return (
    <Modal animationType="fade" transparent visible>
      {/* Semi-transparent background for cross-platform */}
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        onPress={onClose}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
      </TouchableOpacity>

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>&times;</Text>
          </TouchableOpacity>

          <Image source={{ uri: movie.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.rating}>Rating: {movie.rating}</Text>
          <Text style={styles.description}>{movie.description}</Text>
          <Text style={styles.price}>Price: R{movie.dailyRate}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalView: {
    backgroundColor: "#1F1F1F",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 24,
    color: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  rating: {
    marginTop: 6,
    color: "#ccc",
  },
  description: {
    marginTop: 10,
    color: "#ccc",
  },
  price: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
  },
});

export default MovieDetails;
