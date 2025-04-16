import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';


interface TextAreaProps {
  label: string;
  placeholder: string;
  
  value: string;
  onChangeText: (text: string) => void;
  
 
  
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  
  value,
  onChangeText,
 
 
  
 
}) => {
 
    const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.container, isFocused && styles.inputWrapperFocused]}>
     
      <View  style={[
          styles.inputWrapper,
         
        ]}>
         <Text style={styles.label}>{label}</Text>
         <TextInput
          style={styles.textarea}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={true}
          multiline={true} // Enable multiple lines
          numberOfLines={4} // Set the initial number of lines
          placeholderTextColor="#ABAFB1"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      
    </View>
  );
};

export default TextArea;

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
 
  inputWrapperFocused: {
    borderColor: 'orange', // couleur quand focus
    borderWidth: 1,
  },
  textarea: {
    height: 100, // Adjust height for textarea-like behavior
    borderColor: '#ABAFB1',
    borderWidth: 0,
    borderRadius: 5,
    padding: 10,
   
    fontSize: 16,
    textAlignVertical: 'top', // Align text to the top of the input
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
