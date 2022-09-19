import { useEffect, useState } from "react";
import { View } from "react-native";
import Product from "../../components/product";
import { getAllProducts } from "../register/product/service/dbService";

export default function Home() {
  const [products, setProducts] = useState([]);
  async function tableUseEffect() {
    const data = await getAllProducts();
    setProducts(data);
  }
  useEffect(() => {
    tableUseEffect();
  }, []);
  return (
    <View>
      {products.map((p, index) => (
        <Product key={index.toString()} product = {p}></Product>
      ))}
    </View>
  );
}
