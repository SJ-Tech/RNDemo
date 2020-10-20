import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Color from '../../Themes/Color';
import Fonts from '../../Themes/Fonts';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

let width = Dimensions.get('window').width;

export default class index extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },

});
