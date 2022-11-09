import React from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Text, TouchableOpacity } from "react-native";

export default function ListView2() {
    return (


        <TouchableOpacity
            style={{ borderRadius: 5, paddingVertical: 10, paddingHorizontal: 30, flexDirection: 'row', backgroundColor: '#3578E5' }}
            onPress={() => this.signInFacebook(context.updateAuthUser)}>
            <FontAwesome name='facebook' size={20} color='#fff' />
            <Text style={{ marginLeft: 10, color: '#fff', fontWeight: 'bold' }}>
                Login With Facebook
            </Text>
        </TouchableOpacity>
    )
}
