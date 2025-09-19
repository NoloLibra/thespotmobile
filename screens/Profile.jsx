// Profile.jsx
import React, { useState, useContext, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert, Image, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const COLORS = {
  black: "#000000",
  purple: "#3A015C",
  turquoise: "#40E0D0",
};

export default function Profile() {
  const { user, signOut, updateUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name); // populate with logged-in name
    }
  }, [user]);

  // Handle name update
const handleUpdateName = async () => {
  if (!name.trim()) {
    Alert.alert("Error", "Name cannot be empty");
    return;
  }

  try {
    const updatedUser = await updateUser({ name }); // call context function to update backend
    // Confirmation popup
    Alert.alert(
      "Success",
      `Your name has been updated to "${updatedUser.name}"`,
      [{ text: "OK" }]
    );
  } catch (err) {
    Alert.alert("Error", "Failed to update name");
    console.log(err);
  }
}

// Handle Password Update
const handleUpdatePassword = () => {
  if (!password.trim()) {
    Alert.alert("Error", "Password cannot be empty");
    return;
  }
  try {
    // Call backend to update password here
    Alert.alert("Success", "Your password has been updated", [{ text: "OK" }]);
  } catch (err) {
    Alert.alert("Error", "Failed to update password");
    console.log(err);
  }
};


  // Handle logout
  const handleLogout = () => {
    signOut(); // clears user from context
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Call backend delete endpoint here, then:
              signOut();
              Alert.alert("Account deleted successfully");
            } catch (err) {
              Alert.alert("Error", "Failed to delete account");
              console.log(err);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile image */}
      <Image
        source={require("../assets/profile.png")}
        style={styles.profileImage}
      />

      {/* Name input */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateName}>
        <Text style={styles.buttonText}>Update Name</Text>
      </TouchableOpacity>

      {/* Email */}
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{user?.email}</Text>

      {/* Password input */}
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter new password"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>

      {/* Buttons */}
      <TouchableOpacity style={[styles.button, styles.logout]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.delete]} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    padding: 50,
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.turquoise,
  },
  label: {
    color: COLORS.turquoise,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    alignSelf: "flex-start",
  },
  text: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderColor: COLORS.turquoise,
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
  },
  button: {
    width: "100%",
    backgroundColor: COLORS.turquoise,
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: "bold",
    fontSize: 16,
  },
  logout: {
    backgroundColor: COLORS.turquoise,
    color: "#fff",
    marginTop: 100,
  },
  delete: {
    backgroundColor: "#990000",
  },
});
