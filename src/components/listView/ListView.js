import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icons from '../../svgIcons/HomeIcons'
import Image from 'react-native-remote-svg';


class ListView extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        const { title, width, height, iconName } = this.props
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                marginVertical: '1%'
            }}>
                <TouchableOpacity style={{
                    width: '80%',
                    borderWidth: 1,
                    borderColor: '#f2f2f2',
                    borderRadius: 20,
                    paddingVertical: '4%'
                }}>
                    <View style={{ paddingHorizontal: '5%', alignItems: 'center', width: '80%', flexDirection: 'row' }}>
                        <View style={{ width: '15%', alignItems: 'center' }}>
                            <Image
                                source={Icons[iconName]}
                                style={{ width, height }}
                            />
                        </View>
                        <View style={{ paddingLeft: '8%' }}>
                            <Text style={{ color: '#24253d', fontSize: 15 }}>
                                {title}
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


export default connect(mapStateToProps, mapDispatchToProps)(ListView);

