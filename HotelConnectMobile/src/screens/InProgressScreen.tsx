import useFetch from '../hooks/useFetch';
import {APIendpoints} from '../constants/endpoints';
import {Status} from '../constants/Enums';
import CardComponent from '../components/CardComponent';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {RoomList} from '../constants/Types';

const InProgressScreen = () => {
  const [rooms, setRooms] = useState<RoomList[]>([]);
  const {get} = useFetch(APIendpoints.getAllRooms);

  useEffect(() => {
    const fetchRoomList = async () => {
      const roomList: RoomList[] = await get();
      console.log('Room List:', roomList);

      setRooms(roomList);
    };

    fetchRoomList();
  }, []);

  const renderCamera = ({item: camera}: {item: RoomList}) => {
    return (
      <CardComponent camera={camera} state={camera['status']} height={50} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          style={styles.card}
          data={rooms}
          renderItem={renderCamera}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },

  card: {
    backgroundColor: 'white',
  },
});

export default InProgressScreen;
