import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, ToastAndroid } from "react-native";
import { CheckBox } from '@rneui/themed';
import { HStack } from "@react-native-material/core";
import { Icon } from '@rneui/themed';
import services from "../services/services";

const UpdateFavoritePopups = forwardRef((props, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = React.useState(props.item.title);
    const [description, setDescrition] = React.useState(props.item.description);

    useImperativeHandle(ref, () => ({
        alertToggle() {
            setModalVisible(true);
        },
    }))


    const updateList = () => {
        services.updateFavoriteCourse({ title: title, description: description }, props.item._id).then(res => {
            console.log(res.data)
            setModalVisible(!modalVisible)
            ToastAndroid.show("Your request is updated successfully!", ToastAndroid.SHORT);
            props.setCallParent(!props.callParent);
        }).catch((e) => {
            ToastAndroid.show("Please try again later!", ToastAndroid.SHORT);
        })


    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Update Course</Text>
                        <Text style={styles.modalText}>Title</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setTitle}
                            value={title}
                            placeholder="Title"

                        />
                        <Text style={styles.modalText}>Description</Text>
                        <TextInput
                            style={styles.input2}
                            onChangeText={setDescrition}
                            value={description}
                            placeholder="Description"
                        />

                        <HStack m={4} spacing={55} >
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => updateList()}
                            >
                                <Text style={styles.textStyle}>Update</Text>
                            </Pressable>
                        </HStack>
                        <Pressable
                            style={[styles.button, styles.buttonPlay, { alignSelf: 'center', marginTop: 20 }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Play</Text>
                        </Pressable>



                    </View>
                </View>
            </Modal>
            {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable> */}

        </View>
    )
})


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 80
    },
    buttonPlay: {
        backgroundColor: "green",
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
    modalText: {
        marginTop: 13,
        marginBottom: -5,
        marginLeft: 10,
        textAlign: "center"
    },
    input: {
        height: 40,
        margin: 10,
        width: 200,
        borderWidth: 1,
        padding: 10,
    },
    input2: {
        height: 60,
        margin: 10,
        width: 200,
        borderWidth: 1,
        padding: 10,
    },
});

export default UpdateFavoritePopups;
