import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'
import Modal  from 'react-native-modal';
import { useState } from 'react';
import { useEffect } from 'react';

export default function EditPopUp() {

    // const [isModalVisible, setIsModalVisible] = useState(false);

    // useEffect(() => {
    //     const checkForSubscription = setTimeout(() => {
    //         setIsModalVisible(() => !isModalVisible);
    //     }, 1500);
    //     return () => clearTimeout(checkForSubscription);
    // }, []);

    // const handleSignUp = () => {
    //     // sign up the user and close the modal
    //     setIsModalVisible(() => !isModalVisible);
    // };

    // const handleDecline = () => setIsModalVisible(() => !isModalVisible);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Tab One</Text>
                <View style={styles.separator} />
                <Button title="button" onPress={handleModal} />
                <Modal isVisible={isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <Text>Hello!</Text>
                        <Button title="Hide modal" onPress={handleModal} />
                    </View>
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
      },
      text: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
      },
      separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
      },
});