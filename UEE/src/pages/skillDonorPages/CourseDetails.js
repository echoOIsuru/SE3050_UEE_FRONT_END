import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Dimensions, AsyncStorage, Image, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView, ToastAndroid, Linking } from 'react-native';
import PlusCircle from '../../../assets/plus.png';
import Teaching from '../../../assets/group.jpg';
import Edit from '../../../assets/edit.png';
import Delete from '../../../assets/delete.png';
import { useIsFocused } from "@react-navigation/native";
import ServiceManagement from '../../services/skillDonorServices'
import CoursesUpdatePopup from '../../pages/skillDonorPages/UpdatePopup'
import CoursesInsertPopup from '../../pages/skillDonorPages/insertPopup'

const ScreenWidthSize = Dimensions.get("window").width;
const ScreenHeightSize = Dimensions.get("window").height;

export default function Modules({ navigation }) {

    let today = new Date(),
        date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    const buttonRef = useRef(null);
    const buttonInsertRef = useRef(null);

    const [objID, setObjID] = useState('');
    const [meeting, setMeeting] = useState('');
    const [note, setNote] = useState('');
    const [references, setReferences] = useState('');
    const [quizes, setQuizes] = useState('');

    const [isClicked, setIsClicked] = useState(false);

    const [selectedModule, setSelectedModule] = useState('');
    const [filteredCourseDetails, setFilteredCourseDetails] = useState([]);
    const ScreenWidth = Dimensions.get("window").width;
    const ScreenHeight = Dimensions.get("window").height;
    const [totalMeetings, setTotalMeetings] = useState(0);

    const fetchData = useCallback(async () => {
        try {
            const value = await AsyncStorage.getItem('selectedSubject');
            const value2 = await AsyncStorage.getItem('selectedModule');
            setSelectedModule(value2);

            let data = {
                instructor_id: 'IID001',
                subject_id: value,
                module_code: value2
            }
            await ServiceManagement.getcourseDetailsByIds(data).then(res => {
                setFilteredCourseDetails(res.data);
                setTotalMeetings(res.data.length)
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

    const deleteCourseDetails = (selectedID) => {

        Alert.alert(
            `Confirmation`,
            `Are you sure, you want to delete selected course deatils?`,
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        ServiceManagement.deletecourseDetails(selectedID).then(res => {
                            ToastAndroid.showWithGravityAndOffset(
                                `Selected deatils successfully deleted!`,
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
                    <TouchableOpacity onPress={async () => {

                        setNote(item.note)
                        setMeeting(item.published_meeting_link)
                        setReferences(item.references)
                        setObjID(item._id)
                        setQuizes(item.quizes)
                        setIsClicked(true)

                        buttonRef.current.alertToggle();
                    }}>
                        <Image
                            source={Edit}
                            style={{ width: 30, height: 30, marginRight: 2 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        deleteCourseDetails(item._id)
                    }}>
                        <Image
                            source={Delete}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.title}>{item.published_meeting_link.split(" - ")[0]}</Text>
                    <View style={styles.cardContainer}>
                        <View style={{ flexDirection: 'row', marginBottom: 10, marginRight: 30 }}>
                            <Text>Meeing Link - </Text>
                            <Text style={{ color: 'blue' }}
                                onPress={() => Linking.openURL(item.published_meeting_link.split(" - ")[1])}>
                                {item.published_meeting_link.split(" - ")[1]}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10, marginRight: 30 }}>
                            <Text>Note - </Text>
                            <Text style={{ color: 'black' }}>
                                {item.note}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20, marginRight: 30, }}>
                            <Text>References - </Text>
                            <Text style={{ color: 'blue' }}
                                onPress={() => Linking.openURL(item.references)}>
                                {item.references}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>

    );


    return (
        <View style={styles.background}>
            <View style={styles.headerPanel}>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                    <Image
                        source={Teaching}
                        style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, width: (ScreenWidth - 40) - 20, height: ScreenHeight / 3, borderRadius: 20 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 'auto' }}>
                    <View style={{ width: (ScreenHeightSize / 3) - 50 }}>
                        <Text style={{ fontSize: 32, marginRight: 35, color: 'white', alignSelf: 'center', fontWeight: '700' }}>{totalMeetings}</Text>
                        <Text style={{ fontSize: 20, color: 'white', marginLeft: 15 }}>Scheduled Meetings</Text>
                    </View>

                    <View style={{ width: (ScreenHeightSize / 3) - 50, marginRight: 10, marginBottom: 20 }}>
                        <Text style={{ fontSize: 28, marginRight: 45, color: 'white', alignSelf: 'center', fontWeight: '700', marginTop: 7 }}>{selectedModule}</Text>
                        <Text style={{ fontSize: 20, color: 'white', marginLeft: 10 }}>Selected Subject</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontWeight: '700', fontSize: 20, color: 'black' }}>Date</Text>
                    <Text style={{ fontSize: 19, marginLeft: 5, color: 'black', marginBottom: 30 }}>- {date}</Text>
                    <View style={{ marginLeft: 'auto' }}>
                        <TouchableOpacity onPress={() => {
                            buttonInsertRef.current.alertToggle();
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

                <FlatList
                    data={filteredCourseDetails}
                    renderItem={this.renderItems}
                    keyExtractor={item => item._id}
                    style={{ marginBottom: 20 }}
                />
                {isClicked &&
                    <CoursesUpdatePopup ref={buttonRef} objID={objID} meeting={meeting} note={note} references={references} quizes={quizes} isClicked={setIsClicked} fetchData={fetchData} />
                }
                <CoursesInsertPopup ref={buttonInsertRef} fetchData={fetchData} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#FDFCFC',
        flex: 1
    },
    headerPanel: {
        width: ScreenWidthSize,
        backgroundColor: '#6ac5fe',
        justifyContent: 'center'
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
        marginVertical: 5,
        padding: 10,
    },
    cardContainer: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
    },
    title: {
        fontSize: 19,
        marginTop: 10,
        color: "black",
        marginBottom: 10,
        fontFamily: 'Tahoma, sans-serif',
        fontWeight: '700',
        alignSelf: 'center'
    }
});
