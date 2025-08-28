import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View, TextInput } from "react-native";
import { ArrowLeft } from "lucide-react-native";

const COLORS = {
  black: "#000000",
  turquoise: "#40E0D0",
};

export default function Register({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
          <ArrowLeft color={COLORS.turquoise} size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: COLORS.turquoise }}>The Spot</Text>
      </View>

      {/* Content */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <TextInput
          placeholder="Name & Surname"
          placeholderTextColor="#888"
          style={styles.input}
        />
        <TextInput placeholder="Email" placeholderTextColor="#888" style={styles.input} />
        <TextInput placeholder="Username" placeholderTextColor="#888" style={styles.input} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.turquoise,
            padding: 14,
            borderRadius: 25,
            width: "100%",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: COLORS.black }}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  input: {
    width: "100%",
    backgroundColor: "#1c1c1c",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
};
