import * as React from 'react';
import { View, Text, Image,Button,TextInput, StyleSheet,Alert } from 'react-native';
import axios from'react-native-axios';
import { useEffect, useState } from 'react'
import { Table, Row, Rows } from 'react-native-table-component';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function EditDonationType({ route }) {
    const navigation = useNavigation();
    const [rid, setid] = useState(''); 
    const [name, setname] = useState('');
    const [checked, setChecked] = useState(''); 
    const {id} = route.params; 
  
    useEffect(() => {
        axios.get(`http://192.168.1.14:8090/api/v1/create_donation/` + id).then((res) => {
            setid(res.data.request_id)
            setname(res.data.name)
            setChecked(res.data.donation_type);
             console.log("test",res.data)
             })
        
           }, [])
         
           const updateData = () => {

            var data = {
                request_id: id,
                name: name,
                donation_type:checked,
          
            }
            axios({
                url: "http://192.168.1.14:8090/api/v1/create_donation/" + id,
                method: "Put",
                data: data
            }).then((res) => {
                // setList(response.data)
             
            })
    
            Alert.alert(
                "Done",
                "Successfully Updated!",
                [
                    { text: "OK", onPress: () => navigation.navigate("Selected person list") }
                ]
            );
    
        }


    return (
        <View style={{justifyContent: 'center',backgroundColor:'white'}}>

            <View>
            <Text style={{ fontSize:30,fontWeight: '400',textAlign:'center',padding:25,color:'#000000'}}>Edit Donation Type</Text>
            </View>
         <View>
         <Text style={{ fontSize:30,fontWeight: '400',textAlign:'center',padding:45,color:'#000000'}}>Name:{name}</Text>
         </View>
            <View style={{flexDirection:"row",paddingBottom:15,backgroundColor:'white',alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
            <Image style={{width: 180, height:180, }}source={require('../assets/y6.png')}  />
            </View>
     
            
            <View style={{flexDirection:"row",paddingTop:30,paddingBottom:10,justifyContent: 'center'}}>
            <Text style={{ fontSize:20, fontWeight: '400',width:120}}>Equipments</Text>
            <RadioButton
               value="Equipments"
               status={ checked === 'Equipments' ? 'checked' : 'unchecked' }
               onPress={() => setChecked('Equipments')}
             />
           </View>

      <View style={{flexDirection:"row",justifyContent: 'center',paddingTop:20}}>
      <Text style={{flexDirection:"row", fontSize:20, fontWeight: '400',width:120,}}>Money</Text>
      <RadioButton
        value="Money"
        status={ checked === 'Money' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Money')}
       />
      </View>
          
      <View style={{flexDirection:"row",justifyContent: 'center',paddingTop:30,}}>
      <Text style={{flexDirection:"row", fontSize:20, fontWeight: '400',width:120}}>Scholership</Text>
      <RadioButton
        value="Scholership"
        status={ checked === 'Scholership' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Scholership')}
       />
      </View>

      <View style={{paddingTop:20,width:200,textAlign:'center',alignSelf:'center',paddingBottom:40}}>
         <Button 
         title="Update"
          onPress={updateData}>
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