import { store } from '../rtk-slice/store'; // will be done using localstorage
import config from "../constants/config";


// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

let headerData = {
  'Source': 'Desktop',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Connection': 'keep-alive',
  'Access-Control-Request-Headers': '*',
  'ACCEPT_ENCODING': 'gzip, deflate',
  'ACCEPT_LANGUAGE': "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7",
  "Upgrade-Insecure-Requests": 1
}

// const authHeader = () => {
//   return {}
//   const user = store.getState().globalReducer.userData ?store.getState().globalReducer.userData:null
//   // const user = JSON.parse(localStorage.getItem('user'));
//   if (user && user.userContext && user.userContext.tokenId) {
//     return { tokenId: user.userContext.tokenId, userId: user.userContext.userId };
//   } else {
//     return {};
//   }
// }
// const unAuthorizedToken = () => {
//       // token expired, redirect to login page
//       // clear local storage
//       // clear state
// }

const postData = async (url = '', data = {}, headerObj = {}) => {
  try {
    // let newheaders = { ...headerData, ...headerObj, ...authHeader() }
    let newheaders = { ...headerData, ...headerObj }
    const response = await fetch(url, {
      method: 'POST',
      headers: newheaders,
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    // if (response && response.status === 401){
    //   unAuthorizedToken()
    // }
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    throw error;
  }
}

const getData = async (url = '', headerObj = {}) => {
  try {
    let newheaders = { ...headerData, ...headerObj }
    const response = await fetch(url, {
      method: 'GET',
      headers: newheaders,
      referrerPolicy: 'no-referrer'
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    throw error;
  }
}
const deleteData = async (url = '', headerObj = {}) => {
  try {
    // let newheaders = { ...headerData, ...headerObj, ...authHeader() }
    let newheaders = { ...headerData, ...headerObj }
    const response = await fetch(url, {
      method: 'DELETE',
      headers: newheaders,
      referrerPolicy: 'no-referrer',
    });
    // if (response && response.status === 401){
    //   unAuthorizedToken()
    // }
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    throw error;
  }
}

const getUserDetailsById = async (id) => {
  try {
    const { userId, tokenId } = store.getState().globalReducer?.userData?.userContext // will be implemented with localStorage
    const headers = { userId, tokenId }
    const url = config.baseUrl + config.getUserList + '?id=' + id;
    const resp = await postData(url, {}, headers);
    return resp
    
  } catch (error) {
    throw(error)
  }
 
}
const getUserRatesById = async (id) => {
  try {
    const { userId, tokenId } = store.getState().globalReducer?.userData?.userContext // will be implemented with localStorage
    const headers = { userId, tokenId }
    const url = config.baseUrl + config.getDriverCurrentRates + '?driverId=' + id;
    const resp = await getData(url, headers);
    return resp
    
  } catch (error) {
    throw(error)
  }
 
}


export { postData, getData, deleteData, getUserDetailsById,getUserRatesById };
