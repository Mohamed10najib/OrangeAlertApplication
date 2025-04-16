import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

interface TypeOption {
  isHere: boolean;
  iconName: string;
  nameOption: string;
}

const Option: React.FC<TypeOption> = ({ isHere, iconName, nameOption }) => {
  return (
    <View
      style={[
        styles.container,
        isHere ? styles.active : styles.notactive,
      ]}
    >
      <View style={styles.container1}>
        {/* Removed inline style and passed color via prop */}
        <Icon name={iconName} size={30} color={!isHere?'#F1EFEC':'#FFB200'} />
      </View>
      <View style={styles.container2}>
        <Text style={{ color: !isHere?'#F1EFEC':'#FFB200', fontWeight: 'bold', fontSize: 15 }}>
          {nameOption}
        </Text>
      </View>
      {isHere && (
        <View style={styles.container3}>
          <Icon name="chevron-up" size={30} color={!isHere?'#F1EFEC':'#FFB200'} />
        </View>
      )}
    </View>
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    opacity: 0.7,
  },
  active: {
    backgroundColor: '#222831',
  },
  notactive: {
    backgroundColor: 'transparent',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
