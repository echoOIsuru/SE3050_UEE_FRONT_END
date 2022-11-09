import React from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import CardView from '../components/CardView';
import dashboardImg from '../assest/skillNotfoundDashboard.png';

export default function SkillNotFoundDashboard({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                style={styles.logo}
                source={dashboardImg}
            />
            <CardView title={"Find My Skills"} subtitle={"This option will offer you with an exam to measure your skill set."} btnTitle={"Start"} onPress={() => navigation.navigate('Find My Skills')} />
            <CardView title={"Resource Library"} subtitle={"This option will offer you to unlimited recourses including videos, exams, and tutorials to build you career"} btnTitle={"Start"} onPress={() => navigation.navigate('Resource Library')} />
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 300,
        height: 300,
    },

});
