import * as React from 'react';
import { View, Text, Image,Button,TextInput, StyleSheet,Alert } from 'react-native';
import axios from'react-native-axios';
import { useEffect, useState } from 'react'
import { Table, Row, Rows } from 'react-native-table-component';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function CreateDonation() {
    const navigation = useNavigation();
    const [id, setid] = useState(''); 
    const [name, setname] = useState('');
    const [checked, setChecked] =useState(''); 
      
    const insertData = () => {

        var data = {
            request_id: id,
            name: name,
            donation_type:checked,
          
        }
        axios({
            url: "http://10.0.2.2:8090/api/v1/create_donation/",
            method: "post",
            data: data
        }).then((response) => {
          (response.data)
        })


        Alert.alert(
            "Done",
            "Successfully Inserted!",
            [
                { text: "OK", onPress: () => navigation.navigate("Selected person list") }
            ]
        );

    }
    return (
        <View style={{justifyContent: 'center',backgroundColor:'white'}}>

            <View>
            <Text style={{ fontSize:30,fontWeight: '400',textAlign:'center',padding:45,color:'#000000'}}>Create Donation</Text>
            </View>

            <View style={{flexDirection:"row",paddingBottom:15,backgroundColor:'white',alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
            <Image style={{width: 175, height:175, }}source={require('../assets/y3.png')}  />
            </View>
        
            <View style={{alignItems: 'center', justifyContent: 'center',justifyContent:'space-between',paddingBottom:30,paddingTop:20 }}>
                <TextInput 
                    style={styles.input}
                    onChangeText={setid}
                    value={id}
                    placeholder="ID"
                    keyboardType="text"
                  ></TextInput>

                  <TextInput 
                    style={styles.input}
                    onChangeText={setname}
                    value={name}
                    placeholder="Name"
                    keyboardType="text"
                  ></TextInput>
            </View>
            
            <View style={{flexDirection:"row",paddingTop:10,paddingBottom:10,justifyContent: 'center'}}>
            <Text style={{ fontSize:20, fontWeight: '400',width:120}}>Equipments</Text>
            <RadioButton
               value="Equipments"
               status={ checked === 'Equipments' ? 'checked' : 'unchecked' }
               onPress={() => setChecked('Equipments')}
             />
           </View>

      <View style={{flexDirection:"row",justifyContent: 'center'}}>
      <Text style={{flexDirection:"row", fontSize:20, fontWeight: '400',width:120}}>Money</Text>
      <RadioButton
        value="Money"
        status={ checked === 'Money' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Money')}
       />
      </View>
          
      <View style={{flexDirection:"row",justifyContent: 'center',paddingTop:10,}}>
      <Text style={{flexDirection:"row", fontSize:20, fontWeight: '400',width:120}}>Scholership</Text>
      <RadioButton
        value="Scholership"
        status={ checked === 'Scholership' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Scholership')}
       />
      </View>

                <View style={{paddingTop:10,width:200,textAlign:'center',alignSelf:'center',paddingBottom:20}}>

                <Button
                title="Submit"
                
                onPress={insertData}>
                  </Button>
                </View>

        </View>
    );

  

}
const styles = StyleSheet.create({
    input: {
      height: 40,
      width:230,
      margin: 12,
      borderWidth: 2,
      padding: 10,
      borderRadius:30,
      backgroundColor:'#ECECEC',
    },

  });