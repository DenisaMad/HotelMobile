import React, {useCallback, useEffect} from 'react';
import {ReactNode, createContext, useContext, useState} from 'react';
import {EUserRole} from '../constants/Enums';
import {APIendpoints} from '../constants/endpoints';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import {Alert} from 'react-native';
import {decode} from 'base-64';

type APILoginRequest = {
  username: string;
  password: string;
};

type APIRefreshRequest = {
  refresh: string;
};

type APIRefreshResponse = {
  access: string;
};

type APILoginResponse = {
  refresh: string;
  access: string;
};

type DecodedToken = {
  user_id: number;
  email: string;
  role: EUserRole;
};

type UserAuthenticated = DecodedToken;

type State = {
  token?: string;
  refresh?: string;
  authenticated: boolean;
};

type UserContextProps = {
  state?: State;
  user?: UserAuthenticated;
  login?: (username: string, password: string) => Promise<boolean>;
  logout?: () => void;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextProps>({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({children}: UserProviderProps) => {
  // const errorUsrPwNotFound = 'Username and/or password not found!';
  const initialState: State = {
    token: undefined,
    authenticated: false,
    refresh: undefined,
  };

  const [state, setState] = useState<State>(initialState);
  const [user, setUser] = useState<UserAuthenticated | undefined>(undefined);

  const {post: loginCall} = useFetch<APILoginRequest>(APIendpoints.login);
  const {post: refreshCall} = useFetch<APIRefreshRequest>(
    APIendpoints.refreshToken,
  );

  const updateAccesToken = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const decodeToken = (token: string): DecodedToken | false => {
    console.log('test decoding token');
    try {
      const decoded: string = decode(token.split('.')?.[1]);
      console.log(decoded);
      return JSON.parse(decoded);
    } catch (e) {
      console.log(e);
    }
    return false;
  };

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    if (!username?.length || !password?.length) {
      Alert.alert('Error', 'Please fill in the forms');
      return false;
    }

    const requestData: APILoginRequest = {
      username: username,
      password: password,
    };
    const response = await loginCall<APILoginResponse>(requestData);
    if (response?.access) {
      const userDecoded = decodeToken(response.access);
      if (!userDecoded) {
        return false;
      }
      updateAccesToken(response.access);
      setState({
        token: response.access,
        refresh: response.refresh,
        authenticated: true,
      });
      setUser(userDecoded);
      return true;
    } else {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
    return false;
  };

  const logout = () => {
    setState(initialState);
    setUser(undefined);
  };

  const getRefresh = useCallback(async () => {
    console.log('function getREFRESH called');
    if (state.refresh) {
      console.log('STARTED REFRESH(having refresh token)');
      const request: APIRefreshRequest = {
        refresh: state.refresh,
      };
      const response = await refreshCall<APIRefreshResponse>(request);

      if (response?.access) {
        console.log('REFRESH RESPONSE:', response.access);
        updateAccesToken(response.access);
        setState(prev => ({
          ...prev,
          token: response.access,
        }));
      } else {
        setState(prev => ({
          ...prev,
          authenticated: false,
        }));
        Alert.alert('Error', 'Please login again.');
      }
    }
  }, [refreshCall, state.refresh]);

  useEffect(() => {
    const min4 = 4 * 60 * 1000;

    const intervalId = setInterval(() => {
      getRefresh();
    }, min4);

    return () => clearInterval(intervalId);
  }, [getRefresh]);

  const value: UserContextProps = {
    state,
    user,
    login,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
