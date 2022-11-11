import { View, Text, Image, StyleSheet, Alert, Button } from 'react-native'
import React from 'react'
import skillsImg from '../../asset/skills.jpg';
import { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IdentifiedSkills({ navigation }) {

  ////////////////////////////////////////////////////
    // // To get the value from the TextInput
    // const [textInputValue, setTextInputValue] = useState('');
    // // To set the value on Text
    // const [getValue, setGetValue] = useState('');

    // AsyncStorage.setItem('any_key_here', textInputValue);

    // AsyncStorage.getItem('any_key_here').then(
    //   (value) =>
    //     // AsyncStorage returns a promise
    //     // Adding a callback to get the value
    //     setGetValue(value),
    //   // Setting the value in Text
    // );
  ////////////////////////////////////////////////////

  const [maths, setMaths] = useState(false);
  const [science, setScience] = useState(false);
  const [ict, setIct] = useState(false);
  const [arts, setArts] = useState(false);
  const [result, setResults] = useState([]);

  const click = () => {
    const skills = [];
    if (maths === true) {
      skills.push('maths');
    }  
    if (science === true) {
      skills.push('science');
    }  
    if (ict === true) {
      skills.push('ict');
    }  
    if (arts === true) {
      skills.push('arts')
    }

    AsyncStorage.setItem('SKILLS', skills.toString());

    // Alert.alert(
    //   "Your selected identified skills are : " + skills   
    // );

    navigation.navigate('Available Career Paths')
  }

  return (
    <View style={styles.all}>
      <Image style={styles.img} source={skillsImg} />

      <View style={styles.check}>
        <View style={styles.wrapper}>
          <CheckBox
            value={maths}
            onValueChange={setMaths}
          />
          <Text style={styles.text}>maths</Text>
        </View>

        <View style={styles.wrapper}>
          <CheckBox
            value={science}
            onValueChange={setScience}
          />
          <Text style={styles.text}>science</Text>
        </View>

        <View style={styles.wrapper}>
          <CheckBox
            value={ict}
            onValueChange={setIct}
          />
          <Text style={styles.text}>ict</Text>
        </View>

        <View style={styles.wrapper}>
          <CheckBox
            value={arts}
            onValueChange={setArts}
          />
          <Text style={styles.text}>arts</Text>
        </View>
      </View>

      <View style={styles.btn}>
        <Button
          title="    Submit    "
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
    height: "40%",
    position: 'absolute',
    top: 0
  },
  check: {
    paddingTop: 150,
    position: 'absolute',
    left: 40
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: 15,
  },
  text: {
    lineHeight: 30,
    marginLeft: 10,
    fontSize: 20
  },
  btn: {
    paddingTop: 450,
  }
});