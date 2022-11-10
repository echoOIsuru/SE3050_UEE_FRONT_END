import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, ToastAndroid } from "react-native";
import { CheckBox } from '@rneui/themed';
import { HStack } from "@react-native-material/core";
import { Icon } from '@rneui/themed';

const UpdatePopupWindow = forwardRef((props, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    const [checked, setChecked] = React.useState(props.isTitle);
    const [title, setTitle] = React.useState(props.title);


    useImperativeHandle(ref, () => ({
        alertToggle() {
            setModalVisible(true);
        }
    }))


    const updateList = () => {
        ToastAndroid.show("Your request is updated successfully!", ToastAndroid.SHORT);
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
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Update List</Text>
                        <Text style={styles.modalText}>Title</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setTitle}
                            value={title}
                            placeholder="List Title"

                        />
                        <Text style={styles.modalText}>Items</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumber}
                            value={'' + (props.numberOfItems)}
                            placeholder="No of Items"
                            keyboardType="numeric"
                        />
                        <CheckBox
                            right
                            checked={checked}
                            // checkedColor="#0F0"
                            // checkedTitle="Great!"
                            containerStyle={{ width: "40%" }}
                            onIconPress={() => setChecked(!checked)}
                            // onLongIconPress={() =>
                            //     console.log("onLongIconPress()")
                            // }
                            // onLongPress={() => console.log("onLongPress()")}
                            // onPress={() => console.log("onPress()")}
                            size={20}
                            textStyle={{}}
                            title="Items Title"
                            titleProps={{}}
                            uncheckedColor="#F00"
                        />

                        <HStack m={4} spacing={55} >
                            <Icon
                                name='plus'
                                type='font-awesome'
                                style={{ alignSelf: 'flex-end', marginLeft: 7, paddingBottom: 10 }}
                                onPress={() => { console.log('pressed') }} />
                            <Text style={{ alignSelf: 'flex-end', marginLeft: -40, paddingBottom: 14, color: 'black' }}>Add items</Text>
                        </HStack>

                        <HStack m={4} spacing={55} >
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => updateList(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Update</Text>
                            </Pressable>
                        </HStack>




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
});

export default UpdatePopupWindow;