import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "./components/menu";
import Category from "./pages/register/category";
import Home from "./pages/home";
import Product from "./pages/register/product";
import { ScrollView } from "react-native-gesture-handler";

export default function App() {
  const Stack = createNativeStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#fff",
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Stack.Navigator style={styles.stack}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Product" component={Product} />
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
    height: 300,
  },
  stack: {
    backgroundColor: "#fff",
  },
});
