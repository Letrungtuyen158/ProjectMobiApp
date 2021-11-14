import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { Audio } from 'expo-av';

const Notification = () => {
  const RingABell = async () => {
    const { sound } = await Audio.Sound.createAsync(require('./sound.mp3'));
    await sound.playAsync();
  };

  const Vibrate = () => {
    Vibration.vibrate(500);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
      
       
        
      <TouchableOpacity style={styles.touchableOpacity} onPress={RingABell}>
          <Text style={styles.touchableOpacityText}> ring a bell  </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchableOpacity, { marginTop: 20 }]}
          onPress={Vibrate}
        >
          <Text style={styles.touchableOpacityText}> vibrate </Text>
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


export default Notification;