import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, ToastAndroid } from "react-native";
import ServiceManagement from '../../services/skillDonorServices'
import { HStack } from "@react-native-material/core";

const UpdatePopupWindow = forwardRef((props, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [objID, setObjID] = React.useState(props.objID);
    const [meeting, setMeeting] = React.useState(props.meeting);
    const [note, setNote] = React.useState(props.note);
    const [references, setReferences] = React.useState(props.references);
    const [quizes, setQuizes] = React.useState(props.quizes);

    const [meetingError, setMeetingError] = useState('');
    const [noteError, setNoteError] = useState('');

    useImperativeHandle(ref, () => ({
        alertToggle() {
            setModalVisible(true);
        }
    }))


    const updateList = async () => {
        try {
            var data = {

                published_meeting_link: meeting,
                note: note,
                references: references,
                quizes: quizes

            }
            await ServiceManagement.updatecourseDetails(objID, data).then(res => {
                ToastAndroid.showWithGravityAndOffset(
                    `Selected details successfully updated!`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );

            });
            props.fetchData()
            props.isClicked(false)


        } catch (error) {
            ToastAndroid.show(error, ToastAndroid.SHORT);
        }
        setModalVisible(!modalVisible)
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
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Update Course Details</Text>
                        <Text style={styles.modalText}>Scheduled Online Meeting</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            style={styles.input}
                            onChangeText={setMeeting}
                            value={meeting}
                            placeholder="Title - 'http://xxxxx'"

                        />
                        {meetingError && (
                            <Text style={{ color: "red", marginTop: 5 }}>{meetingError}</Text>
                        )}
                        <Text style={styles.modalText}>Note</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.input}
                            onChangeText={setNote}
                            value={note}
                            placeholder="xxxxxxx"

                        />
                        {noteError && (
                            <Text style={{ color: "red", marginTop: 5 }}>{noteError}</Text>
                        )}
                        <Text style={styles.modalText}>References</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.input}
                            onChangeText={setReferences}
                            value={references}
                            placeholder="Title - 'http://xxxxx'"

                        />
                        <Text style={styles.modalText}>Quizes</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.input}
                            onChangeText={setQuizes}
                            value={quizes}
                            placeholder="Title - 'http://xxxxx'"
                            keyboardType="text"
                        />

                        <HStack m={4} spacing={55} >
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => { setModalVisible(!modalVisible); props.isClicked(false) }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    if (meeting.trim() === "") {
                                        setMeetingError("Scheduled meetings is a required field");
                                    }
                                    else {
                                        setMeetingError(null);
                                    }
                                    if (note.trim() === "") {
                                        setNoteError("Note about meeting is a required field");
                                    }
                                    else {
                                        setNoteError(null);
                                    }
                                    if (meeting.trim() !== "" && note.trim() !== "") {
                                        updateList();
                                    }

                                }}
                            >
                                <Text style={styles.textStyle}>Update</Text>
                            </Pressable>
                        </HStack>




                    </View>
                </View>
            </Modal>

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
        height: 70,
        margin: 10,
        width: 200,
        borderWidth: 1,
        padding: 10,
    },
});

export default UpdatePopupWindow;