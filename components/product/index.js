import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { useState } from "react";

export default function Product({ product }) {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);

  const setValue = (qtd) => {
    setQuantity(quantity + qtd);
  };
  return (
    <View>
      <Card style={[styles.container]}>
        <Card.Content>
          <Title>{product.description}</Title>
          <Paragraph>{"R$ " + product.price}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <IconButton
            icon="minus"
            size={20}
            disabled={quantity === 0}
            onPress={() => setValue(-1)}
          />
          <TextInput value={quantity} onChangeText={(text) => {}} />
          <IconButton icon="plus" size={20} onPress={() => setValue(1)} />
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
