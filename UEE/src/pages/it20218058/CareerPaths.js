import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native'
import React from 'react'
import jobImg from '../../asset/job.jpg';
import bullet from '../../asset/bullet.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import service from '../../services/IT0218058/service'
import { useEffect } from 'react';

export default function CareerPaths({ navigation }) {

  const [getValue, setGetValue] = useState([]);
  const [data, setData] = useState();

  let arr = [];
  let newArr = [];

  useEffect(() => {

    AsyncStorage.getItem('SKILLS').then(
      (value) => {
        arr = value.split(",");
  
        arr.forEach(element => {

          service.retrieveCareerPaths({"skill": element})
          .then(res => {
            newArr.push(res.data);
            console.log(res.data[0].career_paths);
              setData(res.data[0].career_paths)
          })

        });
  
      }
    );

}, [])


  
  const persons = [
    {
      id: "1",
      name: "Earnest Green",
    },
    {
      id: "2",
      name: "Winston Orn",
    },
    {
      id: "3",
      name: "Carlton Collins",
    },
    {
      id: "4",
      name: "Malcolm Labadie",
    },
    {
      id: "5",
      name: "Michelle Dare",
    },
    {
      id: "6",
      name: "Carlton Zieme",
    },
    {
      id: "7",
      name: "Jessie Dickinson",
    },
    {
      id: "8",
      name: "Julian Gulgowski",
    },
    {
      id: "9",
      name: "Ellen Veum",
    },
    {
      id: "10",
      name: "Lorena Rice",
    }
  ];

  const click = () => {
    navigation.navigate('Offers')
  }

  return (
    <View style={styles.all}>
      <Image style={styles.img} source={jobImg} />
      <View style={styles.scroll}>
        <ScrollView>
          <View>
            {data?.map((d) => {
              return (
                <View>
                  <Image style={styles.img1} source={bullet} />
                  <Text style={styles.item}>{d}</Text>
                  <View style={styles.lineStyle} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.btn}>
        <Button
          title="View Offers"
          color='#1B4F69'
          onPress={click}
        />
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
    width: "100%",
    height: "36%",
    position: 'absolute',
    top: 0
  },
  btn: {
    paddingTop: 200,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
    paddingLeft:70
  },
  scroll: {
    width: "100%",
    height: 280,
    top: 160,
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
  row: {
    flexDirection: 'row'
  }
});