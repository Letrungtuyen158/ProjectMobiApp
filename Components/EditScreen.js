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

function EditScreen({ route, navigation }) {
  const [property, setProperty] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [datetime, setDatetime] = useState("");
  const [monthlyprice, setMonthlyprice] = useState("");
  const [furniture, setFurniture] = useState("");
  const [notes, setNotes] = useState("");
  const [namereporter, setNamereporter] = useState("");

  useEffect(() => {
    setProperty(route.params.Property);
    setBedrooms(route.params.Bedrooms);
    setDatetime(route.params.Datetime);
    setMonthlyprice(route.params.Monthlyprice);
    setFurniture(route.params.Furniture);
    setNotes(route.params.Notes);
    setNamereporter(route.params.Namereporter);
  }, []);

  const editData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE table_user set   Bedrooms=? , Datetime=? , Monthlyprice=? , Furniture=? , Notes=? , Namereporter=? where Property=?",
        [
          bedrooms,
          datetime,
          monthlyprice,
          furniture,
          notes,
          namereporter,
          property,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Record Updated Successfully");
            navigation.navigate("HomeScreen");
          } else Alert.alert("Wanning!!,Cannot be Edited");
        }
      );
    });
  };

  const deleteRecord = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM table_user WHERE Property = ?",
          [property],
          (tx, result) => {
            alert("Deleted !!!");
          }
        );
      });
    } catch (error) {}
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={{ fontSize: 24, textAlign: "center", color: "#000" }}>
        Edit
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

      <TouchableOpacity style={styles.touchableOpacity} onPress={editData}>
        <Text style={styles.touchableOpacityText}> Click Here To Edit </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.touchableOpacity,
          { marginTop: 20, backgroundColor: "red" },
        ]}
        onPress={deleteRecord}
      >
        <Text style={styles.touchableOpacityText}> Click Here To Delete </Text>
      </TouchableOpacity>
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
    borderRadius: 7,
    marginTop: 15,
  },

  itemsStyle: {
    fontSize: 22,
    color: "#000",
  },
});
export default EditScreen;
