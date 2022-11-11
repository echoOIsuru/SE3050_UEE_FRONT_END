import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../pages/Home";
import AboutScreen from "../pages/About";
import IdentifiedSkills from "../pages/it20218058/IdentifiedSkills";
import CareerPaths from "../pages/it20218058/CareerPaths";
import Offers from "../pages/it20218058/Offers";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Your Identified Skills" component={IdentifiedSkills} />
            <Stack.Screen name="Available Career Paths" component={CareerPaths} />
            <Stack.Screen name="Offers" component={Offers} />
        </Stack.Navigator>
    );
}

