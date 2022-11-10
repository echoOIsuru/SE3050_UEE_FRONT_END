import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Dimensions, AsyncStorage, Image, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView, ToastAndroid } from 'react-native';
import PlusCircle from '../../../assets/plus.png';
import Teaching from '../../../assets/teach.png';
import Edit from '../../../assets/edit.png';
import Delete from '../../../assets/delete.png';
import Arrow from '../../../assets/arrow.png';
import { useIsFocused } from "@react-navigation/native";
import ServiceManagement from '../../services/skillDonorServices'

const ScreenWidthSize = Dimensions.get("window").width;
const ScreenHeightSize = Dimensions.get("window").height;

export default function Modules({ navigation }) {

    const [selectedSubject, setSelectedSubject] = useState('');
    const [filteredModules, setFilteredModules] = useState([]);
    const ScreenWidth = Dimensions.get("window").width;
    const ScreenHeight = Dimensions.get("window").height;

    const fetchData = useCallback(async () => {
        try {
            const value = await AsyncStorage.getItem('selectedSubject');
            if (value !== null) {
                setSelectedSubject(value);
            }

            let data = {
                instructor_id: 'IID001',
                subject_id: value
            }
            await ServiceManagement.getModulesByIds(data).then(res => {
                setFilteredModules(res.data);
            });

        } catch (error) {
            // Error retrieving data
            if (error.response.status === 404) {

                Alert.alert(
                    'Alert',
                    error.response.data,
                    [
                        { text: "OK" }
                    ]
                );
            }
        }
    }, [])

    const isFocused = useIsFocused();

    useEffect(() => {

        // Call only when screen open or when back on screen 
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    const deleteModule = (selectedID, value) => {

        Alert.alert(
            `Confirmation`,
            `Are you sure, you want to delete ${value} module?`,
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        ServiceManagement.deleteModule(selectedID).then(res => {
                            ToastAndroid.showWithGravityAndOffset(
                                `Selected ${value} successfully deleted!`,
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50
                            );

                            fetchData();
                        });
                    }
                }
            ]
        );
    }

    renderItems = ({ item }) => (
        <ScrollView>
            <View style={styles.box}>
                <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
                    <TouchableOpacity onPress={() => {
                        AsyncStorage.setItem(
                            'selected Module ID',
                            item._id
                        )
                        navigation.navigate('Update Module')
                    }}>
                        <Image
                            source={Edit}
                            style={{ width: 30, height: 30, marginRight: 2 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        deleteModule(item._id, item.module_code)
                    }}>
                        <Image
                            source={Delete}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => {
                    AsyncStorage.setItem(
                        'selectedModule',
                        item.module_code
                    )
                    navigation.navigate('Course Details')
                }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginTop: 15, }}>
                        <Text style={styles.title}>{item.module_name} - {item.module_code}</Text>
                        <Image
                            source={Arrow}
                            style={{ width: 20, height: 20, marginTop: 2, marginLeft: 5 }}
                        />
                    </View>
                </TouchableOpacity>

            </View>
        </ScrollView >

    );


    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontWeight: '700', fontSize: 20, color: 'black' }}>Subject</Text>
                    <Text style={{ fontSize: 19, marginLeft: 5, color: 'black' }}>- {selectedSubject}</Text>
                    <View style={{ marginLeft: 'auto' }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Add Module')
                        }}>
                            <Image
                                source={PlusCircle}
                                style={{
                                    width: 35,
                                    height: 35,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Image
                    source={Teaching}
                    style={{ marginTop: 20, marginBottom: 20, width: (ScreenWidth - 40) - 20, height: ScreenHeight / 3, borderRadius: 20 }}
                />

                <FlatList
                    data={filteredModules}
                    renderItem={this.renderItems}
                    keyExtractor={item => item._id}
                    style={{ marginBottom: 20 }}
                />
            </View>
        </View>
    );
}

//E3E2E2 - grey
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#FDFCFC',
        flex: 1
    },
    container: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20
    },
    image: {
        width: 140,
        height: 140,
        justifyContent: "center",
        marginTop: 10,
        marginLeft: 10
    },
    box: {
        backgroundColor: '#EDEDED',
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        height: ScreenHeightSize / 7,
        padding: 10,
        width: ScreenWidthSize - 70
    },
    title: {
        fontSize: 19,
        color: "black",
        alignSelf: "center",
        marginBottom: 10,
        fontFamily: 'Tahoma, sans-serif'
    }
});
