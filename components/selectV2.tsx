import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { optionInterface } from '../interfaces/optionInterface';

interface SelectProps {
  label: string;
 
 
  options: optionInterface[];
 
  setSelectedOption:(text: string) => void;
}

const SelectComponentV2: React.FC<SelectProps> = ({
  label,
 
  options,
  
  setSelectedOption
}) => {

 


  return (
    <View style={[styles.container]}>
     
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
        
       
          <Picker  selectedValue="Data" onValueChange={(itemValue) => setSelectedOption(itemValue)} style={styles.picker}>
            {options.map((option, index) => (
              <Picker.Item key={index} label={option.label} value={option.value} />
            ))}
          </Picker>
       
      </View>
     
    </View>
  );
};

export default SelectComponentV2;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderStyle: 'solid',
   
    borderRadius: 8,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor :'white',
    borderColor: '#EFF1F9',
    borderWidth: 1,
  },
  
  picker: {
    height: 50,
    width: '100%',
    backgroundColor :'white',
    borderWidth:0,
    color :"#ABAFB1"
  },
 
  
  
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    paddingLeft: 10,
    color: '#5E6366',
  },
  
 
});
