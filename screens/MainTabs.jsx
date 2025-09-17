import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert } from "react-native";
import Home from "./Home";
import Cart from "./Cart";
import Profile from "./Profile";
import { Home as HomeIcon, ShoppingCart, User } from "lucide-react-native";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  // Cart state
  const [cartItems, setCartItems] = useState([]);

  // Functions to manage cart
  const addToCart = (movie) => {
    setCartItems((prev) => [...prev, movie]);
     Alert.alert("Added to Cart", `${movie.title} has been added to your cart!`);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000", borderTopColor: "#3A015C" },
        tabBarActiveTintColor: "#40E0D0",
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}
      >
        {(props) => <Home {...props} addToCart={addToCart} />}
      </Tab.Screen>

      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart color={color} size={size} />
          ),
        }}
      >
        {(props) => (
          <Cart
            {...props}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
