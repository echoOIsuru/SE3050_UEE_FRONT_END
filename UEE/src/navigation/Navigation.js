import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image } from "react-native";
import HomeScreen from "../pages/Home";
import AboutScreen from "../pages/About"
import RequestList from '../pages/requestList';
import CreateDonation from '../pages/CreateDonation';
import SelectedPersonList from '../pages/SelectedPersonList';
import EditDonationType from '../pages/EditDonationType';
import DeleteDonation from '../pages/DeleteDonation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { create } from 'react-native-axios/lib/axios';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
const Request = () => {

    return (
        <Stack.Navigator>

            <Stack.Screen name="RequestList" component={RequestList} />
            <Stack.Screen name="CreateDonation" component={CreateDonation} />
            <Stack.Screen name="Selected person list" component={SelectedPersonList} />
            <Stack.Screen name="EditDonationType" component={EditDonationType} />
            <Stack.Screen name="DeleteDonation" component={DeleteDonation} />

        </Stack.Navigator>
    )
}

const Create = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="CreateDonation" component={CreateDonation} />
            <Stack.Screen name="RequestList" component={RequestList} />
            <Stack.Screen name="Selected person list" component={SelectedPersonList} />
            <Stack.Screen name="EditDonationType" component={EditDonationType} />
            <Stack.Screen name="DeleteDonation" component={DeleteDonation} />

        </Stack.Navigator>
    )
}


const Select = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Selected person list" component={SelectedPersonList} />
            <Stack.Screen name="CreateDonation" component={CreateDonation} />
            <Stack.Screen name="RequestList" component={RequestList} />
            <Stack.Screen name="EditDonationType" component={EditDonationType} />
            <Stack.Screen name="DeleteDonation" component={DeleteDonation} />


        </Stack.Navigator>
    )
}


export default function Navigation() {

    return (

        <Tab.Navigator>


            <Tab.Screen

                name="Request"
                component={Request}
                options={{


                    tabBarIcon: ({ focused }) => (

                        <View>

                            <Image source={require('../assets/listicon.png')}
                                style={{ tintColor: focused ? '#FA8072' : 'black' }}
                            />
                        </View>
                    ),



                    headerShown: false,

                    tabBarHideOnKeyboard: true

                }}

            />


<Tab.Screen

name="Create"
component={Create}
options={{


    tabBarIcon: ({ focused }) => (

        <View>

            <Image source={require('../assets/addicon.png')}
                style={{ tintColor: focused ? '#FA8072' : 'black' }}
            />
        </View>
    ),



    headerShown: false,

    tabBarHideOnKeyboard: true

}}

/>



            <Tab.Screen

                name="Select"
                component={Select}
                options={{


                    tabBarIcon: ({ focused }) => (
                
                        <View>
                
                            <Image source={require('../assets/selecticon.png')}
                                style={{ tintColor: focused ? '#FA8072' : 'black' }}
                            />
                        </View>
                    ),
                
                
                
                    headerShown: false,
                
                    tabBarHideOnKeyboard: true
                
                }}
                
                />

        </Tab.Navigator>

    );





}

