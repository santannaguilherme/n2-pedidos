import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";
import { useState } from "react";

export default function Product({ product, onAddCart }) {
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
          <View>
            <TextInput
              mode="outlined"
              style={[styles.text]}
              value={quantity}
              onChangeText={(text) => {}}
            />
          </View>

          <IconButton icon="plus" size={20} onPress={() => setValue(1)} />
          <IconButton
            icon="cart-arrow-down"
            size={20}
            onPress={() => onAddCart(product,quantity)}
          />
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
  text: {
    width: 50,
  },
});
