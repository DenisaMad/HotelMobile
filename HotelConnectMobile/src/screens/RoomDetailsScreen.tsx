import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Task} from '../constants/Types';
import {ImageBackground} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackScreens} from '../navigation/RootNavigator';
import {APIendpoints} from '../constants/endpoints';
import useFetch from '../hooks/useFetch';
import {useUserContext} from '../context/UserContext';
import {Status} from '../constants/Enums';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// type RoomDetails = RoomList & {tasks: number};
const userRole = 'receptionist';

type RoomDetailsScreenProps = {
  route: RouteProp<RootStackScreens, 'RoomDetailsScreen'>;
};
type APIPostTaskRequest = {
  name: string;
  description: string;
};
type APIUpdateRoomRequest = {
  name: string;
  status: string;
};
type APIPostTaskResponse = {
  result: string;
};
type PostTask = {
  name: string;
  description: string;
};

const RoomDetailsScreen = ({route}) => {
  const {camera} = route.params;
  const {userState} = useUserContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackScreens>>();
  const {get} = useFetch(APIendpoints.getAllTasks);
  const {post} = useFetch<APIPostTaskRequest>(APIendpoints.createTask);
  const {put} = useFetch<APIUpdateRoomRequest>(
    APIendpoints.updateRoom + camera.id + '/',
  );

  const [selectedStatus, setSelectedStatus] = useState(camera.status);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
  });
  const [roomDataToUpdate, setRoomDataToUpdate] = useState({
    name: camera.name,
    status: camera.status.toString(),
  });
  const [taskData, setTaskData] = useState([]);
  const fetchTasksList = async () => {
    try {
      const tasksList: Task[] = await get();
      console.log(tasksList);
      // const filteredTasks = tasksList.filter(
      //   task => task.roomId === camera.id,
      // );
      // setTaskData(filteredTasks);
      // console.log(filteredTasks);
      setTaskData(tasksList);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return error;
    }
  };

  const updateRoom = async (name: string, status: string) => {
    try {
      const response = await put({name, status});
      console.log('Response:', response);
      // const filteredTasks = tasksList.filter(
      //   task => task.roomId === camera.id,
      // );
      // setTaskData(filteredTasks);
      // console.log(filteredTasks);
    } catch (error) {
      console.error('Error updating room:', error);
      return error;
    }
  };
  useEffect(() => {
    fetchTasksList();
  }, []);
  const renderTaskItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.6,
      }}>
      {/* <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <View style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Șterge</Text>
        </View>
      </TouchableOpacity> */}
      <Image
        source={require('../assets/Tasks/baseline_priority_high_black_18.png')}
        style={{width: 40, height: 35}}
      />
      <View style={styles.taskItemContent}>
        <Text style={styles.taskItemText}>{item.name}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <View style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Șterge</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const onSaveButtonPress = () => {
    setRoomDataToUpdate({name: camera.name, status: camera.status.toString()});
    updateRoom(camera.name, camera.status.toString());
    navigation.goBack();
  };

  const addNewTask = () => {
    console.log('addButtonPressed');
    setModalVisible(true);
  };

  const handleDeleteTask = taskId => {
    const updatedTaskData = taskData.filter(task => task.id !== taskId);
    setTaskData(updatedTaskData);
  };

  const handleModalSave = async (newTask: PostTask) => {
    console.log(newTask);
    try {
      const newAddedTask = await post({
        name: newTask.name,
        description: newTask.description,
      });
      console.log(newAddedTask);
      setModalVisible(false);
      fetchTasksList();
    } catch (error) {
      // Handle errors that may occur during the POST request
      console.error('Error adding new row:', error);

      // Show an error message or perform any other error handling
      Alert.alert('Error', 'Failed to add a new task. Please try again.');
    }
  };

  const handleChangeStatus = (selectedValue: Status) => {
    setSelectedStatus(selectedValue);
    camera.status = selectedValue;
  };

  return (
    <ImageBackground
      source={require('../assets/RoomDetails/room.jpg')}
      style={styles.container}
      imageStyle={{
        opacity: 0.15,
        height: '150%',
        resizeMode: 'stretch',
        marginTop: -150,
      }}>
      <View style={styles.container}>
        <Text style={styles.title}>{`Camera ${camera.number}`}</Text>
        <View style={styles.body}>
          {userRole === 'receptionist' && (
            <Picker
              onValueChange={(itemValue: Status) => {
                handleChangeStatus(itemValue);
              }}
              selectedValue={selectedStatus}
              style={styles.pickerStyles}
              dropdownIconColor={'white'}>
              <Picker.Item
                label="ocupata de zi > murdara"
                value={Status.ocupata_de_zi_murdar}
                style={styles.pickerItem}
              />
              <Picker.Item
                label="ocupata de zi > curata"
                value={Status.ocupata_de_zi_curat}
                style={styles.pickerItem}
              />
              <Picker.Item
                label="ocupata > de iesit"
                value={Status.ocupata_de_iesit}
                style={styles.pickerItem}
              />
              <Picker.Item
                label="libera > murdara"
                value={Status.liber_murdar}
                style={styles.pickerItem}
              />
              <Picker.Item
                label="libera > curata"
                value={Status.liber_curat}
                style={styles.pickerItem}
              />
              <Picker.Item
                label="libera > verificata"
                value={Status.liber_verificat}
                style={styles.pickerItem}
              />
              <Picker.Item
                label="indisponibila > mentenanta"
                value={Status.mentenanta_indisponibil}
                style={styles.pickerItem}
              />
            </Picker>
          )}
        </View>
        <Text style={styles.taskHeader}>Tasks: </Text>
        <TouchableOpacity style={styles.addButton} onPress={addNewTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <FlatList
          data={taskData}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id.toString()}
        />

        <View style={styles.doneButton}>
          <TouchableOpacity onPress={onSaveButtonPress}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nume task"
              onChangeText={text => {
                setNewTask({name: text, description: text});
                console.log(text);
              }}
              value={newTask.name}
            />
            <Button title="Salvează" onPress={() => handleModalSave(newTask)} />
            <Button title="Anulează" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  body: {
    borderRadius: 15,
    borderBlockColor: '#64973d',
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
    marginBottom: 30,
    transform: [{scale: 1.2}],
  },
  pickerStyles: {
    backgroundColor: 'rgba(100, 151, 61, 0.8)',
    color: 'white',
    fontSize: 30,
  },
  pickerItem: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
  doneButton: {
    borderWidth: 2,

    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(100, 151, 61, 0.7)',
    width: '50%',
    borderTopColor: 'rgba(0, 0, 0, 0.7)',
    borderTopWidth: 5,
    borderRightColor: 'rgba(0, 0, 0, 0.7)',
    borderRightWidth: 5,
    borderBottomWidth: 0,
    borderLefttWidth: 0,
    borderLeftColor: 'rgba(100, 151, 61, 0.7)',
  },
  doneButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  taskHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },
  taskItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  taskItemContent: {
    flex: 1,
  },
  taskItemText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
  },
  addButton: {
    position: 'absolute',
    top: 178,
    right: 10,
    backgroundColor: '#64973d',
    borderRadius: 10,
    borderTopColor: 'rgba(0, 0, 0, 0.7)',
    borderTopWidth: 3,
    borderRightColor: 'rgba(0, 0, 0, 0.7)',
    borderRightWidth: 3,
    borderLeftColor: '#64973d',
    padding: 5,
    width: 50,
    zIndex: 1,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    zIndex: 0,
    textAlign: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
    backgroundColor: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
    borderTopColor: 'darkred',
    borderTopWidth: 4,
    borderRightColor: 'darkred',
    borderRightWidth: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 15,
    margin: 3,
    fontWeight: 'bold',
  },
});

export default RoomDetailsScreen;
