import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icons from '../../svgIcons/HomeIcons'
import Image from 'react-native-remote-svg';


class GridView extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{
                    width: '50%',
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#f2f2f2',
                    paddingVertical: '7%'
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ paddingBottom: '7%' }}>
                            <Image
                                source={Icons.airtime}
                                style={{ width: 32, height: 42 }}
                            />
                        </View>
                        <View>
                            <Text style={{ color: '#24253d', fontSize: 13 }}>
                                {'Airtime'}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '50%',
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderBottomWidth: 1,
                    borderLeftWidth: 1,
                    borderBottomColor: '#f2f2f2',
                    borderLeftColor: '#f2f2f2',
                    paddingVertical: '7%'
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ paddingBottom: '7%' }}>
                            <Image
                                source={Icons.referal}
                                style={{ width: 47, height: 42 }}
                            />
                        </View>
                        <View>
                            <Text style={{ color: '#24253d', fontSize: 13 }}>
                                {'Business Referral'}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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


export default connect(mapStateToProps, mapDispatchToProps)(GridView);

