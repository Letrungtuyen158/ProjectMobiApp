import {
  SafeAreaView,
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

function HomeScreen({ navigation }) {
  const [property, setProperty] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [datetime, setDatetime] = useState("");
  const [monthlyprice, setMonthlyprice] = useState("");
  const [furniture, setFurniture] = useState("");
  const [notes, setNotes] = useState("");
  const [namereporter, setNamereporter] = useState("");

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_user", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_user(Id INTEGER PRIMARY KEY AUTOINCREMENT, Property TEXT , Bedrooms TEXT, Datetime TEXT, Monthlyprice TEXT, Furniture TEXT, Notes TEXT, Namereporter TEXT)",
              []
            );
          }
        }
      );
    });
  }, []);

  const insertData = () => {
    if (!property) {
      Alert.alert(" Warning!!!.Please Enter Property Name !");
      return;
    }
    if (!bedrooms) {
      Alert.alert("Warning!!!.Please Enter Bedrooms !");
    }
    if (!datetime) {
      Alert.alert("Warning!!!.Please Enter Date and Time !");
      return;
    }
    if (!monthlyprice) {
      Alert.alert("Warning!!!.Please Enter Monthly  Price !");
      return;
    }
    if (!furniture) {
      Alert.alert("Warning!!!.Please Enter Furniture !");
      return;
    }
    if (!notes) {
      Alert.alert("Warning!!!.Please Enter Notes !");
      return;
    }
    if (!namereporter) {
      Alert.alert("Warning!!!.Please Enter Your Name or Reporter !");
      return;
    } else {
      db.transaction(function (tx) {
        tx.executeSql(
          "INSERT INTO table_user (Property, Bedrooms, Datetime, Monthlyprice, Furniture, Notes, Namereporter) VALUES (?,?,?,?,?,?,?)",
          [
            property,
            bedrooms,
            datetime,
            monthlyprice,
            furniture,
            notes,
            namereporter,
          ],
          (tx, results) => {}
        );
      });
      navigation.navigate("ViewAllScreen");
    }
  };
  const navigateToViewScreen = () => {
    navigation.navigate("ViewAllScreen");
  };
  const navigateToSearch = () => {
    navigation.navigate("Search");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Text style={{ fontSize: 24, textAlign: "center", color: "#000" }}>
          Home
        </Text>

        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setProperty(text)}
          placeholder="Enter Property Name"
          value={property}
        />

        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setBedrooms(text)}
          placeholder="Enter your Bedrooms "
          value={bedrooms}
        />

        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setDatetime(text)}
          placeholder="Enter Datetime"
          value={datetime}
        />

        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setMonthlyprice(text)}
          placeholder="Enter Monthlyprice"
          value={monthlyprice}
        />

        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setFurniture(text)}
          placeholder="Enter Furniture"
          value={furniture}
        />

        <TextInput
          style={[styles.textInputStyle, { marginBottom: 20 }]}
          onChangeText={(text) => setNotes(text)}
          placeholder="Enter Notes"
          value={notes}
        />
        <TextInput
          style={[styles.textInputStyle, { marginBottom: 20 }]}
          onChangeText={(text) => setNamereporter(text)}
          placeholder="Enter Namereporter"
          value={namereporter}
        />

        <TouchableOpacity style={styles.touchableOpacity} onPress={insertData}>
          <Text style={styles.touchableOpacityText}> Click Here Create </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.touchableOpacity, { marginTop: 20 }]}
          onPress={navigateToViewScreen}
        >
          <Text style={styles.touchableOpacityText}> Click Here View All </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchableOpacity, { marginTop: 20 }]}
          onPress={navigateToSearch}
        >
          <Text style={styles.touchableOpacityText}> Search </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    width: "90%",
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
    borderRadius: 10,
    marginTop: 15,
  },

  itemsStyle: {
    fontSize: 22,
    color: "#000",
  },
});
export default HomeScreen;
