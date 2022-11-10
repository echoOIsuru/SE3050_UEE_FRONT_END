import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput, AsyncStorage, Alert, ScrollView, ToastAndroid } from 'react-native';
import ServiceManagement from '../../services/skillDonorServices'
import { useIsFocused } from "@react-navigation/native";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

export default function UpdateModule({ navigation }) {

  const [mName, setMName] = useState('');
  const [mCode, setMCode] = useState('');
  const [lectureTime, setLectureTime] = useState(0);
  const [studyTime, setStudyTime] = useState(0);
  const [practicleTime, setPracticleTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [mNameError, setMNameError] = useState('');
  const [mCodeError, setMCodeError] = useState('');
  const [lecTimeError, setlLecTimeError] = useState('');
  const [pTimeError, setPTimeError] = useState('');
  const [sTimeError, setSTimeError] = useState('');

  const fetchData = useCallback(async () => {

    try {
      const value = await AsyncStorage.getItem('selected Module ID');
      await ServiceManagement.getModuleByObjId(value).then(res => {
        setMCode(res.data.module_code),
          setMName(res.data.module_name),
          setTotalTime(parseInt(res.data.study_time) + parseInt(res.data.lectures_time) + parseInt(res.data.practicle_sessions_time))
        setLectureTime(res.data.lectures_time),
          setStudyTime(res.data.study_time),
          setPracticleTime(res.data.practicle_sessions_time)
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

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const submitDetails = async () => {

    const value = await AsyncStorage.getItem('selected Module ID');

    try {
      var data = {
        module_name: mName,
        lectures_time: parseInt(lectureTime),
        study_time: parseInt(studyTime),
        practicle_sessions_time: parseInt(practicleTime),

      }
      await ServiceManagement.updateModule(value, data).then(res => {
        ToastAndroid.showWithGravityAndOffset(
          `Selected ${mName} module successfully updated!`,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        navigation.navigate("Modules")

      });

    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }

  }

  const onChangeLecture = (value) => {
    if (!value) {
      setLectureTime(0);
      setTotalTime(0 + parseInt(practicleTime) + parseInt(studyTime));
    }
    else {
      const result = value.replace(/[^0-9]/, '')
      setLectureTime(result);
      setTotalTime(parseInt(result) + parseInt(practicleTime) + parseInt(studyTime));
    }
  }

  const onChangeStudy = (value) => {
    if (!value) {
      setStudyTime(0);
      setTotalTime(0 + parseInt(practicleTime) + parseInt(lectureTime));
    }
    else {
      const result = value.replace(/[^0-9]/, '')
      setStudyTime(result);
      setTotalTime(parseInt(result) + parseInt(practicleTime) + parseInt(lectureTime));
    }
  }

  const onChangePracticle = (value) => {
    if (!value) {
      setPracticleTime(0);
      setTotalTime(0 + parseInt(lectureTime) + parseInt(studyTime));
    }
    else {
      const result = value.replace(/[^0-9]/, '')
      setPracticleTime(result);
      setTotalTime(parseInt(lectureTime) + parseInt(value) + parseInt(studyTime));
    }
  }


  return (
    <ScrollView>
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.headerTitle}>
            <Text style={{ fontWeight: '700', fontSize: 25, color: 'black', alignSelf: 'center' }}>Module Information</Text>
          </View>
          <View style={styles.boxesContainer}>
            <View style={styles.containerBox}>
              <Text style={{ marginBottom: 5, color: 'black', fontSize: 16 }}>Module Code</Text>
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                style={{
                  height: 40,
                  color: 'grey',
                  fontWeight: '600',
                  borderWidth: 1,
                  padding: 10,
                  backgroundColor: '#FDFCFC'
                }}
                onChangeText={setMCode}
                value={mCode}
                keyboardType="text"
              />
              {mCodeError && (
                <Text style={{ color: "red", marginTop: 5 }}>{mCodeError}</Text>
              )}
              <Text style={{ marginTop: 25, marginBottom: 5, color: 'black', fontSize: 16 }}>Module Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setMName}
                value={mName}
                keyboardType="text"
              />
              {mNameError && (
                <Text style={{ color: "red", marginTop: 5 }}>{mNameError}</Text>
              )}
            </View>
          </View>

          <View style={styles.headerTitle}>
            <Text style={{ fontWeight: '700', fontSize: 25, color: 'black', alignSelf: 'center' }}>Module Overview - Time(hrs)</Text>
          </View>
          <View style={styles.boxesContainer}>
            <View style={styles.containerBox}>
              <View style={{ marginLeft: 'auto' }}>
                <Text style={{ marginBottom: 5, color: 'black', fontSize: 19, fontWeight: '650' }}>Total - {totalTime} hr </Text>
              </View>
              <Text style={{ marginBottom: 5, color: 'black', fontSize: 16 }}>Lectures and Tutorials</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => onChangeLecture(text)}
                value={lectureTime === 0 ? '' : lectureTime}
                defaultValue={`${lectureTime}`}
                keyboardType="numeric"
              />
              {lecTimeError && (
                <Text style={{ color: "red", marginTop: 5 }}>{lecTimeError}</Text>
              )}

              <Text style={{ marginTop: 25, marginBottom: 5, color: 'black', fontSize: 16 }}>Self-Study</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => onChangeStudy(text)}
                value={studyTime === 0 ? '' : studyTime}
                defaultValue={`${studyTime}`}
                keyboardType="numeric"
              />
              {sTimeError && (
                <Text style={{ color: "red", marginTop: 5 }}>{sTimeError}</Text>
              )}
              <Text style={{ marginTop: 25, marginBottom: 5, color: 'black', fontSize: 16 }}>Practicle Sessions</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => onChangePracticle(text)}
                value={practicleTime === 0 ? '' : practicleTime}
                defaultValue={`${practicleTime}`}
                keyboardType="numeric"
              />
              {pTimeError && (
                <Text style={{ color: "red", marginTop: 5 }}>{pTimeError}</Text>
              )}
            </View>
          </View>

          <View style={{ marginTop: 'auto', marginBottom: 10 }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              if (mName.trim() === "") {
                setMNameError("Module Name is a required field");
              }
              else {
                setMNameError(null);
              }
              if (mCode.trim() === "") {
                setMCodeError("Module Code is a required field");
              }
              else {
                setMCodeError(null);
              }
              if (lectureTime == 0) {
                setlLecTimeError("Lecture Time is a required field");
              }
              else {
                setlLecTimeError(null);
              }
              if (practicleTime == 0) {
                setPTimeError("Practicle Time is a required field");
              }
              else {
                setPTimeError(null);
              }
              if (studyTime == 0) {
                setSTimeError("Study Time is a required field");
              }
              else {
                setSTimeError(null);
              }
              if (studyTime != 0 && practicleTime != 0 && lectureTime != 0 && mCode.trim() !== "" && mName.trim() !== "") {
                submitDetails();
              }
            }}>
              <Text style={styles.text}>Submit </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FDFCFC',
    flex: 1
  },
  headerTitle: {
    width: ScreenWidth,
    height: ScreenHeight / 15,
    backgroundColor: '#AEACAC',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FDFCFC'
  },
  button: {
    width: '70%',
    height: 40,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#2E6578',
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5
  },
  container: {
    flex: 1,
    marginTop: 20
  },
  boxesContainer: {
    backgroundColor: '#D9D9D9'
  },
  containerBox: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30
  },
  containerStyle: {
    flex: 1,
  },

  scrollViewStyle: {
    flex: 1,

    padding: 15,

    justifyContent: 'center',
  },

  headingStyle: {
    fontSize: 30,

    textAlign: 'center',

    marginBottom: 40,
  },
});