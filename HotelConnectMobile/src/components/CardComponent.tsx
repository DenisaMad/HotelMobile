/* eslint-disable keyword-spacing */
/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Status} from '../constants/Enums';
import {RoomList} from '../constants/Types';
import RootNavigator from '../navigation/RootNavigator';
import {useNavigation} from '@react-navigation/native';
import RoomDetailsScreen from '../screens/RoomDetailsScreen';
import {opacity} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

type Props = {
  camera: RoomList;
  state: Status;
  showDetails?: boolean;
  height?: number;
};
const getBgColor = (status: Status) => {
  if (status === Status.liber_murdar) {
    return {
      backgroundColor: 'red',
      borderColor: 'red',
      borderWidth: 2,
    };
  } else if (status === Status.ocupata_de_iesit) {
    return {
      backgroundColor: 'pink',
      borderColor: 'pink',
      borderWidth: 2,
    };
  } else if (status === Status.ocupata_de_zi_curat) {
    return {
      backgroundColor: 'lightskyblue',
      borderColor: 'lightskyblue',
      borderWidth: 2,
    };
  } else if (status === Status.ocupata_de_zi_murdar) {
    return {
      backgroundColor: 'deepskyblue',
      borderColor: 'deepskyblue',
      borderWidth: 2,
    };
  } else if (status === Status.liber_curat) {
    return {
      backgroundColor: 'lightgreen',
      borderColor: 'lightgreen',
      borderWidth: 2,
    };
  } else if (status === Status.liber_verificat) {
    return {
      backgroundColor: 'limegreen',
      borderColor: 'limegreen',
      borderWidth: 2,
    };
  } else if (status === Status.mentenanta_indisponibil) {
    return {
      backgroundColor: 'silver',
      borderColor: 'silver',
      borderWidth: 2,
    };
  }
};
//aasxds
const CardComponent = (props: Props) => {
  const {camera} = props;
  const navigation = useNavigation();

  const handleDetailsPress = () => {
    navigation.navigate('RoomDetailsScreen', {camera: camera});
  };

  return (
    <View
      style={[
        styles.container,
        {minHeight: props.height ?? 50},
        getBgColor(camera.status),
      ]}>
      <View style={[styles.childContainer]}>
        <View style={styles.firstRow}>
          <Text style={styles.greenTextBig}>Room No: {camera?.number}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.greenTextSmall}>Details:</Text>
          <View style={styles.detailsButton}>
            <TouchableOpacity onPress={handleDetailsPress}>
              <Image
                style={{height: 20, width: 20, tintColor: 'black'}}
                source={require('../assets/cardComponent/fast-forward-2.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
    // borderColor: '#64973d',
    // borderStyle: 'solid',
    // borderWidth: 1,
    borderRadius: 20,
    minWidth: '80%',
    maxWidth: '80%',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    margin: 10,
  },
  childContainer: {
    padding: 7,

    borderRadius: 20,

    width: '90%',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    marginLeft: 0,
  },
  firstRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 5,
  },
  status: {
    width: 18,
    height: 18,
    borderRadius: 50,
    borderColor: 'white',
    backgroundColor: 'blue',
    borderWidth: 2,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    minWidth: '100%',
    justifyContent: 'flex-end',
  },
  detailsButton: {
    marginRight: 20,
    marginBottom: 10,
    width: 5,
    height: 5,
  },
  greenTextBig: {
    color: '#64973d',
    fontWeight: 'bold',
    fontSize: 25,
  },
  greenTextSmall: {
    color: '#64973d',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default CardComponent;
