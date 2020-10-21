import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import Color from '../../Themes/Color';
import Fonts from '../../Themes/Fonts';
import Video from 'react-native-video';
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
                {/* <Video style={styles.backgroundVideo}
                    fullscreenOrientation="all"
                    onBuffer={this.onBuffer}   // Callback function
                    onError={this.videoError}
                    source={{ uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'}}
                    resizeMode="contain"
                    rate={1}
                    volume={1}
                    muted={false}
                    ignoreSilentSwitch={null}
                    fullscreen={true}
                    // onLoad={(data) => { Alert.alert(' onLoad!') }}
                    //onBuffer={() => { Alert.alert(onBuffer!') }}
                    // onProgress={() => { Alert.alert('onProgress!') }}
                    // onEnd={() => { Alert.alert('onEnd!') }}
                    repeat={false}
                    controls={true}
                /> */}
                <Video style={{ flex: 1 }}
                    source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg' }}
                    controls
                    muted
                />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

});