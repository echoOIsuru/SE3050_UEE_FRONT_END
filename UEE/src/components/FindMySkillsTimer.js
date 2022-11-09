
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function FindMySkillsTimer() {
    const children = ({ remainingTime }) => {
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60
        return `${minutes}:${seconds}`
    }
    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -50 }}>
            <CountdownCircleTimer
                isPlaying
                duration={100}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[70, 50, 20, 0]}
            >
                {({ remainingTime }) => <Text style={{ fontSize: 40 }}>{children({ remainingTime })}</Text>}
            </CountdownCircleTimer>

        </View>
    )
}

