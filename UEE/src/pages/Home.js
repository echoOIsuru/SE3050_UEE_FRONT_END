import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('About')}
            />

            <Button
                title="Go to list"
                onPress={() => navigation.navigate('RequestList')}
            />
       <Button
                title="Go to selected list"
                onPress={() => navigation.navigate('Selected person list')}
            />


            
        </View>
        
    );
}
