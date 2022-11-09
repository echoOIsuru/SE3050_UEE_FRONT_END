import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../pages/Home";
import AboutScreen from "../pages/About";
import SkillNotFoundDashboard from '../pages/SkillNotFoundDashboard';
import ResourceLibrary from '../pages/ResourceLibrary';
import Favorites from '../pages/Favorites';
import FindMySkills from '../pages/FindMySkills';


const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={SkillNotFoundDashboard} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Resource Library" component={ResourceLibrary} />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="Find My Skills" component={FindMySkills} />
        </Stack.Navigator>
    );
}

