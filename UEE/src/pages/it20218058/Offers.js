import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react';
import AllJobOffers from '../../components/it20218058/AllJobOffers';
import RequestedOffers from '../../components/it20218058/RequestedOffers';

export default function Offers({ navigation }) {

  const [btnOne, setBtnOne] = useState(true);

  const click1 = () => {
    setBtnOne(true);
  }
  const click2 = () => {
    setBtnOne(false);
  }

  return (
    <View>
      <View style={styles.btn} >
        <View style={styles.btn1}>
          <Button
            title="All Job Offers"
            color='#629191'
            onPress={click1}
          />
        </View>
        <View style={styles.btn2}>
          <Button
            title="Requested Offers"
            color='#79ABAB'
            onPress={click2}
          />
        </View>
      </View>

      <View>
        {btnOne ? (
          <AllJobOffers/>
        ): (
          <RequestedOffers/>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row'
  },
  btn1: {
    width: 200,
  },
  btn2: {
    width: 200,
  }
});