import React from 'react';
import {useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {useUserContext} from '../context/UserContext';
import CustomInputComponent from '../components/CustomInputComponent';

// type user = {
//   id: number;
//   username: string;
//   password: string;
//   role: EUserRole;
// };

const LogoutScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {logout, user} = useUserContext();

  const handleUsernameInput = (value: string) => {
    setUsername(value);
  };

  const handlePasswordInput = (value: string) => {
    setPassword(value);
  };

  const handleLogin = async () => {
    const loginStatus = await login!(username, password);

    if (loginStatus) {
      setUsername('');
    }
    setPassword('');
  };

  const handleSubmit = () => {
    if (!username.length || !password.length) {
      Alert.alert('Please fill the forms');
      return;
    }
    handleLogin();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/loginPage/hotelLogo.png')}
      />
      {/* <CustomInputComponent
        placeholder="e.g. corinacrc"
        label="Username"
        value={username}
        onChangeText={handleUsernameInput}
      />
      <CustomInputComponent
        placeholder=""
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={handlePasswordInput}
      /> */}
      <Text>Ur username: {user?.user_id}</Text>
      <Text>role:{user?.role}</Text>
      <Text>{user?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.textOnButton}>LOG OUT!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    gap: 20,
  },
  logo: {
    width: 170,
    height: 170,
    alignSelf: 'center',
  },
  button: {
    width: 100,
    height: 50,
    borderWidth: 2,
    borderColor: '#64973d',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#64973d',
  },
  textOnButton: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LogoutScreen;
