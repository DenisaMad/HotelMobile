import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
  Modal,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {useUserContext} from '../context/UserContext';
import CustomInputComponent from '../components/CustomInputComponent';
import {NewUser, UpdateUser, User} from '../constants/Types';
import useFetch from '../hooks/useFetch';
import {APIendpoints} from '../constants/endpoints';
import {FlatList} from 'react-native';

import CustomUserComponent from '../components/CustomUserComponent';
import {Picker} from '@react-native-picker/picker';
import {EUserRole} from '../constants/Enums';

// type user = {
//   id: number;
//   username: string;
//   password: string;
//   role: EUserRole;
// };
type APICreateUserRequest = {
  username: string;
  password: string;
  password2: string;
  email: string;
  role: EUserRole;
};
type APIupdateUserRequest = {
  username: string;
  email: string;
  role: EUserRole;
  is_active: boolean;
  user_id: string;
};
const SettingsScreen = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [newRole, setNewRole] = useState(0);
  const [newEmail, setNewEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState(EUserRole.camerista);

  const [newUser, setNewUser] = useState<NewUser>();
  const [modalVisible, setModalVisible] = useState(false);

  const {get: getAllUsers} = useFetch(APIendpoints.getAllUsers);
  const {post} = useFetch<APICreateUserRequest>(APIendpoints.createNewUser);
  const {put} = useFetch<APIupdateUserRequest>(APIendpoints.updateUser);

  const fetchUsersData = async () => {
    const data = await getAllUsers();
    if (data) {
      const usersList = data.filter((user: User) => user.is_active == true);
      setUserList(usersList);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleUsernameInput = (value: string) => {
    setNewUsername(value);
  };

  const handleNewPasswordInput = (value: string) => {
    setNewPassword(value);
  };
  const handleNewPassword2Input = (value: string) => {
    setNewPassword2(value);
  };

  const handleNewEmailInput = (value: string) => {
    setNewEmail(value);
  };

  const handleNewRoleInput = (value: EUserRole) => {
    setSelectedRole(value);
    setNewRole(value);
  };

  //   const handleLogin = async () => {
  //     const loginStatus = await login!(username, password);

  //     if (loginStatus) {
  //       setUsername('');
  //     }
  //     setPassword('');
  //   };

  const handleCreate = () => {
    setModalVisible(true);
  };
  const handleUpdateUser = async (user: User) => {
    const dataToUpdate: UpdateUser = {
      username: user.username,
      email: user.email,
      role: EUserRole.manager,
      is_active: false,
      user_id: user.id,
    };
    try {
      const response = await put(dataToUpdate);
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
    fetchUsersData();
  };

  const renderUser = ({item: user}: {item: User}) => {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.secondcontainer}>
          <View>
            <View style={styles.firstRow}>
              <Text style={styles.greenTextBig}>Username:</Text>
              <Text style={styles.username}>{user.username}</Text>
            </View>

            {/* <View style={styles.details}>
              <Text style={styles.greenTextSmall}>Role: </Text>
              <Text style={styles.role}>Receptionsta</Text>
            </View> */}
          </View>
        </View>
        <TouchableOpacity onPress={() => handleUpdateUser(user)}>
          <View style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>X</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const handleModalSave = async (newUser: NewUser) => {
    setNewUser({
      username: newUsername,
      password: newPassword,
      password2: newPassword2,
      email: newEmail,
      role: newRole,
    });
    console.log(newUser);

    const newCreated = await post(newUser);
    if (newCreated) {
      setModalVisible(false);
      fetchUsersData();
      return;
    }
    Alert.alert('Error', 'Something went wrong. Please try again.');
  };

  return (
    <ImageBackground
      source={require('../assets/Settings/employee1.jpeg')}
      style={styles.imageBackground}
      imageStyle={{
        opacity: 0.1,
        resizeMode: 'contain',
        marginTop: -50,
      }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.textOnButton}>Create new user</Text>
        </TouchableOpacity>
        <FlatList
          style={styles.container}
          data={userList}
          renderItem={renderUser}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            //   justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
          }}
        />

        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <CustomInputComponent
              label="Username"
              placeholder="janeDoe"
              value={newUsername}
              onChangeText={handleUsernameInput}
            />
            <CustomInputComponent
              label="Password"
              placeholder=" "
              value={newPassword}
              onChangeText={handleNewPasswordInput}
            />
            <CustomInputComponent
              label="Confirm password"
              placeholder=" "
              value={newPassword2}
              onChangeText={handleNewPassword2Input}
            />
            <CustomInputComponent
              label="Email"
              placeholder=" "
              value={newEmail}
              onChangeText={handleNewEmailInput}
            />
            <Picker
              onValueChange={(itemValue: EUserRole) => {
                handleNewRoleInput(itemValue);
              }}
              selectedValue={selectedRole}
              style={styles.pickerStyles}>
              <Picker.Item
                label="Manager"
                value={EUserRole.manager}
                style={styles.pickerItem}
              />
              <Picker.Item
                label="Receptionista"
                value={EUserRole.receptionista}
                style={styles.pickerItem}
              />
              <Picker.Item
                label="Camerista"
                value={EUserRole.camerista}
                style={styles.pickerItem}
              />
            </Picker>
            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={() =>
                handleModalSave({
                  username: newUsername,
                  password: newPassword,
                  password2: newPassword2,
                  email: newEmail,
                  role: newRole,
                })
              }>
              <Text style={styles.textOnModalSaveButton}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textOnModalCancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '90%',
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  secondcontainer: {
    borderRadius: 10,
    minWidth: '80%',
    maxWidth: '80%',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 5,
  },
  firstRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  greenTextBig: {
    color: '#64973d',
    fontWeight: 'bold',
    fontSize: 20,
  },
  username: {
    color: 'black',
    fontWeight: '400',
    fontSize: 20,
    marginLeft: 30,
    flex: 1,
    flexWrap: 'wrap',
  },
  details: {
    flexDirection: 'row',
  },
  greenTextSmall: {
    color: '#64973d',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 80,
  },
  role: {
    fontSize: 15,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    margin: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginRight: -10,
  },
  deleteButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  imageBackground: {
    flex: 1,
    padding: 20,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  button: {
    zIndex: 1,
    padding: 10,
    width: 200,
    height: 50,
    borderWidth: 2,
    borderColor: '#64973d',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#64973d',
    marginTop: 30,
    marginBottom: 50,
  },
  textOnButton: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 0,
  },
  modalContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 130,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  modalSaveButton: {
    alignSelf: 'center',
    backgroundColor: '#64973d',
    width: '50%',
    height: 60,
    margin: 10,
    padding: 10,
    borderRadius: 15,
  },
  modalCancelButton: {
    alignSelf: 'center',

    width: '30%',
    height: 50,
    margin: 10,
    padding: 10,
    borderRadius: 15,
  },
  textOnModalSaveButton: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  textOnModalCancelButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  pickerStyles: {
    width: '80%',
    alignSelf: 'center',
    margin: 20,
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    color: '#64973d',
    fontSize: 30,
  },
  pickerItem: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
});

export default SettingsScreen;
