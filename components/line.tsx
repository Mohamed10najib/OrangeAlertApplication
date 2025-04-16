import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface ColorType {
    color: string;
    borderColor:string;
  }
const Line :React.FC<ColorType> = ({color,borderColor}) => {
  return (
    <View style = {[styles.container,{ backgroundColor: color , borderColor: borderColor, }]}></View>
  )
}

export default Line

const styles = StyleSheet.create({
    container :{
        width :50,
        height :2,
        backgroundColor :'orange'
    }
})