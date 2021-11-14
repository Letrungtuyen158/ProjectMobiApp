import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/Homescreen";
import ViewAllScreen from "./Components/ViewAllScreen";
import Notification from "./Components/Notification";
const TL = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TL.Navigator>
        <TL.Screen name="HomeScreen" component={HomeScreen} />

        <TL.Screen name="ViewAllScreen" component={ViewAllScreen} />
        <TL.Screen name="Notification" component={Notification} />




      </TL.Navigator>
    </NavigationContainer>
  );
}
