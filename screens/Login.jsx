// Login.jsx
import React, { useState, useContext } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { AuthContext } from "../context/AuthContext";

const COLORS = {
  black: "#000000",
  turquoise: "#40E0D0",
};

export default function Login({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.100:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

    if (response.ok) {
      signIn(data.user, data.token); // pass only the user object
      Alert.alert("Success", `Welcome ${data.user.name}!`);
      signIn(data); // move to main app
    } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to server");
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
          <ArrowLeft color={COLORS.turquoise} size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: COLORS.turquoise }}>The Spot</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
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
          onPress={handleLogin}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: COLORS.black }}>Login</Text>
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
