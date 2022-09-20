import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { Card, List, Paragraph, Title } from 'react-native-paper';
import { createTablePurchases, getAllPurchases } from "../cart/service/dbService";

export default function Purchases() {
    const [purchases, setPurchases] = useState([]);
    let tableCreated = false;
    async function tableUseEffect() {
        if (!tableCreated) {
            tableCreated = true;
            await createTablePurchases();
        }
    }

    async function load() {
        const data = await getAllPurchases();
        const p = data.map(d => {
            return ({ code: d.code, purchase: JSON.parse(d.purchase), date: d.date })
        })
        setPurchases(p);
        console.log(p)
        console.log(p)
    }






    useEffect(() => {
        tableUseEffect();
        load();
    }, []);


    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);

    function getPrice(purchase){
        let total = 0;
        for(let p of purchase){
            total = total+ (p.quantity*p.product.price)
        }
        console.log(total)

        return("Total R$ " + total)
    }
    return (
        <List.Section>
            {purchases.map((purchase, index) => {
                return (
                    <List.Accordion key={index}
                        title={"Pedido " + purchase.code}
                        left={props => <List.Icon {...props} icon="baguette" />}>
                        {purchase.purchase.map((element, index) => {
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
                        <List.Item title={purchase.date} />
                        <List.Item title={getPrice(purchase.purchase)} />
                    </List.Accordion>
                )
            })}
        </List.Section>
    );
}
