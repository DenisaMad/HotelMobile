import {useState} from 'react';
import React = require('react');
import {StyleSheet, TextInput} from 'react-native';
import {Text, View} from 'react-native';

export type Props = {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (value: string) => void;
};

const CustomInputComponent = (props: Props) => {
  const {label, placeholder, secureTextEntry, value, onChangeText} = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={isFocused ? styles.inputOnFocus : styles.inputTextBox}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
        }}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  labelText: {
    fontSize: 20,
    margin: 5,
    marginHorizontal: 15,
    color: '#64973d',
    fontWeight: 'bold',
  },
  inputTextBox: {
    borderColor: '#64973d',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  inputOnFocus: {
    borderWidth: 3,
    borderColor: '#64973d',
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'mintcream',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 30,
  },
});
export default CustomInputComponent;
