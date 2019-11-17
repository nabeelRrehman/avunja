import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, findNodeHandle, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import avatar from '../../../assets/logIn/avatar.png'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logInUser } from '../../store/action/action'
import Alert from '../../components/alert/Alert';
import BlurOverlay, { closeOverlay, openOverlay } from 'react-native-blur-overlay';
// import Image from 'react-native-svg-uri';
import Image from '../../libs/react-native-remote-svg';
import Icons from '../../svgIcons/SvgIcons'

class LogIn extends Component {
    constructor() {
        super()

        this.state = {
            keys: [
                {
                    value: ['1', '2', '3']
                }, {
                    value: ['4', '5', '6']
                }, {
                    value: ['7', '8', '9']
                }, {
                    value: ['fingerprint', '0', 'delete']

                }
            ],
            codePin: [1, 2, 3, 4],
            verifyPin: [],
        }
    }

    //shuffle an array
    shuffle(arra1) {
        var ctr = arra1.length, temp, index;

        // While there are elements in the array
        while (ctr > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * ctr);
            // Decrease ctr by 1
            ctr--;
            // And swap the last element with it
            temp = arra1[ctr];
            arra1[ctr] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    }

    componentDidMount() {
        const { keys } = this.state

        keys.map((items, index) => {
            if (index !== keys.length - 1) {
                this.shuffle(items.value)
                this.setState({ keys })
            }
        })
    }

    keyBoardInput(key, type) {
        const { verifyPin } = this.state

        //when user verify pin
        if (type === 'verifyPin') {

            if (verifyPin.length <= 3 && key !== 'fingerprint' && key !== 'delete') {
                verifyPin.push(key)
            }
            if (key === 'delete') {
                verifyPin.pop()
            }
            if (key === 'done') {
                this.done(type)
            }
            if (verifyPin.length === 4) {
                const { logInUser } = this.props.actions
                const pin = verifyPin.join().replace(/,/g, '')
                let obj = {
                    pin
                }
                logInUser(obj).then((success) => {
                    openOverlay();
                    this.setState({ verifyPin: [], alert: true, title: 'SUCCESS', text: 'Login Successfull', error: false })

                    setTimeout(() => {
                        const resetToHome = StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Home' }),
                            ],
                        });
                        this.props.navigation.dispatch(resetToHome)
                    }, 3000);

                })
                    .catch((err) => {
                        openOverlay();
                        this.setState({ alert: true, title: 'ERROR', text: err, error: true, verifyPin: [] })
                    })
            }
            this.setState({ verifyPin })

        }

    }

    register() {
        const { navigate } = this.props.navigation

        navigate('SignUp')
    }

    //custom keyboard
    keyBoard(key, index, type) {
        return (
            <TouchableOpacity key={index} onPress={() => this.keyBoardInput(key, type)}>
                {
                    key === 'delete' ?

                        <View style={styles.keys_delete}>
                            <Image
                                source={Icons.cross}
                                style={{ width: 16, height: 16 }}
                            />
                        </View>
                        :
                        key === 'fingerprint' ?
                            <View style={styles.keys_done}>
                                <Image
                                    source={Icons.fingerPrint}
                                    style={{ width: 25, height: 32 }}
                                />
                            </View>
                            :
                            <View style={styles.keys}>
                                <Text style={styles.keyStyle}>
                                    {key}
                                </Text>
                            </View>
                }
            </TouchableOpacity>
        )
    }

    codeInput(code, index) {
        const { codes } = this.state
        return (
            <View key={code + index} style={{ borderBottomWidth: 2, borderBottomColor: 'lightgrey', width: 45, height: 45, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ce3b33' }}>
                    {codes && codes[index]}
                </Text>
            </View>
        )
    }

    //enter pin screen
    enterPin() {
        const { codePin, keys, verifyPin } = this.state
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={styles.profile}>
                    <View style={styles.avatar}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={avatar}
                        />
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '500',
                            color: '#303030',
                        }}>
                            {'Jane Kamau'}
                        </Text>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 14,
                            letterSpacing: 1,
                            fontWeight: 'normal',
                            color: '#303030'
                        }}>
                            {'(254)7XX XXX XXX'}
                        </Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: '5%',
                    justifyContent: 'center',
                    width: '100%',
                    paddingVertical: '1%'
                }}>
                    <TouchableOpacity onPress={() => this.register()}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: '#ce3b33', fontSize: 14 }}>
                                {'Use Different Account'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.text}>
                    <Text style={{ fontSize: 17, color: 'black' }}>
                        {'Enter your PIN-code'}
                    </Text>
                </View>
                <View style={styles.text}>
                    <View style={styles.create_pin}>
                        {
                            codePin &&
                            codePin.map((code, index) => {
                                return (
                                    index < verifyPin.length ?
                                        <View key={index} style={{
                                            width: 12,
                                            height: 12,
                                            borderRadius: 50,
                                            backgroundColor: '#ce3b33'
                                        }} />
                                        :
                                        <View key={index} style={{
                                            width: 12,
                                            height: 12,
                                            borderRadius: 50,
                                            backgroundColor: '#e7e7e7'
                                        }} />
                                )
                            })
                        }
                    </View>
                </View>
                <View style={[styles.verification, { paddingVertical: '1%' }]}>
                    <Text style={{ textAlign: 'center', color: '#49a12f' }}>
                        Secure keyboard is active
                    </Text>
                </View>
                {
                    keys &&
                    keys.map((items, index) => {
                        return (
                            <View key={index} style={styles.keyBoard}>
                                {
                                    items.value.map((key, index) => {
                                        return (
                                            this.keyBoard(key, index, 'verifyPin')
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: '5%',
                    justifyContent: 'center',
                    width: '100%',
                    // paddingVertical: '1%'
                }}>
                    <TouchableOpacity onPress={() => {
                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: '#ce3b33', fontSize: 14 }}>
                                {'Forgot Pin?'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    actions() {
        closeOverlay()
    }

    renderBlurChilds() {
        const { text, title, error } = this.state
        return (
            <Alert action={() => this.actions()} title={title} text={text} error={error} />
        )
    }

    render() {
        return (
            //main container
            <View style={styles.container}>
                <View style={{ width: '100%' }}>
                    <View style={styles.header}>
                        <Image
                            source={Icons.appIcon}
                            style={{ width: 133, height: 56 }}
                        />
                    </View>
                </View>
                <View style={{ width: '100%', flexGrow: 1 }}>
                    {
                        this.enterPin()
                    }
                </View>

                <BlurOverlay
                    radius={14}
                    downsampling={2}
                    brightness={-100}
                    onPress={() => {
                        closeOverlay();
                    }}
                    customStyles={{ alignItems: 'center', justifyContent: 'center' }}
                    blurStyle="dark"
                    children={this.renderBlurChilds()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profile: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: '2%'
    },
    avatar: {
        width: 85,
        height: 85,
        borderRadius: 50,
        overflow: 'hidden',
    },
    create_pin: {
        width: '100%',
        // borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '25%',
        flexWrap: 'wrap',
        paddingVertical: '1%'
    },
    keys: {
        // borderWidth: 1,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#f3f3f3'
    },
    keys_done: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#f3f3f3'
    },
    keys_delete: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#f3f3f3'
    },
    keyBoard: {
        width: '100%',
        // borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '18%',
        flexWrap: 'wrap',
        paddingVertical: '1%'
    },
    keyStyle: {
        fontSize: 16.6,
        fontWeight: 'normal',
        color: '#696969'
    },
    keyStyle_delete: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    keyStyle_done: {
        fontSize: 16.6,
        fontWeight: 'normal',
        color: 'white',
    },
    verification: {
        width: '100%',
        paddingVertical: '1%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    header: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: '2%',
    },
    text: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: '2%',
        paddingHorizontal: 40
    },
    icon: {
        alignItems: 'center',
        alignSelf: 'center',
        width: 40,
        height: 40,
        paddingVertical: '3%'
    },
    button: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: '7%'
    },

});

function mapStateToProps(state) {
    return ({
        userId: state.authreducer.USER_VERIFICATION,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            logInUser
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
