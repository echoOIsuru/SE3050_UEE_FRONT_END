import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, DevSettings, Pressable } from 'react-native';
import { Icon } from '@rneui/themed';
import { HStack, Button } from "@react-native-material/core";
import { VStack, Box, Divider } from "@react-native-material/core";
import services from '../services/services';
import { RadioButton } from 'react-native-paper';


export default function Questions(props) {
    const [checked, setChecked] = React.useState('first');
    const [checked2, setChecked2] = React.useState('');

    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <View style={{ flex: 1, marginTop: -70, paddingBottom: 20 }}>
            <View style={{ flex: 1, alignSelf: 'center', backgroundColor: "#DCDCDC", borderRadius: 20, width: 380, marginTop: 20, marginBottom: 20 }}>
                <View style={{ alignSelf: 'flex-start', padding: 20 }}>
                    <Text style={{ fontSize: 24, color: 'black' }}>Question {props.count}</Text>
                    <Text style={{ fontSize: 15, paddingTop: 20 }}>{props.currentQuestion.question}</Text>
                </View>
                <View style={{ padding: 15 }}>
                    <RadioButton
                        value="first"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => { setChecked('first'), setChecked2('') }}
                    />
                    <Text style={{ marginTop: -40, marginLeft: 40, padding: 10 }}> {props.currentQuestion.answer1} </Text>
                    <RadioButton
                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => { setChecked('second'), setChecked2('') }}
                    />
                    <Text style={{ marginTop: -40, marginLeft: 40, padding: 10 }}> {props.currentQuestion.answer2} </Text>
                    <RadioButton
                        value="third"
                        status={checked2 === 'third' ? 'checked' : 'unchecked'}
                        onPress={() => { setChecked2('third'), setChecked('') }}
                    />
                    <Text style={{ marginTop: -40, marginLeft: 40, padding: 10 }}> {props.currentQuestion.answer3} </Text>
                    <RadioButton
                        value="fourth"
                        status={checked2 === 'fourth' ? 'checked' : 'unchecked'}
                        onPress={() => { setChecked2('fourth'), setChecked('') }}
                    />
                    <Text style={{ marginTop: -40, marginLeft: 40, padding: 10 }}> {props.currentQuestion.answer4} </Text>

                </View>
            </View>

        </View>
    )
}

