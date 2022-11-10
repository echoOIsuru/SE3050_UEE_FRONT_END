import * as React from 'react';
import { View, Text, Image,Button,Alert,ScrollView } from 'react-native';
import axios from'react-native-axios';
import { useEffect, useState } from 'react'
import { Table, Row, Rows } from 'react-native-table-component';
import { useNavigation, validatePathConfig } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/core";

export default function SelectedPersonList() {
    const [items, setitems] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();


    [id, setid] = useState('');
    
    useEffect(() => {
        if (isFocused) {
        axios.get("http://192.168.1.14:8090/api/v1/create_donation" ).then((res) => {
          
               setitems(res.data)
               console.log("test",res.data)
              
           
             })
            }
           }, [isFocused])

          

    return (
        <ScrollView>
        <View style={{backgroundColor:'white'}}>

            <View>
            <Text style={{ fontSize:30,fontWeight: '400',textAlign:'center',padding:25,color:'#000000'}}>Selected Person List</Text>
            </View>

            <View style={{flexDirection:"row",paddingBottom:15,backgroundColor:'white',paddingBottom:20}}>
            <Image style={{width: 110, height:100,marginLeft:55 }}source={require('../assets/y4.png')}  />
            <Image style={{width: 210, height:87,}}source={require('../assets/y2.png')}  />
            </View>
          
            <View style={{flexDirection:"row",paddingBottom:10,justifyContent:'center',alignItems:'center',backgroundColor:'#ECECEC'}}>
            <Text style={{ fontSize:20, fontWeight: '400',width:100,marginLeft:20}}>Name</Text>   
            <Text style={{ fontSize:20, fontWeight: '400',width:100}}>Type</Text>
            <Text style={{ fontSize:20, fontWeight: '400',width:100,marginLeft:20}}>Action</Text>

           
            </View>

            {items.map(item => (
            
                <View style={{flexDirection:"row",paddingBottom:20,alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:'white',paddingBottom:20,paddingTop:20}} key={item._id}>
                 <Text style={{ fontSize:15, fontWeight: '400',width:100,marginLeft:25}}>{item.name}</Text>   
               <Text style={{ fontSize:15, fontWeight: '400',width:100,}}>{item.donation_type}</Text> 

               <Button style={{}}
                title="edit"
                onPress={() => navigation.navigate('EditDonationType',{id:item._id})}
            />
            <View style={{margin:10}}>
               <Button color="#ff5c5c"
               marginLeft='25' 
                title="delete"
                onPress={() => navigation.navigate('DeleteDonation',{id:item._id})}
                />
            </View>
    
                </View>
            ))}

<View style={{alignItems: 'center', justifyContent: 'center',paddingTop:70}}>
<Image style={{width: 110, height:100,}}source={require('../assets/y5.png')}  />
</View>
             

        </View>
        </ScrollView>
    );
}
