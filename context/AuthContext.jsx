// context/AuthContext.jsx
import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Sign in (login)
  const signIn = async (data) => {
    setUser(data.user);
    setToken(data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    await AsyncStorage.setItem("token", data.token);
  };

  // Sign out (logout)
  const signOut = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
  };

  // Update user info (e.g., name, password)
  const updateUser = async (updates) => {
    try {
      const response = await fetch("http://192.168.0.100:5000/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      // Update context with new user
      setUser(data.user);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      return data.user; // return updated user
    } catch (err) {
      console.log("Error updating user:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
