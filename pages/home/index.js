import { useEffect, useState } from "react";
import { View } from "react-native";
import Product from "../../components/product";
import { getAllProducts } from "../register/product/service/dbService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./style";
import { Dropdown } from "react-native-element-dropdown";
import { getAll } from "../register/category/service/dbService";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);


  const [categories, setCategories] = useState([]);
  async function tableUseEffect() {
    const data = await getAllProducts();
    setProducts(data);
    setFilteredProducts(data)
    const cat = await getAll();
    const select = cat.map((c) => {
      return { label: c.value, value: c.value };
    });
    setCategories(select);
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

  function filter(category){
    const prod = products.filter(pro => (pro.category ===category))
    console.log(prod)
    setFilteredProducts(prod)
  }
  return (
    <View>
      <Dropdown
          // style={[styles.dropdown]}
          // placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={categories}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={""}
          onChange={(item) => {
           filter(item.value);
          }}
        />
      {filteredProducts.map((p, index) => (
        <Product
          key={index.toString()}
          product={p}
          onAddCart={(product, quantity) => setPurchase(product, quantity)}
        ></Product>
      ))}
    </View>
  );
}
