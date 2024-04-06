import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
type Props = {
  floors: number[];
  currentFloor: number;
  onFloorChange: (floor: number) => void;
  style: ViewStyle;
};

const EtajSwitch = ({floors, currentFloor, onFloorChange, style}: Props) => {
  return (
    <View style={[styles.container]}>
      {floors.map(floor => (
        <TouchableOpacity
          key={floor}
          style={[
            styles.floorButton,
            currentFloor === floor && styles.selectedFloor,
          ]}
          onPress={() => onFloorChange(floor)}>
          <Text style={styles.floorText}>{`Etajul ${floor}`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  floorButton: {
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'rgba(100, 151, 61, 0.3)',
    borderTopWidth: 5,
    borderTopColor: 'rgba(100, 151, 61, 0.3)',
    borderLeftWidth: 5,
    borderLeftColor: 'rgba(100, 151, 61, 0.3)',
    borderRightWidth: 5,
    borderRightColor: 'rgba(100, 151, 61, 0.3)',
    height: '101%',
  },

  floorText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedFloor: {
    backgroundColor: 'white', //green,
    borderTopWidth: 2,
    borderTopColor: '#64973d',
    borderLeftWidth: 2,
    borderLeftColor: '#64973d',
    borderRightWidth: 10,
    borderRightColor: '#64973d',
    borderBlockColor: 'none',
    borderBottomWidth: 0,
    height: '108%',
  },
});

export default EtajSwitch;
