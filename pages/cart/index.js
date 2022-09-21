import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import {
  addPurchases,
  createTablePurchases,
  dropTable,
  getAllPurchases,
} from "./service/dbService";

export default function Cart({ puchases, clearCart }) {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  let tableCreated = false;
  async function tableUseEffect() {
    // await dropTable()
    if (!tableCreated) {
      tableCreated = true;
      await createTablePurchases();
    }
  }

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  function loadPurchase() {
    // const obj = await AsyncStorage.getItem("@purchases").then((res) => {
    //   return JSON.parse(res);
    // });
    // if(obj){
    console.log(puchases);
    setProducts(puchases);
    // }else{
    //   setProducts([]);
    // }
  }

  function p() {
    loadPurchase();
  }
  useEffect(() => {
    tableUseEffect();
    loadPurchase();
  }, []);

  async function buy() {
    const purchase = JSON.stringify(products);
    const code = createUniqueId();
    var date = new Date().toISOString().split("T")[0];
    let obj = {
      code,
      purchase,
      date,
    };
    console.log(obj);
    try {
      let res = await addPurchases(obj);

      if (res) {
        clearCart();
        navigation.navigate("Home");
      }
      await getAllPurchases();
    } catch (e) {
      Alert.alert(e);
    }
  }
  return (
    <View>
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
            </Card>
          </View>
        );
      })}
      <Button mode="outlined" onPress={() => buy()}>
        Comprar
      </Button>
    </View>
  );
}
