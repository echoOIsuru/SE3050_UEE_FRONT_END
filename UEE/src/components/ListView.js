import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, DevSettings } from 'react-native';
import { Icon } from '@rneui/themed';
import { HStack, Button } from "@react-native-material/core";
import { VStack, Box, Divider } from "@react-native-material/core";
import services from '../services/services';

export default function ListView(props) {
    const [data, setData] = useState([]);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        services.viewCourses().then(res => {
            setData(res.data)
        }).catch(e => {
            console.log(e)
        })

    }, [clicked])


    const onClickHeart = (item, key) => {
        // let list = data;
        // list[key].favorite = !list[key].favorite;
        // console.log(list[key].favorite);
        //setData(list);

        item.favorite = !item.favorite;

        services.addToFavorite(item, item._id).then(res => {
            setClicked(!clicked)
        }).catch(e => {
            console.log(e);
        })


        //setClicked(!clicked);
    }

    return (
        <View style={{ flex: 1, alignSelf: 'center', backgroundColor: "#DCDCDC", borderRadius: 20, width: 380, marginTop: 20, marginBottom: 20 }}>
            <View style={{ alignSelf: 'flex-start', padding: 20 }}>
                <Text style={{ fontSize: 24, color: 'black' }}>Recommended</Text>
                <Text style={{ fontSize: 15 }}>This section contains videos and lessons.</Text>
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView
                    style={{ backgroundColor: '#F1F1F1' }}>
                    {
                        data.map((item, key) => (
                            <VStack m={4} spacing={22} style={{ backgroundColor: "#E3F3F2" }} key={key}>
                                <Box h={20}>
                                    <HStack m={4}>
                                        <Text style={{ fontSize: 17, width: 290, color: 'black' }}>{item.title}</Text>
                                        <View style={{ marginTop: -6 }} >
                                            <Icon
                                                raised
                                                name={item.favorite ? 'heart' : 'heart-o'}
                                                type='font-awesome'
                                                color='#f50'
                                                style={{ alignSelf: 'flex-end' }}
                                                onPress={() => onClickHeart(item, key)} />
                                        </View>
                                    </HStack>
                                </Box>
                                <Box h={20}>
                                    <Text style={{ fontSize: 12, paddingLeft: 4 }}>{item.description}</Text>
                                </Box>
                            </VStack>
                        ))
                    }



                </ScrollView>

            </View>
            <HStack m={4} spacing={110} >
                <Button color='black' variant='text' title={'View more'} onPress={props.onPressViewMore} style={{ alignSelf: 'flex-end' }} />
                <Button variant='text' title={'View Favorite'} onPress={props.onPressFavoriteView} style={{ alignSelf: 'flex-end' }} />
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