import React, { Component } from "react";
import { View, Image, FlatList, StyleSheet, Text, Dimensions, TouchableOpacity, AsyncStorage } from "react-native";

import englishPng from '../../../assets/english.png';
import sciencePng from '../../../assets/science.png'
import mathsPng from '../../../assets/maths.png'
import ITPng from '../../../assets/IT.png'
import historyPng from '../../../assets/history.png'
import artPng from '../../../assets/art.png'

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const DATA = [
    {
        id: "1",
        title: "Science",
        bColor: "#FFE6CC",
        image: sciencePng
    },
    {
        id: "2",
        title: "Mathematics",
        bColor: "#D0EFF6",
        image: mathsPng
    },
    {
        id: "3",
        title: "ICT",
        bColor: "#D0EFF6",
        image: ITPng
    },
    {
        id: "4",
        title: "History",
        bColor: "#FFE6CC",
        image: historyPng
    },
    {
        id: "5",
        title: "Art",
        bColor: "#FFE6CC",
        image: artPng
    },
    {
        id: "6",
        title: "English",
        bColor: "#D0EFF6",
        image: englishPng
    }
];

export default class Subjects extends Component {
    renderItems = ({ item }) => (
        <TouchableOpacity onPress={() => {
            AsyncStorage.setItem(
                'selectedSubject',
                item.title
            )
            this.props.navigation.navigate('Modules')
        }}>
            <View style={{ backgroundColor: item.bColor, borderRadius: 5, marginHorizontal: 5, marginVertical: 5, height: (ScreenHeight - 100) / 3 - 10, padding: 10, width: (ScreenWidth - 40) / 2 - 10 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Image
                    source={item.image}
                    style={styles.image}
                />
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    <FlatList
                        data={DATA}
                        renderItem={this.renderItems}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        style={{marginBottom:10}}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#FDFCFC',
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    image: {
        width: 140,
        height: 140,
        justifyContent: "center",
        marginTop: 10,
        marginLeft: 10
    },
    title: {
        fontSize: 20,
        color: "black",
        alignSelf: "center",
        marginBottom: 10,
    }
});