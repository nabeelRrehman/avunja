import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Button from '../../components/button/Button';
import icon from '../../../assets/splashScreen/avunja-splash.png'
import copyright from '../../../assets/splashScreen/copyright.png'
import * as Progress from 'react-native-progress';
import Image from 'react-native-remote-svg';
import Icons from '../../svgIcons/SvgIcons'
import { NavigationActions, StackActions } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';

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


_storeData = async (data) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
        // Error saving data
    }
};

class SplashScreen extends Component {
    constructor() {
        super()

        this.state = {
            progress: 0.1
        }
    }


    navigateScreen() {


        const timerId = setInterval(() => {
            const { progress } = this.state

            var num = progress + 0.1
            var number = Number(num).toFixed(1)
            this.setState({
                progress: Number(number)
            }, () => {
                if (this.state.progress > 0.9) {
                    clearInterval(timerId);
                    const { navigate } = this.props.navigation

                    //check if user visited before
                    _retrieveData('user').then((res) => {
                        //if yes 
                        if (res) {
                            //check if user registered in app 
                            _retrieveData('userData').then((register) => {
                                //if yes then user route to login page
                                //otherwise route to signup screen
                                if (register) {
                                    console.log(register, 'response')
                                    // navigate('LogIn')
                                    const resetToLogin = StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'LogIn' }),
                                        ],
                                    });
                                    this.props.navigation.dispatch(resetToLogin)
                                } else {
                                    // navigate('SignUp')
                                    const resetToSignUp = StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'SignUp' }),
                                        ],
                                    });
                                    this.props.navigation.dispatch(resetToSignUp)
                                }
                            })
                            //if no go to welcome screen
                        } else {
                            _storeData(true)
                            const resetToWelcome = StackActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({ routeName: 'WelcomeScreen' }),
                                ],
                            });
                            this.props.navigation.dispatch(resetToWelcome)
                            // navigate('WelcomeScreen')
                        }
                    })
                }
            })

        }, 200);

        // later on...


    }

    componentWillMount() {

        this.navigateScreen()

    }

    progressPercent() {
        const { progress } = this.state

        var value

        switch (progress) {
            case 0.1:
                value = '10'
                break;
            case 0.2:
                value = '20'
                break;
            case 0.3:
                value = '30'
                break;
            case 0.4:
                value = '40'
                break;
            case 0.5:
                value = '50'
                break;
            case 0.6:
                value = '60'
                break;
            case 0.7:
                value = '70'
                break;
            case 0.8:
                value = '80'
                break;
            case 0.9:
                value = '90'
                break;
            case 1.0:
                value = '100'
                break;
            default:
                break;
        }

        return value
    }


    render() {
        const { progress } = this.state
        return (
            //swiper library used for introduction screen
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Image
                        source={Icons.appIconLarge}
                        style={{ width: 236, height: 99 }}
                    />
                </View>
                <View style={styles.loading}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: '1%', paddingVertical: '3%' }}>
                        <View style={{ flexGrow: 1, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#222222' }}>
                                {'App Loading ...'}
                            </Text>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#222222', fontStyle: 'normal' }}>
                                {`${this.progressPercent()}%`}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Progress.Bar unfilledColor={'#faebea'} borderWidth={0} progress={progress} width={200} height={10} color={'#ce3b33'} />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: '1%',
                    paddingVertical: '10%',
                }}>
                    <View style={{ paddingRight: 5, paddingTop: 3 }}>
                        <Image
                            source={copyright}
                        />
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 15,
                            color: '#222222',
                            alignSelf: 'center'
                        }}>
                            {'2018 Avunja Mobile. All Rights Reserved.'}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    loading: {
        flexGrow: 1
    }
});


export default SplashScreen
