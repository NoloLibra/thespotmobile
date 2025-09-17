// Landing.jsx
import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LogIn, UserPlus } from "lucide-react-native";
import { AuthContext } from "../context/AuthContext";

const COLORS = {
  black: "#000000",
  purple: "#3A015C",
  turquoise: "#40E0D0",
};

export default function Landing({ navigation }) {
  const { userToken } = useContext(AuthContext);

  return (
    <LinearGradient
      colors={[COLORS.purple, COLORS.black]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ fontSize: 36, fontWeight: "bold", color: COLORS.turquoise, marginBottom: 8 }}>
        The Spot
      </Text>
      <Text style={{ fontSize: 16, color: "white", marginBottom: 40 }}>
        Your Movies, Your Space.
      </Text>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 14,
          borderRadius: 25,
          marginBottom: 20,
          width: 200,
          justifyContent: "center",
          borderColor: COLORS.turquoise,
          borderWidth: 2,
          shadowColor: COLORS.turquoise,
          shadowOpacity: 0.7,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 0 },
          backgroundColor: "rgba(64,224,208,0.1)", // subtle neon glass
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <LogIn color={COLORS.turquoise} size={20} style={{ marginRight: 8 }} />
        <Text style={{ fontSize: 16, fontWeight: "bold", color: COLORS.turquoise }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: COLORS.turquoise,
          padding: 12,
          borderRadius: 25,
          width: 200,
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Register")}
      >
        <UserPlus color={COLORS.turquoise} size={20} style={{ marginRight: 8 }} />
        <Text style={{ fontSize: 16, fontWeight: "bold", color: COLORS.turquoise }}>Register</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
