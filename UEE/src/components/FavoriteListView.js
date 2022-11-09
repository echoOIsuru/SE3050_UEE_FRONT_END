import React, { useEffect, useState, useRef, createRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, ToastAndroid } from 'react-native';
import { Icon } from '@rneui/themed';
import { HStack, Button } from "@react-native-material/core";
import { VStack, Box, Divider, Avatar } from "@react-native-material/core";
import UpdatePopupWindow from './UpdatePopupWindow';
import UpdateFavoritePopups from './UpdateFavoritePopups';
import services from '../services/services';


export default function ListView(props) {
    const [data, setData] = useState([

    ]);

    const lineRefs = React.useRef([]);
    lineRefs.current = data.map((_, i) => lineRefs.current[i] ?? createRef());

    const [modalVisible, setModalVisible] = useState(false);
    const buttonRef = useRef(null);
    const [buttonRefCourse, setButtonRefCourse] = useState(useRef([]));

    const [title, setTitle] = useState("My List");
    const [numberOfItems, setNumberOfItems] = useState(8);
    const [callParent, setCallParent] = useState(false);

    useEffect(() => {
        services.viewFavoriteCourses().then(res => {
            setData(res.data);

        }).catch(e => {
            console.log(e)
        })

        // setData([{
        //     title: "Graphic Design",
        //     description: "Conducted by Chathura Bandara"
        // },
        // {
        //     title: "Combined Mathematics",
        //     description: "Conducted by Sadhun Bandara"
        // },
        // {
        //     title: "Fundamentals of Programming",
        //     description: "Conducted by Chathura Ranathunga"
        // },
        // {
        //     title: "Data Structures for Beginners",
        //     description: "Conducted by Yash Sandeep"
        // },
        // {
        //     title: "Creative Arts",
        //     description: "Conducted by Sandali Randima"
        // },
        // {
        //     title: "Graphic Design",
        //     description: "Conducted by Chathura Bandara"
        // },
        // {
        //     title: "Combined Mathematics",
        //     description: "Conducted by Sadhun Bandara"
        // },
        // {
        //     title: "Fundamentals of Programming",
        //     description: "Conducted by Chathura Ranathunga"
        // },
        // {
        //     title: "Data Structures for Beginners",
        //     description: "Conducted by Yash Sandeep"
        // },
        // {
        //     title: "Creative Arts",
        //     description: "Conducted by Sandali Randima"
        // },
        // ])
    }, [modalVisible, callParent])


    const deleteConfirmation = (item) =>
        Alert.alert(
            "Confirmation",
            `Are you sure to delete ${item.title}`,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        services.deletedFavoriteCourse(item._id).then(res => {
                            console.log(res)
                            ToastAndroid.show("Your request is deleted successfully !", ToastAndroid.SHORT);
                            setCallParent(!callParent)
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                }
            ]
        );

    const showPopup = () => {
        let show = false;
        for (i = 0; i <= 1; i++) {
            setModalVisible(show)
            show = true;
        }

    }

    return (
        <View style={{ flex: 1, alignSelf: 'center', backgroundColor: "#DCDCDC", borderRadius: 20, width: 380, marginTop: 20, marginBottom: 20 }}>
            <View style={{ alignSelf: 'flex-start', padding: 20 }}>
                <HStack m={-10} spacing={150} >
                    <Text style={{ fontSize: 24, color: 'black', marginTop: 15 }}>{title}</Text>
                    <>
                        <Icon
                            raised
                            name='plus'
                            type='font-awesome'
                            color='#f50'
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => props.navigation.navigate('Resource Library')} />
                        <Icon
                            raised
                            name='edit'
                            type='font-awesome'
                            color='#e10'
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => { buttonRef.current.alertToggle() }} />
                        <UpdatePopupWindow ref={buttonRef} title={title} numberOfItems={numberOfItems} isTitle={title ? true : false} />

                    </>
                </HStack>
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView
                    style={{ backgroundColor: '#F1F1F1' }}>
                    {
                        data.length != 0 && data.map((item, key) => (
                            <VStack m={4} spacing={22} style={{ backgroundColor: "#E3F3F2" }} key={key}>
                                <Box h={60}>
                                    <HStack m={4}>
                                        <Avatar label={item.title} autoColor />
                                        <Text style={{ fontSize: 17, width: 250, color: 'black', alignSelf: 'center', paddingLeft: 10 }} onPress={() => { lineRefs.current[key].current.alertToggle() }}>{item.title}</Text>
                                        <UpdateFavoritePopups ref={lineRefs.current[key]} item={item} setCallParent={setCallParent} callParent={callParent} />
                                        <View style={{ marginTop: -6 }}>
                                            <Icon
                                                raised
                                                name='trash'
                                                type='font-awesome'
                                                style={{ alignSelf: 'flex-end' }}
                                                onPress={() => deleteConfirmation(item)} />
                                        </View>

                                    </HStack>
                                </Box>
                            </VStack>
                        ))
                    }

                </ScrollView>

            </View>
            <HStack m={12} spacing={110} >

            </HStack>

        </View>


    )
}

const styles = StyleSheet.create({
    logo: {
        width: 380,
        height: 300,
    },
});