import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View, TextInput } from "react-native";
import { ArrowLeft } from "lucide-react-native";

const COLORS = {
  black: "#000000",
  turquoise: "#40E0D0",
};

export default function Login({ navigation }) {
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
          placeholder="Email"
          placeholderTextColor="#888"
          style={{
            width: "100%",
            backgroundColor: "#1c1c1c",
            color: "white",
            padding: 12,
            borderRadius: 8,
            marginBottom: 15,
          }}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={{
            width: "100%",
            backgroundColor: "#1c1c1c",
            color: "white",
            padding: 12,
            borderRadius: 8,
            marginBottom: 20,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.turquoise,
            padding: 14,
            borderRadius: 25,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: COLORS.black }}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
