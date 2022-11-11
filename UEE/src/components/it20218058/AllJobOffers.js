import { View, Text, StyleSheet, Image, ScrollView, Button, Alert, TextInput } from 'react-native'
import React from 'react'
import bullet from '../../asset/bullet.png';
import { useState } from 'react';
import Modal from 'react-native-modal';
import service from '../../services/IT0218058/service';

export default function AllJobOffers({ navigation }) {

    const [name, setName] = useState();
    const [contact, setContact] = useState();
    const [profile, setProfile] = useState();
    const [jobName, setJobName] = useState();

    const jobs = [
        {
            id: "1",
            name: "Software Engineer-JAVA",
        },
        {
            id: "2",
            name: "Software Engineer-React",
        },
        {
            id: "3",
            name: "Software Engineer-PHP",
        },
        {
            id: "4",
            name: "Quality Assuarance",
        },
        {
            id: "5",
            name: "Web Developer",
        },
        {
            id: "6",
            name: "Software Engineer-Full Stack",
        }
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);


    const submit = () => {
        service.addRequest({ "name": name, "contact": contact, "profile": profile, "job": jobName })
            .then(res => {
                console.log(res.data);
            })
        Alert.alert("Insert Successful ! ");
        handleModal();
    }

    const jobNameSet = (name) => {
        setIsModalVisible(() => !isModalVisible);
        setJobName(name);
    }

    return (
        <View style={styles.all}>
            <View style={styles.scroll}>
                <ScrollView>
                    <View>
                        {jobs.map((job) => {
                            return (
                                <View key={job.id}>
                                    <Image style={styles.img1} source={bullet} />
                                    <Text style={styles.item}>{job.name}</Text>
                                    <Button
                                        style={styles.btn}
                                        color='#1B4F69'
                                        title="Request"
                                        onPress={() => jobNameSet(job.name)}
                                    />
                                    {/* insert popup */}
                                    <View>

                                        <Modal isVisible={isModalVisible}>
                                            <View style={styles.pop}>
                                                {/* <View style={styles.container1}> */}
                                                <Text style={styles.upTitle}>Make request for {jobName} {"\n"}</Text>

                                                <View style={styles.inputs}>
                                                    <Text style={styles.upText}>Name</Text>
                                                    <TextInput
                                                        placeholder='Christine'
                                                        onChangeText={newText => setName(newText)}
                                                    />
                                                    <Text style={styles.upText}>Contact</Text>
                                                    <TextInput
                                                        placeholder='077342122'
                                                        onChangeText={newText => setContact(newText)}
                                                    />
                                                    <Text style={styles.upText}>Enter your LinkedIn profile link here</Text>
                                                    <TextInput
                                                        placeholder='https://www.linkedin.com/in/john/'
                                                        onChangeText={newText => setProfile(newText)}
                                                    />
                                                </View>

                                                <View style={styles.upBtn}>
                                                    <View style={styles.cb}><Button color='#1B4F69' title=" Cancel " onPress={handleModal} /></View>
                                                    <View style={styles.sb}><Button color='#1B4F69' title=" Submit " onPress={submit} /></View>
                                                </View>
                                                {/* </View> */}
                                            </View>
                                        </Modal>

                                    </View>

                                    <View style={styles.lineStyle} />
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    all: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        padding: 20,
        fontSize: 15,
        marginTop: 5,
        paddingLeft: 70
    },
    scroll: {
        width: "100%",
        height: 520,
        top: 280,
        paddingLeft: 40,
        paddingRight: 40
    },
    lineStyle: {
        borderWidth: 0.2,
        borderColor: 'black',
        margin: 0,
    },
    img1: {
        width: 30,
        height: 30,
        top: 50,
        borderWidth: 2,
        borderRadius: 300,
        borderColor: 'grey'
    },
    lineStyle: {
        borderWidth: 0.2,
        borderColor: 'black',
        margin: 0,
    },
    container1: {

    },
    pop: {
        backgroundColor: 'white',
        height: 480,
        borderRadius: 30
    },
    upBtn: {
        flexDirection: 'row',
        marginTop: 50,
        marginLeft: 80
    },
    container1: {
        height: 200,
        width: 350,
        backgroundColor: 'white',
    },
    upTitle: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        padding: 30
    },
    inputs: {
        paddingLeft: 30
    },
    upText: {
        color: 'black',
        paddingTop: 10,
        fontWeight: 'bold',
    },
    cb: {
        paddingRight: 20
    },
    sb: {
        paddingLeft: 20
    },
});