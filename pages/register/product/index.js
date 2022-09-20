import { useEffect, useState } from "react";
import { View, Text, Alert, Keyboard } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput, Button } from "react-native-paper";
import { getAll } from "../category/service/dbService";
import { addProduct, createTableProduct } from "./service/dbService";
import styles from "./style";

// const data = [
//   { label: "Bebida", value: "DRINK" },
//   { label: "Salgado", value: "FOOD" },
//   { label: "Doce", value: "CANDY" },
// ];

export default function Product() {
  const [code, setCode] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  let tableCreated = false;
  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }
  async function tableUseEffect() {
    if (!tableCreated) {
        tableCreated = true;
        await createTableProduct();
      }
  

    const data = await getAll();
    const select = data.map((c) => {
      return { label: c.value, value: c.value };
    });
    setCategories(select);
  }
  useEffect(() => {
    tableUseEffect();
  }, []);

  async function save() {
    let obj = {
      code: createUniqueId(),
      description,
      price,
      category,
    };
    try {
      let resposta = await addProduct(obj);

      if (resposta) navigation.navigate("Home");

    } catch (e) {
      Alert.alert(e);
    }

    console.log(obj); // salvar no sqlite
  }

  return (
    <View>
      <View>
        <TextInput
          label="Nome"
          mode="outlined"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          label="Preço"
          mode="outlined"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
      </View>
      <View>
        <Text>Tipo</Text>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={categories}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={""}
          value={category}
          onChange={(item) => {
            setCategory(item.value);
          }}
        />
      </View>
      <Button
        mode="contained"
        onPress={() => {
          save();
        }}
      >
        <Text>Salvar</Text>
      </Button>
    </View>
  );
}
