import * as React from 'react';
import { View, Text, Image,Button } from 'react-native';
import axios from'react-native-axios';
import { useEffect, useState } from 'react'
import { Table, Row, Rows } from 'react-native-table-component';

export default function RequestList({ navigation }) {

    const [items, setitems] = useState([]);

      

        useEffect(() => {
       axios.get("http://192.168.1.14:8090/api/v1/req/" ).then((res) => {
           
              setitems(res.data)
              console.log("test",res.data)
            })
          }, [])
        

    return (
        <View style={{justifyContent: 'center',backgroundColor:'white'}}>

            <View>
            <Text style={{ fontSize:30,fontWeight: '400',textAlign:'center',padding:25}}>Donation Request List</Text>
            </View>

            <View style={{flexDirection:"row",paddingBottom:15,backgroundColor:'white'}}>
            <Image style={{width: 110, height:100,marginLeft:55 }}source={require('../assets/y1.png')}  />
            <Image style={{width: 210, height:87,}}source={require('../assets/y2.png')}  />
            </View>
          
            <View style={{flexDirection:"row",paddingBottom:10,justifyContent:'center',alignItems:'center',backgroundColor:'#ECECEC'}}>
            <Text style={{ fontSize:20, fontWeight: '400',width:100,marginLeft:10}}>ID</Text>   
            <Text style={{ fontSize:20, fontWeight: '400',width:100}}>Name</Text>
            <Text style={{ fontSize:20, fontWeight: '400',width:100}}>Age</Text>
            <Text style={{ fontSize:20, fontWeight: '400',width:100}}>Phone</Text>
           
            </View>

            {items.map(item => (
            
                <View style={{flexDirection:"row",paddingBottom:40,paddingTop:20,alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:'#ECECEC'}} key={item._id}>
                 <Text style={{ fontSize:15, fontWeight: '400',width:100,marginLeft:25}}>{item.request_id}</Text>   
               <Text style={{ fontSize:15, fontWeight: '400',width:100,}}>{item.name}</Text> 
               <Text style={{ fontSize:15, fontWeight: '400',width:100}}>{item.age}</Text>
               <Text style={{ fontSize:15, fontWeight: '400',width:100}}>{item.phone}</Text>      
                </View>
            ))}



                <View style={{paddingTop:20,width:200,textAlign:'center',alignSelf:'center',paddingBottom:60}}>

                <Button
                title="Create Donation"
                onPress={() => navigation.navigate('CreateDonation')}
                
                    />

                </View>

        </View>
    );
}
