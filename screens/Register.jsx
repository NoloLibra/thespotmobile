// Register.jsx
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { ArrowLeft } from "lucide-react-native";

const COLORS = {
  black: "#000000",
  turquoise: "#40E0D0",
};

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://192.168.18.62:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Registration successful! Please login.");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.message || "Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to server");
      console.log(error);
    }
  };

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
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
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
          onPress={handleRegister}
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
