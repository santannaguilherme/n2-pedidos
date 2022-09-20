import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";

export default function Cart() {
  const [products, setProducts] = useState([]);
  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  async function loadPurchase() {
    const obj = await AsyncStorage.getItem("@purchases").then((res) => {
      return JSON.parse(res);
    });
    setProducts(obj);
  }

  function p() {
    loadPurchase();
  }
  useEffect(() => {
    loadPurchase();
  }, []);

  function buy(){
    const code = createUniqueId();
    const purchase = JSON.stringify(products)
    console.log(code,purchase)
  }
  return (
    <View>
      {/* {products.map(product => {
      <View>{product.toString()}</View>
     })} */}
      {products.map((element, index) => {
        return (
          <View key={index} style={{ flex: 1 }}>
            <Card>
              <Card.Content>
                <Title>{element.product.description}</Title>
                <Paragraph>
                  {element.quantity + " x R$ " + element.product.price}
                </Paragraph>
              </Card.Content>
            </Card>{" "}
          </View>
        );
      })}
      <Button mode="outlined" onPress={() => buy()}>
        Comprar
      </Button>
    </View>
  );
}
