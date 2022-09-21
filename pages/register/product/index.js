import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, Alert, Keyboard } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView } from "react-native-gesture-handler";
import {
  TextInput,
  Button,
  Card,
  Title,
  IconButton,
  Paragraph,
} from "react-native-paper";
import { getAll } from "../category/service/dbService";
import {
  addProduct,
  createTableProduct,
  deleteProductById,
  editProduct,
  getAllProducts,
} from "./service/dbService";
import styles from "./style";

export default function Product() {
  const [code, setCode] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
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
    const dataProduct = await getAllProducts();
    setProducts(dataProduct);
    const select = data.map((c) => {
      return { label: c.value, value: c.value };
    });
    setCategories(select);
  }
  useEffect(() => {
    tableUseEffect();
  }, []);

  async function save() {
    if(code){
      let obj = {
        code,
        description,
        price,
        category,
      };
      try {
        let resposta = await editProduct(obj);
  
        if (resposta) navigation.navigate("Home");
      } catch (e) {
        Alert.alert(e);
      }
    }else{
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
    }
   
  }

  function editElement(e){
    setDescription(e.description)
    setCode(e.code)
    setPrice(e.price)
    setCategory(e.category)
  }

  async function deleteElement(e){
    deleteProductById(e.code)
    const dataProduct = await getAllProducts();
    setProducts(dataProduct);
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
      <ScrollView>
        {products.map((element, index) => {
          return (
            <View key={index} style={{ flex: 1 }}>
              <Card>
                <Card.Content>
                  <Title>{element.description}</Title>
                  <Paragraph>{"R$ " + element.price}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => editElement(element)}
                  />
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => deleteElement(element)}
                  />
                </Card.Actions>
              </Card>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
