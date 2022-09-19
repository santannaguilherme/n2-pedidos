import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput, Button } from "react-native-paper";
import { add, createTable, getAll } from "./service/dbService";
import styles from "./style";

const data = [
  { label: "Bebida", value: "DRINK" },
  { label: "Salgado", value: "FOOD" },
  { label: "Doce", value: "CANDY" },
];

export default function Category() {
  const [value, setValue] = useState(null);
  const [type, setType] = useState(null);

  let tableCreated = false;
  async function tableUseEffect() {
    if (!tableCreated) {
      tableCreated = true;
      await createTable();
    }

    console.log("UseEffect...");
    await getAll();
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

      if (res) Alert.alert("adicionado com sucesso!");
      else Alert.alert("Falhou miseravelmente!");

      Keyboard.dismiss();
      await getAll();
    } catch (e) {
      Alert.alert(e);
    }

    console.log({ type, value }); // salvar no sqlite
  }

  return (
    <View>
      <View>
        <TextInput
          label="Nome"
          value={value}
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
    </View>
  );
}
