import { useEffect, useState } from "react";
import { View } from "react-native";
import Product from "../../components/product";
import { getAllProducts } from "../register/product/service/dbService";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);

  async function tableUseEffect() {
    const data = await getAllProducts();
    setProducts(data);
  }
  useEffect(() => {
    tableUseEffect();
  }, []);

  const setPurchase = async (product, quantity) => {
    let jsonValue = await AsyncStorage.getItem("@purchases");
    if (jsonValue != null) {
      const obj = JSON.parse(jsonValue);
      setPurchases(obj);
    } else {
      setPurchases([]);
    }

    const a = purchases;

    a.push({ product: product, quantity: quantity })
    jsonValue = JSON.stringify(a);
    await AsyncStorage.setItem("@purchases", jsonValue);

  };
  return (
    <View>
      {products.map((p, index) => (
        <Product
          key={index.toString()}
          product={p}
          onAddCart={(product, quantity) => setPurchase(product, quantity)}
        ></Product>
      ))}
    </View>
  );
}
