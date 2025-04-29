import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { optionInterface } from '../interfaces/optionInterface';

interface InputFieldProps {
  label: string;
  placeholder: string;
  isForPassword: boolean;
  value: string;
  onChangeText: (text: string) => void;
  typeInput: string;
  mode: string;

  
  editable: boolean;
  
}

const InputFiled: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  isForPassword,
  value,
  onChangeText,
  typeInput,
  mode,
  
  
  editable,

}) => {
  const [secureText, setSecureText] = useState(true);
 const [isFocused, setIsFocused] = useState(false);
  const togglePasswordVisibility = () => {
    setSecureText(!secureText);
  };


  return (
    <View style={[styles.container, typeInput === 'small' ? styles.smallInput : styles.largeInput, mode === 'mode1' ? styles.mode1 : styles.mode2,isFocused && styles.inputWrapperFocused]}>
      {isForPassword && (
        <View style={styles.lockContainer}>
          <Icon name="lock" size={32} color="#5E6366" />
         { /*<View style={styles.point} />*/}
        </View>
      )}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
       
          <TextInput
          style={[styles.input]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isForPassword && secureText}
            placeholderTextColor="#ABAFB1"
            editable={editable}
            onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          
          />
       
      </View>
      {isForPassword && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconWrapper}>
          <Icon name={secureText ? 'eye' : 'eye-off'} size={25} color="#5E6366" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputFiled;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  inputWrapperFocused: {
    borderColor: 'orange', // couleur quand focus
    borderWidth: 1,
  },
  smallInput: {
    width: '35%',
  },
  largeInput: {
    width: '96%',
  },
  mode1: {
    borderColor: '#EFF1F9',
  },
  mode2: {
    backgroundColor: '#F7F7F7',
    borderColor: '#F7F7F7',
  },
  lockContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
  point: {
    position: 'absolute',
    top: '35%',
    left: '58%',
    width: 3,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#5E6366',
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
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
});
