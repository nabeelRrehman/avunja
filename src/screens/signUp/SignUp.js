import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import PhoneInput from 'react-native-phone-input'
import CountryPicker, {
    getAllCountries,
} from 'react-native-country-picker-modal'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/button/Button';
import google from '../../../assets/signUp/google.png'
import facebook from '../../../assets/signUp/facebook.png'
import twitter from '../../../assets/signUp/twitter.png'
import { connect } from 'react-redux'
import Alert from '../../components/alert/Alert';
import BlurOverlay, { closeOverlay, openOverlay } from 'react-native-blur-overlay';
import { bindActionCreators } from 'redux';
import { confirmationCode, verifyConfirmationCode, createUserPin } from '../../store/action/action'
// import Image from 'react-native-svg-uri';
import Image from 'react-native-remote-svg';
import Icons from '../../svgIcons/SvgIcons'
import { NavigationActions, StackActions } from 'react-navigation'


const labels = ["Phone", "Verify", "Pin"];

const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#ce3b33',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: 'lightgrey',
    stepStrokeUnFinishedColor: 'lightgrey',
    separatorFinishedColor: 'lightgrey',
    separatorUnFinishedColor: 'lightgrey',
    stepIndicatorFinishedColor: '#ffffff',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ce3b33',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: 'white',
    stepIndicatorLabelFinishedColor: 'lightgrey',
    stepIndicatorLabelUnFinishedColor: 'lightgrey',
    labelColor: 'lightgrey',
    labelSize: 13,
    currentStepLabelColor: 'black',
}

let test = ['material']


class SignUp extends Component {
    constructor() {
        super()

        this.state = {
            currentPosition: 0,
            countryName: 'Kenya',
            phoneCode: '254',
            cca2: 'KE',
            keys: [
                {
                    value: ['1', '2', '3']
                }, {
                    value: ['4', '5', '6']
                }, {
                    value: ['7', '8', '9']
                }, {
                    value: ['delete', '0', 'done']

                }
            ],
            codeInput: [1, 2, 3, 4, 5, 6],
            codePin: [1, 2, 3, 4],
            codes: [],
            createPin: [],
            confirmPin: [],
        }
    }


    componentWillReceiveProps(props) {
        const { userId, number } = props
        if (userId) {
            this.setState({ userId })
        }
        if (number) {
            this.setState({ number })
        }
    }

    onPressFlag() {
        this.countryPicker.openModal()
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

    //country selection
    selectCountry(country) {

        this.setState({
            cca2: country.cca2,
            countryName: country.name,
            phoneCode: country.callingCode
        })

    }

    //send verification code to user phone
    sendVerificationCode() {
        const { number, countryName, phoneCode, cca2 } = this.state
        const { confirmationCode } = this.props.actions

        if (number) {
            let msisdnNumber = number.indexOf('0') === 0 ? number.slice(1) : number
            var obj = {
                msisdnNumber: '+' + phoneCode + msisdnNumber,
            }

            //phone number verification
            confirmationCode(obj).then(() => {
                this.setState({ currentPosition: 1 })
            })
                .catch((err) => {
                    this.setState({ alert: true, title: 'ERROR', text: err, error: true })
                    openOverlay();
                })
        } else {
            openOverlay();
            this.setState({ alert: true, title: 'ALERT', text: 'Please enter your number', error: true })
        }

    }

    PhoneNumberPickerChanged(country, callingCode, phoneNumber) {
        this.setState({ countryName: country.name, callingCode: callingCode, phoneNo: phoneNumber });
    }

    //go to home screen
    goToHome() {

        const resetToHome = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
            ],
        });
        this.props.navigation.dispatch(resetToHome)

    }

    //registration screen
    phone() {
        const { countryName, phoneCode, number } = this.state
        return (
            <ScrollView>
                <KeyboardAvoidingView contentContainerStyle={{ alignItems: 'center' }} behavior={'padding'} enabled>
                    <View style={styles.text}>
                        <Text style={{ fontSize: 17, color: 'black' }}>
                            {'Register by Phone'}
                        </Text>
                    </View>
                    <View style={styles.text}>
                        <Text style={{ textAlign: 'center' }}>
                            {'Lorem ipsum simply a dummy text of typessting industry'}
                        </Text>
                    </View>
                    <View style={styles.inputField}>
                        <View style={styles.icon}>
                            <Image
                                source={Icons.marker}
                                style={{ width: 15.8, height: 19.6 }}
                            />
                        </View>
                        <View style={{ alignSelf: 'center', flexGrow: 1, paddingVertical: '5%' }}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => this.onPressFlag()} style={{ flexDirection: 'row' }}>
                                <View
                                    style={{ flexGrow: 1 }}
                                >
                                    <CountryPicker
                                        filterable={true}
                                        closeable={true}
                                        filterPlaceholder={'Search'}
                                        autoFocusFilter={true}
                                        ref={(ref) => { this.countryPicker = ref; }}
                                        onChange={(value) => this.selectCountry(value)}
                                        translation='eng'
                                        cca2={this.state.cca2}
                                    >
                                        <View style={{ alignItems: 'flex-start', paddingHorizontal: '4%' }}>
                                            <Text>
                                                {`${countryName}(+${phoneCode})`}
                                            </Text>
                                        </View>
                                    </CountryPicker>
                                </View>
                                <TouchableOpacity>
                                    <View style={{ alignSelf: 'center', paddingHorizontal: '5%', paddingTop: 10 }}>
                                        <Image
                                            source={Icons.caret}
                                            style={{ width: 13, height: 7 }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputField}>
                        <View style={styles.icon}>
                            <Image
                                source={Icons.phone}
                                style={{ width: 20, height: 19 }}
                            />
                        </View>
                        <View style={{ flexGrow: 1, alignSelf: 'center', paddingHorizontal: '2%' }}>
                            <TextInput
                                style={{ paddingVertical: '2%' }}
                                keyboardType={'numeric'}
                                value={number}
                                placeholder={'Mobile Number'}
                                onChangeText={(number) => this.setState({ number: number.replace(/[^0-9]/g, '') })}
                            />
                        </View>
                    </View>
                    <View style={styles.button}>
                        <Button
                            name={'REGISTER'}
                            bgColor={'#ce3b33'}
                            width={200}
                            color={'white'}
                            opacity={0.8}
                            clickAction={() => this.sendVerificationCode()}
                        />
                    </View>
                    <View style={{ alignItems: 'center', paddingVertical: '2%' }}>
                        <Text style={{ fontSize: 14 }}>
                            {'Continue with'}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <View>
                            <Image
                                source={google}
                            />
                        </View>
                        <View>
                            <Image
                                source={facebook}
                            />
                        </View>
                        <View>
                            <Image
                                source={twitter}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.goToHome()}>
                        <View style={{ alignItems: 'center', paddingVertical: '2%' }}>
                            <Text style={{ color: '#ce3b33' }}>
                                {'SKIP'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }

    resetPin(type) {
        const { createPin, confirmPin } = this.state

        createPin.splice(0)
        confirmPin.splice(0)
        this.setState({ createPin, confirmPin })

    }


    done(type) {
        const { createPin, confirmPin, verifyPin } = this.state


        if (type === 'createPin') {
            //check if user enter pin is correct or not
            var is_same = (createPin.length == confirmPin.length) && createPin.every(function (element, index) {
                return element === confirmPin[index];
            });

            if (is_same) {
                const { userId, number } = this.state
                const { createUserPin } = this.props.actions
                const pin = createPin.join().replace(/,/g, '')

                let obj = {
                    userId: userId,
                    pin,
                    number
                }

                createUserPin(obj).then((success) => {
                    openOverlay();
                    this.setState({ alert: true, title: 'SUCCESS', text: success, error: false })

                    setTimeout(() => {
                        // closeOverlay()
                        const { navigate } = this.props.navigation
                        navigate('LogIn')
                    }, 7000);
                })

            } else {
                //handle alert
                openOverlay();
                this.setState({ alert: true, title: 'WARNING', text: 'Pin not matched', error: true, createPin: [], confirmPin: [] })
            }
        }

    }

    verifyCode() {
        const { codes, userId } = this.state
        const { verifyConfirmationCode } = this.props.actions

        console.log(userId, 'userid')
        if (codes.length === 6 && userId) {
            let code = codes.join().replace(/,/g, '')
            let obj = {
                code,
                userId: userId.userId
            }
            verifyConfirmationCode(obj).then((success) => {

                openOverlay();
                this.setState({ currentPosition: 2, alert: true, title: 'SUCCESS', text: success, error: false })
                setTimeout(() => {
                    // closeOverlay()
                }, 3000);
            }).catch((err) => {

                openOverlay();
                this.setState({ alert: true, title: 'ERROR', text: err, error: true })

            })

        } else {

            openOverlay();
            this.setState({ alert: true, title: 'WARNING', text: 'Please enter correct code', error: true })

        }
    }

    keyBoardInput(key, type) {
        const { codes, createPin, confirmPin } = this.state

        //when the user is at verification screen
        if (type === 'verification') {

            if (codes.length < 6 && key !== 'done' && key !== 'delete') {
                codes.push(key)
            }
            if (key === 'delete') {
                codes.pop()
            }
            if (key === 'done') {
                this.verifyCode()
            }
            this.setState({ codes })

        }

        //when user create pin
        else if (type === 'createPin') {

            if (key !== 'done' && key !== 'delete') {
                if (createPin.length <= 3) {
                    createPin.push(key)
                } else {
                    if (confirmPin.length <= 3) {
                        confirmPin.push(key)
                    }
                }
            }
            if (key === 'delete') {
                if (confirmPin.length) {
                    confirmPin.pop()
                } else {
                    createPin.pop()
                }
            }
            if (key === 'done') {
                if (confirmPin.length === 4) {
                    this.done(type)
                }
            }
            this.setState({ createPin, confirmPin })

        }

    }

    //custom keyboard
    keyBoard(key, index, type) {
        const { confirmPin, createPin } = this.state
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
                        key === 'done' ?
                            type !== 'verification' ?
                                confirmPin.length === 4 ?
                                    <View style={styles.keys_done}>
                                        <Image
                                            source={Icons.check}
                                            style={{ width: 23, height: 18 }}
                                        />
                                    </View>
                                    :
                                    <View style={styles.keys}>
                                        <Image
                                            source={Icons.checkDisable}
                                            style={{ width: 22, height: 18 }}
                                        />
                                    </View>
                                :
                                <View style={styles.keys_done}>
                                    <Image
                                        source={Icons.check}
                                        style={{ width: 23, height: 18 }}
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
            <View key={code + index} style={{ borderBottomWidth: 2, borderBottomColor: 'lightgrey', width: 45, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ce3b33' }}>
                    {codes && codes[index]}
                </Text>
            </View>
        )
    }

    //verify phone number screen
    verify() {
        const { keys, codeInput } = this.state
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={styles.text}>
                    <Text style={{ fontSize: 17, color: 'black' }}>
                        {'Verification Code'}
                    </Text>
                </View>
                <View style={styles.text}>
                    <Text style={{ textAlign: 'center' }}>
                        {'A text message with code was sent to your phone, please enter it below.'}
                    </Text>
                </View>
                <View style={{
                    width: '100%',
                    // borderWidth: 1,
                    alignItems: 'center',
                    paddingHorizontal: '10%',
                    justifyContent: 'space-between',
                    paddingVertical: '1%',
                    flexDirection: 'row',

                }}>
                    {
                        codeInput &&
                        codeInput.map((code, index) => {
                            return (
                                this.codeInput(code, index)
                            )
                        })
                    }
                </View>
                <View style={[{ flexDirection: 'row', paddingHorizontal: '12%' }]}>
                    <Text style={{ textAlign: 'center' }}>
                        <Text onPress={() => this.resendCode()} style={{ color: '#ce3b33', textAlign: 'center' }}>
                            {'CLICK HERE '}
                        </Text>
                        {`to resend the code if you don't get it in 3 minutes`}
                    </Text>
                </View>
                <View style={styles.verification}>
                    <Text style={{ textAlign: 'center', color: '#49a12f' }}>
                        Secure keyboard is active
                    </Text>
                </View>
                {
                    keys &&
                    keys.map((items, index) => {
                        return (
                            <View key={index} style={[styles.keyBoard, { paddingVertical: '1.3%' }]}>
                                {
                                    items.value.map((key, index) => {
                                        return (
                                            this.keyBoard(key, index, 'verification')
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
                <TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#ce3b33' }}>
                            {'SKIP'}
                        </Text>
                    </View>
                </TouchableOpacity>

            </View >
        )
    }

    //create pin screen
    createPin() {
        const { codePin, keys, createPin, confirmPin } = this.state
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={styles.text}>
                    <Text style={{ fontSize: 17, color: 'black' }}>
                        {'Create your PIN-code'}
                    </Text>
                </View>
                <View style={styles.text}>
                    <View style={styles.create_pin}>
                        {
                            codePin &&
                            codePin.map((code, index) => {
                                return (
                                    index < createPin.length ?
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
                <View style={styles.text}>
                    <Text style={{ fontSize: 17, color: 'black' }}>
                        {'Confirm your PIN-code'}
                    </Text>
                </View>
                <View style={styles.text}>
                    <View style={styles.create_pin}>
                        {
                            codePin &&
                            codePin.map((code, index) => {
                                return (
                                    index < confirmPin.length ?
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
                <View style={[styles.verification, { paddingVertical: '3%' }]}>
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
                                            this.keyBoard(key, index, 'createPin')
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
                <TouchableOpacity onPress={() => this.resetPin('createPin')}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#ce3b33' }}>
                            {'RESET'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    //enter pin screen
    enterPin() {
        const { codePin, keys, verifyPin } = this.state
        return (
            <View style={{ alignItems: 'center' }}>
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
                <View style={[styles.verification, { paddingTop: '13%' }]}>
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
                <TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#ce3b33' }}>
                            {'FORGOT PIN?'}
                        </Text>
                    </View>
                </TouchableOpacity>
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
        const { currentPosition, alert } = this.state
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
                    <View style={styles.indicator}>
                        <StepIndicator
                            stepCount={3}
                            customStyles={customStyles}
                            currentPosition={currentPosition}
                            labels={labels}
                        />
                    </View>
                </View>
                <View style={{ width: '100%', flexGrow: 1 }}>
                    {
                        currentPosition === 0 &&
                        this.phone()
                    }
                    {
                        currentPosition === 1 &&
                        this.verify()
                    }
                    {
                        currentPosition === 2 &&
                        this.createPin()
                    }
                </View>
                {
                    alert &&
                    <BlurOverlay
                        radius={14}
                        downsampling={1}
                        brightness={-100}
                        // onPress={() => {
                        //     closeOverlay();
                        // }}
                        customStyles={{ alignItems: 'center', justifyContent: 'center' }}
                        blurStyle="dark"
                        children={this.renderBlurChilds()}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    create_pin: {
        width: '100%',
        // borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '25%',
        flexWrap: 'wrap',
        paddingVertical: '2%'
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
        backgroundColor: '#ce3b33'
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
        paddingVertical: '2%'
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
        justifyContent: 'center'
    },
    header: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: '1%',
        marginTop: 2
    },
    indicator: {
        width: '100%',
        paddingVertical: '3%'
    },
    text: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: '1%',
        paddingHorizontal: 40
    },
    icon: {
        alignItems: 'center',
        alignSelf: 'center',
        width: 40,
        height: 40,
        paddingVertical: '3%'
    },
    inputField: {
        width: '90%',
        flexDirection: 'row',
        marginVertical: '3%',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
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
        number: state.authreducer.USER_NUMBER,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            confirmationCode, verifyConfirmationCode, createUserPin
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
