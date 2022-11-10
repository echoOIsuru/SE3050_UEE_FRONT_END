import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../pages/Home";
import AboutScreen from "../pages/About"
import Subjects from "../pages/skillDonorPages/Subjects"
import Modules from "../pages/skillDonorPages/Modules"
import CreateModules from "../pages/skillDonorPages/CreateModule"
import UpdateModules from "../pages/skillDonorPages/UpdateModule"
import CourseDetails from "../pages/skillDonorPages/CourseDetails"

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Subjects" component={Subjects} />
            <Stack.Screen name="Modules" component={Modules} />
            <Stack.Screen name="Add Module" component={CreateModules} />
            <Stack.Screen name="Update Module" component={UpdateModules} />
            <Stack.Screen name="Course Details" component={CourseDetails} />
        </Stack.Navigator>
    );
}

