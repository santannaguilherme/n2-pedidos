import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation, NavigationContainer } from "@react-navigation/native";

export default function Menu() {
  const navigation = useNavigation();
  return (
    <View style={[styles.container]}>
      <IconButton
        icon="home"
        size={20}
        onPress={() => navigation.navigate("Home")}
      />
      <IconButton
        icon="plus"
        size={20}
        onPress={() => navigation.navigate("Category")}
      />
      <IconButton
        icon="plus"
        size={20}
        onPress={() => navigation.navigate("Product")}
      />
      <IconButton
        icon="cart"
        size={20}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'flex-end'
  },
});
