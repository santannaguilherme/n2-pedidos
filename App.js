import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "./components/menu";
import Category from "./pages/register/category";
import Home from "./pages/home";
import Product from "./pages/register/product";
import { ScrollView } from "react-native";
import Cart from "./pages/cart";
import Purchases from "./pages/purchases";
import { useState } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [products, setProducts] = useState([]);

  function setPurchase(product, quantity) {
    console.log({ product: product, quantity: quantity })
    let cart = [...products];
    cart.push({ product: product, quantity: quantity })
    console.log(cart)
    setProducts(cart);
  }
  function clearCart(){
    setProducts([]);
  }
  return (
    <NavigationContainer>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Stack.Navigator style={styles.stack}>
            <Stack.Screen name="Home">
              {(props) => (
                <Home
                  {...props}
                  purchase={products}
                  setPurchase={(product, quantity) => setPurchase(product, quantity)}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="Cart">
              {(props) => <Cart {...props} puchases={products} clearCart={()=>clearCart()} />}
            </Stack.Screen>
            <Stack.Screen name="Purchases" component={Purchases} />
          </Stack.Navigator>
        </ScrollView>
        <Menu style={[styles.menu]}></Menu>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",

    justifyContent: "center",
    padding: 16,
  },
  menu: {
    position: "relative",
    bottom: 0,
  },
  scroll: {
    // height: 300,
    // alignItems: "center",
  },
  stack: {
    backgroundColor: "#fff",
  },
});
