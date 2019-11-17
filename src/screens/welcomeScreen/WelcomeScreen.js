import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Button from '../../components/button/Button';
import icon from '../../../assets/welcomeScreen/avunja-source.png'
import welcome_1 from '../../../assets/welcomeScreen/join-register.png'
import welcome_2 from '../../../assets/welcomeScreen/products-services.png'
import welcome_3 from '../../../assets/welcomeScreen/get-paid.png'
import Image from 'react-native-remote-svg';
import Icons from '../../svgIcons/SvgIcons'
import { NavigationActions, StackActions } from 'react-navigation'



class WelcomeScreen extends Component {
    constructor() {
        super()

        this.state = {
            //welcome screen
            slider: [
                {
                    icon: welcome_1,
                    title: 'START EARNING TODAY',
                    text: 'Join',
                    description: 'Want to be part of the thriving family of Avunja Sales Agents? Join our team today to start earning extra cash! All you need is a smartphone',
                    screen: '01'
                },
                {
                    icon: welcome_2,
                    text: 'Product & Services',
                    description: 'This is a good opportunity to earn an extra income, using your existing social network. Selling our products and services, any time, anywhere How does it work? Link to page',
                    screen: '02'
                },
                {
                    icon: welcome_3,
                    text: 'Get Paid',
                    description: 'This is a commission based opportunity, no base salary is given, how much you earn depends on your ability to sell and commissions you receive per product you sell. Basically no sales no income, the more you sell the more you earn.',
                    screen: '03'
                }
            ],
            //welcome screen current page
            page: '01'
        }
    }

    //customize slider dots
    customDot() {
        const { page } = this.state
        return (
            <View style={{ paddingBottom: '20%' }}>
                <View>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 12,
                        color: '#272727'
                    }}>
                        {page}
                    </Text>
                </View>
                <View>
                    <View style={{
                        borderLeftWidth: 1,
                        borderLeftColor: 'red',
                        alignSelf: 'center',
                        height: 7,
                        marginBottom: 3
                    }} />
                </View>
                <View>
                    <View style={{
                        width: 8,
                        height: 8,
                        alignSelf: 'center',
                        borderRadius: 50,
                        backgroundColor: '#ce3b33'
                    }} />
                </View>
            </View>
        )
    }

    skip() {
        const { navigate } = this.props.navigation
        const resetToLogin = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'SignUp' }),
            ],
        });
        this.props.navigation.dispatch(resetToLogin)
    }

    slider(items, index) {
        const { page } = this.state
        return (
            <View key={index} style={styles.slide1}>
                <View style={styles.icon}>
                    <Image
                        source={Icons.appIcon}
                        style={{ width: 133, height: 56 }}
                    />
                </View>
                <View style={{ flexGrow: 1 }}>
                    <Image
                        source={items.icon}
                    />
                </View>
                <View style={{ flexGrow: 1 }}>
                    {
                        items.title ?
                            <View>
                                <Text style={{ color: '#303030', fontSize: 20, fontWeight: '500', fontStyle: 'normal' }}>
                                    {items.title}
                                </Text>
                            </View>
                            :
                            null
                    }
                    <View>
                        <Text style={{ color: '#303030', fontSize: 19, textAlign: 'center', fontWeight: '500', fontStyle: 'normal' }}>
                            {items.text}
                        </Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: '15%', flexGrow: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'normal', opacity: 0.8, textAlign: 'center', color: '#272727' }}>
                        {items.description}
                    </Text>
                </View>
                <View style={{ paddingVertical: '10%' }} />
                <View style={{ flexGrow: 1 }}>
                    {
                        page === '03' ?
                            <Button
                                name={'START'}
                                bgColor={'#ce3b33'}
                                width={200}
                                color={'white'}
                                opacity={0.8}
                                clickAction={() => this.skip()}
                            />
                            :
                            <Button
                                name={'SKIP'}
                                bgColor={'#ce3b33'}
                                width={200}
                                color={'white'}
                                opacity={0.8}
                                clickAction={() => this.skip()}
                            />
                    }
                </View>
            </View>
        )
    }

    swipeIndex(index) {
        console.log(index, 'index here')
        if (index === 1) {
            this.setState({ page: '02' })
        }
        else if (index === 2) {
            this.setState({ page: '03' })
        }
        else {
            this.setState({ page: '01' })
        }
    }

    render() {
        const { slider } = this.state
        return (
            //swiper library used for introduction screen
            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                loop={false}
                dotStyle={{
                    marginBottom: '13.5%'
                }}
                onIndexChanged={(index) => this.swipeIndex(index)}
                activeDotColor={'red'}
                activeDot={this.customDot()}
            >
                {
                    //first intro screen 
                }
                {
                    slider &&
                    slider.map((items, index) => {
                        return (
                            this.slider(items, index)
                        )
                    })
                }
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    wrapper: {
    },
    slide1: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});


export default WelcomeScreen