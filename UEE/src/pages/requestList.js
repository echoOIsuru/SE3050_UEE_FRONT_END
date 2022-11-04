import * as React from 'react';
import { View, Text, Image,Button } from 'react-native';
import axios from'react-native-axios';
import { useEffect, useState } from 'react'
import { Table, Row, Rows } from 'react-native-table-component';

export default function RequestList({ navigation }) {

    const [items, setitems] = useState([]);

      

        useEffect(() => {
       axios.get("http://192.168.1.11:8090/api/v1/req/" ).then((res) => {
           
              setitems(res.data)
              console.log("test",res.data)
            })
          }, [])
        

    return (
        <View style={{justifyContent: 'center',}}>

            <View>
            <Text style={{ fontSize:30,fontWeight: '400',textAlign:'center',padding:25}}>Donation Request List</Text>
            </View>

            <View style={{flexDirection:"row",paddingBottom:15}}>
            <Image style={{width: 110, height:100,marginLeft:55 }}source={require('../assets/y1.png')}  />
            <Image style={{width: 210, height:87,}}source={require('../assets/y2.png')}  />
            </View>
          
            <View style={{flexDirection:"row",paddingBottom:10}}>
            <Text style={{ fontSize:20, fontWeight: '400',marginLeft:38}}>ID</Text>   
            <Text style={{ fontSize:20, fontWeight: '400',marginLeft:55}}>Name</Text>
            <Text style={{ fontSize:20, fontWeight: '400',marginLeft:55}}>Age</Text>
            <Text style={{ fontSize:20, fontWeight: '400',marginLeft:55}}>Phone</Text>
            </View>

            {items.map(item => (
            
                <View style={{flexDirection:"row",paddingBottom:20}} key={item._id}>
                 <Text style={{ fontSize:20, fontWeight: '400',marginLeft:40}}>{item.request_id}</Text>   
               <Text style={{ fontSize:20, fontWeight: '400',marginLeft:59}}>{item.name}</Text> 
               <Text style={{ fontSize:20, fontWeight: '400',marginLeft:57 }}>{item.age}</Text>
               <Text style={{ fontSize:20, fontWeight: '400',marginLeft:45 }}>{item.phone}</Text>      
                </View>
            ))}



                <View>

                <Button
                title="Create      Donation"
                onPress={() => navigation.navigate('About')}
                    />

                </View>

        </View>
    );
}
