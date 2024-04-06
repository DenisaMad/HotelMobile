import {useEffect, useState} from 'react';
import axios from 'axios';

// type endpoint = string;

const useFetch = <T,>(endpoint: string) => {
  const localURL = 'http://10.0.2.2:8000/api/';
  const deployedURL = 'https://hotelapi-19ae8c397393.herokuapp.com/api/';
  const options = {
    method: 'GET',
    // url: 'http://127.0.0.1:8000/api/' + endpoint,
    url: deployedURL + endpoint,
  };
  //ui thread - ui butoane etc layout
  //js thread - logica - toate functiile (for 1 -> 100000)
  //3 daca apelam get -> creeaza thread -> exec doar get

  const get = async (_delete: boolean = false) => {
    try {
      if (_delete) {
        options.method = 'DELETE';
      }
      console.log('called:', options.url);

      const response = await axios.request(options);

      if (response && response?.data) {
        return response.data;
      }
    } catch (error) {
      console.log('GET RECEIVED ERROR:', error);
    }
    return null;
  };

  const post = async <RETURN,>(data: T) => {
    try {
      console.log('called:', options.url);
      options.method = 'POST';

      const response = await axios.post(options.url, data);
      console.log('response:', response.data);
      if (response && response?.data) {
        console.log('am primit');
        return response.data as RETURN;
      }
    } catch (error) {
      console.log('POST RECEIVED ERROR:', error);
    }
    return null;
  };

  const put = async <RETURN,>(data: T) => {
    try {
      console.log('called:', options.url);
      options.method = 'PUT';

      const response = await axios.put(options.url, data);
      console.log('response:', response.data);
      if (response && response?.data) {
        console.log('am primit');
        return response.data as RETURN;
      }
    } catch (error) {
      console.log('POST RECEIVED ERROR:', error);
    }
    return null;
  };

  //REST API
  // HTTP - get, put, post, delete
  // status code 400, 401 etc (conventie 400 -> bad request)

  // useEffect(() => {
  //   const callGet = async () => {
  //     setData(await get());
  //   };
  //   callGet();
  // }, []);

  return {get, post, put};
};

export default useFetch;
