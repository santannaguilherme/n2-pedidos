import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput, Button, Card, Title, IconButton } from "react-native-paper";
import { add, createTable, deleteByValue, getAll } from "./service/dbService";
import styles from "./style";

const data = [
  { label: "Bebida", value: "DRINK" },
  { label: "Salgado", value: "FOOD" },
  { label: "Doce", value: "CANDY" },
];

export default function Category() {
  const [value, setValue] = useState(null);
  const [type, setType] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  let tableCreated = false;
  async function tableUseEffect() {
    if (!tableCreated) {
      tableCreated = true;
      await createTable();
    }

    console.log("UseEffect...");
    let res = await getAll();
    setCategories(res);
  }
  useEffect(() => {
    tableUseEffect();
  }, []);

  async function save() {
    let obj = {
      value,
      type,
    };

    try {
      let res = await add(obj);

      if (res) {
        navigation.navigate("Home");
      }

      setCategories(res);
    } catch (e) {
      Alert.alert(e);
    }
  }

  async function deleteElement(e) {
    deleteByValue(e.value);
    let res = await getAll();
    setCategories(res);
  }

  return (
    <View>
      <View>
        <TextInput
          label="Nome"
          value={value}
          mode="outlined"
          onChangeText={(text) => setValue(text)}
        />
      </View>
      <View>
        <Text>Tipo</Text>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={""}
          value={type}
          onChange={(item) => {
            setType(item.value);
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
        {categories.map((element, index) => {
          return (
            <View key={index} style={{ flex: 1 }}>
              <Card>
                <Card.Content>
                  <Title>{element.value}</Title>
                </Card.Content>
                <Card.Actions>
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
