import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { optionInterface } from '../interfaces/optionInterface';

interface SelectProps {
  label: string;
 
 
  options: optionInterface[];
 
  setSelectedOption:(text: string) => void;
}

const SelectComponent: React.FC<SelectProps> = ({
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

export default SelectComponent;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderStyle: 'solid',
    borderWidth: 0,
    borderRadius: 8,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor :'#F7F7F7'
    
  },
  
  picker: {
    height: 50,
    width: '100%',
    backgroundColor :'#F7F7F7',
    borderWidth:0
  },
 
  
  
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    paddingLeft: 10,
    color: '#5E6366',
  },
  input: {
    height: 37,
    borderColor: '#CFD3D4',
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor :'#F7F7F7'

  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
});
