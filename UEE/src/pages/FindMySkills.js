import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import FindMySkillsTimer from '../components/FindMySkillsTimer';
import Questions from '../components/Questions';

export default function FindMySkills({ navigation }) {

    const [count, setCount] = useState(0);
    const [btnName, setBtnName] = useState('Next');
    const [question, setQuestion] = useState([
        {
            question: 'Find the Missing Term in Multiples of 6 : 6, 12, 18, 24, _, 36, 42, _ 54, 60',
            answer1: '32, 45',
            answer2: '30, 48',
            answer3: '24, 40',
            answer4: '25, 49'

        },
        {
            question: 'If 4 people can do a work in 40 minutes then 8 people can do the same work in ___ minutes',
            answer1: '20',
            answer2: '40',
            answer3: '60',
            answer4: '80'

        },
        {
            question: 'Which among following is also known as white gold?',
            answer1: 'Nickel',
            answer2: 'Rhodium',
            answer3: 'Platinum',
            answer4: 'Palladium'

        },
        {
            question: 'Leishmaniasis is a disease caused by protozoan parasites that belong to the genus Leishmania and is transmitted by the bite of certain species of_________?',
            answer1: 'Mosquito',
            answer2: 'Sand fly',
            answer3: 'Bee',
            answer4: 'None of the above'

        }
    ]);

    const [currentQuestion, setCurrentQuestion] = useState(question[0]);

    nextStep = () => {
        if (count < question.length - 1) {
            setCount(count + 1);
            setCurrentQuestion(question[count + 1]);

            if (count == question.length - 2)
                setBtnName('Finish')

        } else {

            Alert.alert(
                "Completed",
                "We will get back to you soon..",
                [
                    {
                        text: "Continue", onPress: () => {
                            navigation.navigate('Dashboard')
                        }
                    }
                ]
            );


        }

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FindMySkillsTimer />
                <Questions currentQuestion={currentQuestion} count={count + 1} />
            </View>
            <View style={{ height: 40, alignItems: 'flex-end', width: 370, marginBottom: 20 }} >
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => nextStep()}
                >
                    <Text style={styles.textStyle}>{btnName}</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 80,
        alignSelf: 'flex-end',
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

});
