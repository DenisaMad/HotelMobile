import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {View, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {RootStackScreens} from '../navigation/RootNavigator';
import EtajSwitch from '../components/EtajSwitch';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useFetch from '../hooks/useFetch';
import {useUserContext} from '../context/UserContext';
import {APIendpoints} from '../constants/endpoints';
import {RoomList} from '../constants/Types';
import CardComponent from '../components/CardComponent';

const AllRoomsScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(1); //Default floor value
  const {get} = useFetch(APIendpoints.getAllRooms);

  const fetchRoomList = async () => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    try {
      const roomList: RoomList[] = await get();
      // roomList.forEach(element => {
      //   switch (element.status) {
      //     case 'ocupata_de_iesit':
      //       element.status = Status.ocupata_de_iesit;
      //       break;
      //     case 'ocupata_de_zi_curata':
      //       element.status = Status.ocupata_de_zi_curata;
      //       break;
      //     case 'ocupata_de_zi_murdara':
      //       element.status = Status.ocupata_de_zi_murdara;
      //       break;
      //     case 'libera_murdara':
      //       element.status = Status.libera_murdara;
      //       break;
      //     case 'libera_curata':
      //       element.status = Status.libera_curata;
      //       break;
      //     case 'libera_verificata':
      //       element.status = Status.libera_verificata;
      //       break;
      //     case 'indisponibila_mentenanta':
      //       element.status = Status.indisponibila_mentenanta;
      //       break;
      //     default:
      //       element.status = Status.alt_status;
      //   }
      // });
      setRooms(roomList);
      const filteredRooms = roomList.filter(
        room => room.floor === selectedFloor,
      );
      setFilteredRooms(filteredRooms);
      console.log(filteredRooms);
    } catch (error) {
      console.error('Error fetching room list:', error);
      return error;
    }
  };

  const fetch = useCallback(() => {
    fetchRoomList();
  }, []);
  useFocusEffect(fetch);

  const {userRole} = useUserContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackScreens>>();

  const handleFloorChange = (selectedFloor: number) => {
    setSelectedFloor(selectedFloor);
    const filteredRooms = rooms.filter(room => room.floor === selectedFloor);
    setFilteredRooms(filteredRooms);
    console.log(selectedFloor);
    console.log(filteredRooms);
  };
  const renderCamera = ({item: camera}) => {
    return <CardComponent camera={camera} state={camera.status} height={50} />;
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          marginBottom: 1,
          borderBottomWidth: 5,
          borderBottomColor: '#64973d',
        }}>
        <EtajSwitch
          style={{marginVertical: 30}}
          floors={[1, 2, 3]}
          currentFloor={selectedFloor}
          onFloorChange={handleFloorChange}
        />
      </View>
      <FlatList
        data={filteredRooms}
        renderItem={renderCamera}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  button: {
    width: 200,
    height: 50,
    borderWidth: 2,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
  },
});

export default AllRoomsScreen;
