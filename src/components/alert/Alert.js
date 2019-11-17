import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import check from '../../../assets/alert/check.png'
import alert from '../../../assets/alert/alert.png'
import Icons from '../../svgIcons/AlertIcons'
import Image from 'react-native-remote-svg';


//custom Alert component
class Alert extends Component {
    constructor() {
        super();

        this.state = {
            viewRef: null
        }

    }

    buttons(text, backgroundColor, multiple) {
        return (
            <TouchableOpacity onPress={() => this.props.action()} activeOpacity={0.8} style={{ flexGrow: 1 }}>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: '#ca3d2d',
                        borderRadius: 20,
                        paddingVertical: multiple ? '10%' : '6%',
                        flexGrow: 1,
                        backgroundColor: backgroundColor ? '#ca3d2d' : null,
                        alignItems: 'center',
                        marginHorizontal: 2

                    }}
                >
                    <Text style={{ color: backgroundColor ? '#ffffff' : '#ca3d2d' }}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity >

        )
    }

    render() {
        //Alert props
        const { title, text, error } = this.props
        return (
            <View style={styles.alert}>
                <View style={styles.header}>
                    <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: '500' }}>{title}</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.image}>
                        <View style={{
                            width: 60,
                            height: 60,
                            borderRadius: 50,
                            backgroundColor: error ? '#fff4f5' : '#f7fff5',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {
                                error ?
                                    <Image
                                        source={Icons.alert}
                                        style={{ width: 26, height: 22 }}
                                    />
                                    :
                                    <Image
                                        source={Icons.check}
                                        style={{ width: 26, height: 20 }}
                                    />
                            }
                        </View>
                    </View>
                    <View style={styles.textContent}>
                        <View style={{ alignItems: 'center', paddingHorizontal: '10%' }}>
                            <Text style={{ textAlign: 'center', fontSize: 14, color: '#525252' }}>
                                {text}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.buttons}>
                            {
                                this.buttons('CLOSE', false)
                            }
                            {/* {
                                this.buttons('ACCEPT', true, true)

                            } */}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    alert: {
        position: 'absolute',
        // bottom: '50%',
        width: '80%',
        overflow: 'hidden',
        borderRadius: 20
        // height: '100%'
    },
    header: {
        alignItems: 'center',
        paddingVertical: '7%',
        backgroundColor: '#ce3b33'
    },
    body: {
        paddingVertical: '7%',
        backgroundColor: '#ffffff'
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContent: {
        paddingVertical: '3%'
    },
    footer: {
        alignItems: 'center',
        paddingVertical: '3%'
    },
    buttons: {
        flexDirection: 'row',
        paddingHorizontal: '9%'
    }
});


export default Alert