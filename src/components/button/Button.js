import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


//custom button component
class Button extends Component {

    render() {
        //button props
        const { bgColor, width, name, color, opacity, clickAction } = this.props
        return (
            <TouchableOpacity onPress={() => clickAction()} activeOpacity={opacity}>
                <View style={{
                    backgroundColor: bgColor,
                    alignItems: 'center',
                    paddingVertical: 15,
                    width: width,
                    borderRadius: 50
                }}>
                    <Text style={{ color: color }}>
                        {name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

});


export default Button