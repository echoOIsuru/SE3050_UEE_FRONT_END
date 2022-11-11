import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity, Alert, TextInput } from 'react-native'
import React from 'react'
import offerImg from '../../asset/offer.jpeg';
import bullet from '../../asset/bullet.png';
import del from '../../asset/del.jpg';
import edt from '../../asset/edt.jpg';
import { useState } from 'react';
import Modal from 'react-native-modal';
import { useEffect } from 'react';
import service from '../../services/IT0218058/service';

export default function RequestedOffers() {

    const [data1, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [upData, setUpData] = useState([]);
    const [name1, setName] = useState('');
    const [contact1, setContact] = useState('');
    const [profile1, setProfile] = useState('');
    const [id1, setId] = useState('');

    useEffect(() => {
        service.retrieveRequests()
            .then(res => {
                setData(res.data);
            })
    }, []);

    const persons = [
        {
            id: "1",
            name: "Earnest Green",
            status: "accept",
        },
        {
            id: "2",
            name: "Winston Orn",
            status: "reject",
        },
        {
            id: "3",
            name: "Carlton Collins",
            status: "accept",
        },
        {
            id: "4",
            name: "Malcolm Labadie",
            status: "pending",
        },
        {
            id: "5",
            name: "Michelle Dare",
            status: "pending",
        },
        {
            id: "6",
            name: "Carlton Zieme",
            status: "reject",
        },
        {
            id: "7",
            name: "Jessie Dickinson",
            status: "accept",
        },
        {
            id: "8",
            name: "Julian Gulgowski",
            status: "pending",
        },
        {
            id: "9",
            name: "Ellen Veum",
            status: "reject",
        },
        {
            id: "10",
            name: "Lorena Rice",
            status: "accept",
        }
    ];

    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const handleModal1 = () => setIsModalVisible1(() => !isModalVisible1);

    const update = () => {
        service.updateRequest(id1, {
            "name":name1,
            "contact":contact1,
            "profile":profile1
        })
            .then(res => {
                console.log(res.data);
            })
        Alert.alert("Edit Successful ! ");
        handleModal();
    }

    const yes = (id) => {
        service.deleteRequest(id)
            .then(res => {
                console.log(res.data);
            })
        Alert.alert("Delete Successful ! ");
        handleModal1();
    }

    const idSet = (id) => {
        setIsModalVisible(() => !isModalVisible);
        service.retrieveRequestData(id)
            .then(res => {
                console.log(res.data);
                setUpData(res.data);
                setName(res.data[0].name);
                setContact(res.data[0].contact);
                setProfile(res.data[0].profile);
                setId(res.data[0]._id);
                // console.log(res.data[0].name)

            })
    }

    const acc = () => {
        Alert.alert("This request is 'ACCEPTED' ! ")
    }

    const rej = () => {
        Alert.alert("This request is 'REJECTED' ! ")
    }

    const acceptReject = (status, id, name1, contact1, profile1) => {

        if (status == "pending") {
            // let v = name1;
            // console.log(v);
            return <View style={styles.ed}>
                <TouchableOpacity onPress={() => idSet(id)}>
                    <Image style={styles.img2} source={edt} />

                    {/* edit popup */}
                    <View>

                        <Modal isVisible={isModalVisible}>
                            <View style={styles.pop}>
                                {/* <View> */}
                                    <Text style={styles.upTitle}>Update 'pending' request{"\n"}</Text>

                                    <View style={styles.inputs}>
                                        <Text style={styles.upText}>Name</Text>
                                        <TextInput
                                            onChangeText={newText => setName(newText)}
                                            value={name1}
                                        />
                                        <Text style={styles.upText}>Contact</Text>
                                        <TextInput
                                            onChangeText={newText => setContact(newText)}
                                            value={contact1}
                                        />
                                        <Text style={styles.upText}>Enter your LinkedIn profile link here</Text>
                                        <TextInput
                                            onChangeText={newText => setProfile(newText)}
                                            value={profile1}
                                        />
                                    </View>

                                    <View style={styles.upBtn}>
                                    <View style={styles.cb}><Button color='#1B4F69' title=" Cancel " onPress={handleModal} /></View>
                                    <View style={styles.sb}><Button color='#1B4F69' title=" Update " onPress={() => update()} /></View>
                                    </View>
                                {/* </View> */}
                            </View>
                        </Modal>

                    </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={handleModal1}>
                    <Image style={styles.img2} source={del} />

                    {/* delete popup */}
                    <View>

                        <Modal isVisible={isModalVisible1}>
                            <View style={styles.container1}>
                                <Text style={styles.upTitle}>Confirmation !{"\n"}</Text>
                                <View>
                                    <Text style={styles.msg}>Are you sure to delete this 'pending' request ?{"\n"}</Text>
                                </View>
                                <View style={styles.upBtn}>
                                <View style={styles.cb}><Button color='#1B4F69' title="      No      " onPress={handleModal1} /></View>
                                <View style={styles.sb}><Button color='#1B4F69' title="     Yes     " onPress={() => yes(id)} /></View>
                                </View>
                            </View>
                        </Modal>

                    </View>
                </TouchableOpacity>
            </View>
        } else if (status == "accepted") {
            return <View style={styles.btn1}>
            <Button
                style={styles.btn1}
                color='#7BCCB5'
                title={status}
                onPress={acc}
            />
            </View>

        } else {
            return <View style={styles.btn2}>
            <Button
            style={styles.btn2}
            color='#D58A94'
            title={status}
            onPress={rej}
        />
            </View>

        }
    }

    return (
        <View style={styles.all}>
            <Image style={styles.img} source={offerImg} />
            <View style={styles.scroll}>
                <ScrollView>
                    <View>
                        {data1.map((d) => {
                            return (
                                <View key={d._id}>
                                    <Image style={styles.img1} source={bullet} />
                                    <Text style={styles.item}>{d.job}</Text>
                                    {acceptReject(d.status, d._id, name1, contact1, profile1)}

                                    {/* <Button
                                        style={styles.btn}
                                        title={person.status}
                                        onPress={click}
                                    /> */}
                                    {/* <View style={styles.lineStyle} /> */}
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
    img: {
        width: 390,
        height: 240,
        top: 245
    },
    item: {
        padding: 20,
        fontSize: 14,
        marginTop: 5,
        marginLeft: -30,
        paddingLeft: 70
    },
    scroll: {
        width: "100%",
        height: 250,
        top: 280,
        paddingLeft: 30,
        paddingRight: 30
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
    img2: {
        width: 25,
        height: 25,
        marginHorizontal: 10
    },
    ed: {
        flexDirection: 'row',
        marginTop: -40,
        marginLeft: 250
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
        height: 250,
        width: 350,
        backgroundColor: 'white',
        borderRadius: 30
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
    btn1: {
        width: 90,
        marginTop: -50,
        marginLeft: 240
    },
    btn2: {
        width: 90,
        marginTop: -50,
        marginLeft: 240    
    },
    msg: {
        paddingLeft: 30
    }
});