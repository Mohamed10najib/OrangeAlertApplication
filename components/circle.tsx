import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ColorType {
    color: string;
    borderColor:string;
  }
const Circle :React.FC<ColorType> = ({color,borderColor}) => {
  return (
    <View style={[styles.container,{ backgroundColor: color , borderColor: borderColor, } ]} ></View>
  )
}

export default Circle

const styles = StyleSheet.create({

    container :{
        width :12,
        height :12,
       
       
        borderRadius :12,
       
        borderWidth :1,
       
        marginRight :6,
        marginLeft :6
    }
})