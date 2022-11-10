import * as React from 'react';
import { View, Text, Button  } from 'react-native';

export default function AboutScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>About Screen</Text>
            <Button style={{display:'none'}}
                title="Select Subjects"
                onPress={() => navigation.navigate('Subjects')}
            />
        </View>
        
    );
}
