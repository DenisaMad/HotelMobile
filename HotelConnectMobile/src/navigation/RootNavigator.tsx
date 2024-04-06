import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RoomDetailsScreen from '../screens/RoomDetailsScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Image} from '@rneui/base';
import {RoomList} from '../constants/Types';
import LoginPage from '../screens/LoginPage';
import {useUserContext} from '../context/UserContext';
import AllRoomsScreen from '../screens/AllRoomsScreen';
import {EUserRole} from '../constants/Enums';
import InProgressScreen from '../screens/InProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LogoutScreen from '../screens/LogoutScreen';

export type RootStackScreens = {
  LoginPage: undefined;
  Drawer: undefined;
  AllRoomsScreen: undefined;
  CameraScreen: {cameraId: string};
  RoomDetailsScreen: {camera: RoomList};
  InProgressScreen: undefined;
};

type DrawerTabs = {
  Home: undefined;
  Settings: undefined;
  InProgressStack: undefined;
  LogoutPage: undefined;
};

const RootStack = createNativeStackNavigator<RootStackScreens>();

const HomeStack = () => {
  return (
    <RootStack.Navigator initialRouteName="AllRoomsScreen">
      <RootStack.Screen
        name="AllRoomsScreen"
        component={AllRoomsScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="RoomDetailsScreen"
        options={{title: 'Room details'}}
        component={RoomDetailsScreen}
      />
    </RootStack.Navigator>
  );
};

const InProgressStack = () => {
  return (
    <RootStack.Navigator initialRouteName="InProgressScreen">
      <RootStack.Screen
        name="InProgressScreen"
        component={InProgressScreen}
        options={{title: 'In Progress'}}
      />
      <RootStack.Screen
        name="RoomDetailsScreen"
        component={RoomDetailsScreen}
      />
    </RootStack.Navigator>
  );
};

const Drawer = () => {
  const DrawerNav = createDrawerNavigator<DrawerTabs>();
  const {user} = useUserContext();
  useEffect(() => {
    if (user) console.log('ROLUL PRINIT', user.role);
  }, [user]);
  return (
    <DrawerNav.Navigator initialRouteName="Home">
      {/* {user?.role === EUserRole.camerista && (
        <DrawerNav.Screen
          name="InProgressStack"
          options={{title: 'In progress'}}
          component={InProgressStack}
        />
      )} */}

      {/* {user?.role !== EUserRole.camerista && ( */}
      <DrawerNav.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: () => {
            return (
              <Image
                style={{height: 20, width: 20, tintColor: 'black'}}
                source={require('../assets/cardComponent/fast-forward-2.png')}
              />
            );
          },
          // headerShown: false,
        }}
      />
      {/* )} */}

      {/* <DrawerNav.Screen
        name="InProgressStack"
        options={{title: 'In progress'}}
        component={InProgressScreen}
      /> */}
      {user?.role === EUserRole.manager && (
        <DrawerNav.Screen name="Settings" component={SettingsScreen} />
      )}

      <DrawerNav.Screen
        name="LogoutPage"
        component={LogoutScreen}
        options={{title: 'My Account'}}
      />
    </DrawerNav.Navigator>
  );
};

const RootNavigator = () => {
  const {state} = useUserContext();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {!state?.authenticated ? (
          <RootStack.Screen name="LoginPage" component={LoginPage} />
        ) : (
          <RootStack.Screen name="Drawer" component={Drawer} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
