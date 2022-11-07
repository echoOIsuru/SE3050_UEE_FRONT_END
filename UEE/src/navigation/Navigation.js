import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../pages/Home";
import AboutScreen from "../pages/About"
import RequestList from '../pages/requestList';
import CreateDonation from '../pages/CreateDonation';
import SelectedPersonList from '../pages/SelectedPersonList';
import EditDonationType from '../pages/EditDonationType';
import DeleteDonation from '../pages/DeleteDonation';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="RequestList" component={RequestList} />
            <Stack.Screen name="CreateDonation" component={CreateDonation} />
            <Stack.Screen name="Selected person list" component={SelectedPersonList} />
            <Stack.Screen name="EditDonationType" component={EditDonationType} />
            <Stack.Screen name="DeleteDonation" component={DeleteDonation} />
        </Stack.Navigator>
    );
}

