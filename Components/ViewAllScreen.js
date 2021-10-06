import "react-native-gesture-handler";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { DbConnection } from "../database/Db-connection";
import React, { useState, useEffect } from "react";

const db = DbConnection.getConnection();

function ViewAllScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM table_user", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setItems(temp);

        if (results.rows.length >= 1) {
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      });
    });
  }, []);

  const listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  const emptyMSG = (status) => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          No Record Inserted Database is Empty
        </Text>
      </View>
    );
  };

  const navigateToEditScreen = (
    property,
    bedrooms,
    datetime,
    monthlyprice,
    furniture,
    notes,
    namereporter
  ) => {
    navigation.navigate("EditScreen", {
      Property: property,
      Bedrooms: bedrooms,
      Datetime: datetime,
      Monthlyprice: monthlyprice,
      Furniture: furniture,
      Notes: notes,
      Namereporter: namereporter,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {empty ? (
        emptyMSG(empty)
      ) : (
        <FlatList
          data={items}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.Id} style={{ padding: 20 }}>
              <TouchableOpacity
                onPress={() =>
                  navigateToEditScreen(
                    item.Property,
                    item.Bedrooms,
                    item.Datetime,
                    item.Monthlyprice,
                    item.Furniture,
                    item.Notes,
                    item.Namereporter
                  )
                }
              >
                <Text style={styles.itemsStyle}> Id: {item.Id} </Text>
                <Text style={styles.itemsStyle}>
                  {" "}
                  property: {item.Property}{" "}
                </Text>
                <Text style={styles.itemsStyle}>
                  {" "}
                  bedrooms: {item.Bedrooms}{" "}
                </Text>
                <Text style={styles.itemsStyle}>
                  {" "}
                  datetime: {item.Datetime}{" "}
                </Text>
                <Text style={styles.itemsStyle}>
                  {" "}
                  monthlyprice: {item.Monthlyprice}{" "}
                </Text>
                <Text style={styles.itemsStyle}>
                  {" "}
                  furniture: {item.Furniture}{" "}
                </Text>
                <Text style={styles.itemsStyle}> note: {item.Notes} </Text>

                <Text style={styles.itemsStyle}>
                  {" "}
                  namereporter: {item.Namereporter}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },

  touchableOpacity: {
    backgroundColor: "#0091EA",
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  touchableOpacityText: {
    color: "#FFFFFF",
    fontSize: 23,
    textAlign: "center",
    padding: 8,
  },

  textInputStyle: {
    height: 45,
    width: "90%",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#00B8D4",
    borderRadius: 7,
    marginTop: 15,
  },

  itemsStyle: {
    fontSize: 22,
    color: "#000",
  },
});
export default ViewAllScreen;
