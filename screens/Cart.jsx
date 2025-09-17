import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Cart({ cartItems, removeFromCart, clearCart }) {
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.dailyRate, 0)
    .toFixed(2);

  const handleRentAll = () => {
    if (cartItems.length === 0) return Alert.alert("Cart is empty");
    Alert.alert("Success", `You rented all movies for R ${totalPrice}`);
    clearCart();
  };

  return (
    <LinearGradient colors={["#000000ee", "#2d0142ee"]} style={styles.container}>
      <View style={styles.receipt}>
        {/* Header Row */}
        <View style={styles.rowHeader}>
          <Text style={[styles.headerText, { flex: 2 }]}>Movie</Text>
          <Text style={[styles.headerText, { flex: 1, textAlign: "right" }]}>
            Price
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {cartItems.map((item) => (
            <View key={item._id || item.id} style={styles.row}>
              <Text style={[styles.itemText, { flex: 2 }]}>{item.title}</Text>
              <Text style={[styles.priceText, { flex: 1, textAlign: "right" }]}>
                R {item.dailyRate.toFixed(2)}
              </Text>
              <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                style={[styles.removeButton, { flex: 1 }]}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Footer Total */}
        <View style={styles.footer}>
          <Text style={styles.total}>Total: R {totalPrice}</Text>
          <TouchableOpacity style={styles.rentButton} onPress={handleRentAll}>
            <Text style={styles.rentText}>Rent All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  receipt: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.05)", // glass effect
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#40E0D0",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  rowHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    paddingBottom: 8,
    marginBottom: 10,
  },
  headerText: {
    color: "#40E0D0",
    fontWeight: "bold",
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  itemText: {
    color: "#fff",
    fontSize: 14,
  },
  priceText: {
    color: "#40E0D0",
    fontSize: 14,
    fontWeight: "600",
  },
  removeButton: {
    alignItems: "flex-end",
  },
  removeText: {
    color: "#ff4d4d",
    fontSize: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    paddingTop: 12,
    marginTop: "auto",
  },
  total: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "right",
  },
  rentButton: {
    backgroundColor: "#40E0D0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  rentText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
