import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

export default function Menu() {
  const navigation = useNavigation();
  return (
    <View style={[styles.container]}>
      <View>
        <IconButton
          icon="home"
          size={20}
          onPress={() => navigation.navigate("Home")}
        />
        <Text variant="labelSmall">Início</Text>
      </View>
      <View>
        <IconButton
          icon="plus"
          size={20}
          onPress={() => navigation.navigate("Category")}
        />
        <Text variant="labelSmall">Categoria</Text>
      </View>
      <View>
        <IconButton
          icon="plus"
          size={20}
          onPress={() => navigation.navigate("Product")}
        />
        <Text variant="labelSmall">Produto</Text>
      </View>
      <View>
        <IconButton
          icon="cart"
          size={20}
          onPress={() => navigation.navigate("Cart")}
        />
        <Text variant="labelSmall">Carrinho</Text>
      </View>
      <View>
        <IconButton
          icon="baguette"
          size={20}
          onPress={() => console.log("Pressed")}
        />
        <Text variant="labelSmall">Pedidos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
});
