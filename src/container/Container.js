import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
// import { auth } from '../../store/action/action'
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements'
import Image from 'react-native-remote-svg';
import Icons from '../svgIcons/HeaderIcon'
import menu from '../../assets/Home/menu.png'


class Container extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    rightComponent() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => console.log('bell press')} style={{
                    paddingHorizontal: '13%'
                }}>
                    <View>
                        <Image
                            source={Icons.bell}
                            style={{ width: 24, height: 24 }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    paddingHorizontal: '13%'
                }}>
                    <View>
                        <Image
                            source={Icons.cart}
                            style={{ width: 24, height: 24 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    leftComponent() {
        return (
            <View>
                <TouchableOpacity style={{
                    paddingHorizontal: '10%'
                }}>
                    <View>
                        <Image
                            source={Icons.menu}
                            style={{ width: 23, height: 17 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { children } = this.props
        return (
            <View style={styles.container}>
                <Header
                    placement="center"
                    leftComponent={() => this.leftComponent()}
                    centerComponent={{ text: 'Home', style: { color: '#24253d', fontSize: 20 } }}
                    rightComponent={() => this.rightComponent()}
                    containerStyle={{ backgroundColor: '#ffffff', paddingBottom: '3%', borderBottomColor: '#e0e0e0' }}
                />
                <View style={{ flex: 1, width: '100%' }}>
                    {
                        children
                    }
                </View>
                <View style={styles.footer}>
                    <View style={{
                        flexGrow: 1
                    }}>
                        <TouchableOpacity>
                            <Image
                                source={Icons.menuWhite}
                                style={{ width: 23, height: 17 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: '6%', position: 'relative', flexDirection: 'row' }}>
                        <View>
                            <Image
                                source={Icons.wallet}
                                style={{ width: 25, height: 23 }}
                            />
                        </View>
                        <View style={{ position: 'absolute', top: 0, right: '40%' }}>
                            <Image
                                source={Icons.error}
                                style={{ width: 16, height: 16 }}
                            />
                        </View>
                    </View>
                    <View>
                        <Image
                            source={Icons.search}
                            style={{ width: 25, height: 25 }}
                        />
                    </View>

                    <View style={{ position: 'absolute', top: -45, right: '42%' }}>
                        {/* <Image
                            source={menu}
                        /> */}
                        <View style={{
                            width: 90, height: 90, borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 10, borderColor: '#ffffff', backgroundColor: '#ce3b33'
                        }}>
                            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                                <Image
                                    source={Icons.nounPay}
                                    style={{ width: 36, height: 26 }}
                                />
                            </View>
                        </View>
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
        backgroundColor: '#ffffff',
    },
    footer: {
        width: '100%',
        borderWidth: 1,
        backgroundColor: '#000000',
        flexDirection: 'row',
        paddingHorizontal: '6%',
        paddingVertical: '6%',
        position: 'relative'
    }
});



function mapStateToProps(state) {
    return ({
        name: state.authreducer.TEST,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            // auth
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Container);

