import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import { Stack, Button } from "@react-native-material/core";
import cardBackground from '../assest/card_background.png';

export default function CardView(props) {
    return (
        <View style={styles.container}>
            <Card style={{ borderRadius: 10 }}>
                <CardImage
                    source={{ uri: 'http://placehold.it/480x270' }}
                    title="Above all i am here"
                />
                <CardTitle
                    title={props.title}
                    subtitle={props.subtitle}
                />
                <CardAction
                    separator={false}
                    inColumn={false}
                    style={{ alignSelf: 'flex-end' }}
                >
                    <Button variant='text' title={props.btnTitle} onPress={props.onPress} />
                </CardAction>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        innerHeight: 100,
        padding: 20
    },
    container: {
        borderRadius: 200,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    }
});

