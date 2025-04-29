import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const CustomCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setChecked(!checked)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
      }}
    >
     {!checked? <View
        style={{
          height: 20,
          width: 20,
          borderWidth: 1,
          borderColor: '#808080',
          backgroundColor: checked ? 'orange' : '#fff',
        }}
      />:
      <View style={{borderWidth: 1, height: 20,
        width: 20,
        borderColor: '#808080',}}>
      <Feather name="check" size={20} color="green" />
    </View>}
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
