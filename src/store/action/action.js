
import ActionTypes from '../constant/constant';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
const IMEI = require('react-native-imei');
const client_id = '5cb1de1026075af155f4d570'
const client_secret = 'KXjFkLKpXWadouMR+if8IMOZ8dHqfeKawBaZh6JPZnI='

const URL = 'https://avunja-api-staging.herokuapp.com/api/v1.0'


//login user 
export function logInUser(user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {


            _retrieveData('userData').then((userNumber) => {
                console.log(userNumber, 'userNumber')

                return fetch(URL + '/auth/login', {
                    method: 'POST', body: JSON.stringify({
                        username: userNumber ? userNumber.number : null,
                        password: user.pin,
                        client_id,
                        client_secret,
                        grant_type: 'password'
                    }),
                    headers: {
                        "Content-Type": 'application/json'
                    }
                })
                    .then((res) => {
                        res.json().then((response) => {
                            console.log(response, 'response here')
                            if (response.access_token) {
                                resolve()
                            } else {
                                reject(response.error_description)
                            }
                        })
                    }).catch((err) => {
                        console.log(err, 'error')
                        reject(err.message)

                    })
            })

        })
    }
}



//handle confirmation code
//send to the user mobile
export function confirmationCode(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {

            fetch(URL + '/auth/register', {
                method: 'POST', body: JSON.stringify({
                    phoneNumber: obj.msisdnNumber
                }),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
                .then((res) => {
                    console.log(res, 'response here')
                    res.json().then((response) => {
                        console.log(response, 'response here json')

                        if (response.success) {

                            //if verification code sent to the user
                            resolve()
                            dispatch({ type: ActionTypes.USER_VERIFICATION, payload: response.data })
                            dispatch({ type: ActionTypes.USER_NUMBER, payload: obj.msisdnNumber })

                        } else {
                            //request error handle here
                            //promise rejected
                            console.log(response, 'error')
                            reject(response.message)
                        }
                    })
                }).catch((err) => {
                    console.log(err, 'error')
                    reject(err.message)
                })

            //get imei 
            // IMEI.getImei().then(imeiList => {
            //     console.log(imeiList, '')
            // });



        })
    }
}

//verify the confirmation code
export function verifyConfirmationCode(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {

            fetch(URL + '/auth/verify-user', {
                method: 'POST', body: JSON.stringify({
                    userId: obj.userId,
                    code: obj.code
                }),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
                .then((res) => {
                    res.json().then((response) => {
                        console.log(response, 'response here')
                        if (response.success) {
                            resolve(response.message)
                        } else {
                            reject(response.message)
                        }
                    })
                }).catch((err) => {
                    console.log(err, 'error')
                    reject(response.message)
                })

        })
    }
}




_storeData = async (data) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(data))
    } catch (error) {
        // Error saving data
    }
};


_retrieveData = async (text) => {
    try {
        const value = await AsyncStorage.getItem(text);
        if (value !== null) {
            // We have data!!
            console.log(value, 'value here')
            return JSON.parse(value)
        }
    } catch (error) {
        // Error retrieving data
    }
};



//create user pin
export function createUserPin(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {

            console.log(obj, 'object')
            fetch(URL + '/users/set-pin', {
                method: 'POST', body: JSON.stringify({
                    userId: obj.userId.userId,
                    pin: obj.pin
                }),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
                .then((res) => {
                    res.json().then((response) => {
                        console.log(response, 'response here')
                        if (response.success) {
                            let object = {
                                userId: obj.userId.userId,
                                number: obj.number
                            }
                            _storeData(object)
                            resolve(response.message)

                        } else {
                            reject(response.message)
                        }
                    })
                }).catch((err) => {
                    console.log(err, 'error')
                    reject(err.message)

                })

        })
    }
}



