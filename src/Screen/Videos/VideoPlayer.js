import React, {Component} from 'react';
import Video from 'react-native-video';
import {Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import Share from 'react-native-share';

const {width} = Dimensions.get('window');
const mediaWidth = width - 20;
const mediaHeight = (mediaWidth * 9) / 16;

class VideoPlayer extends Component {
  state = {videoPlay: false};

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={() => this.setState({videoPlay: !this.state.videoPlay})}
        onLongPress={() => {
          const shareOptions = {
            message: this.props.source,
          };
          try {
            const shareResponse = Share.open(shareOptions);
            console.log(JSON.stringify(shareResponse));
          } catch (error) {
            console.log('Error---', error);
          }
        }}>
        <Video
          style={styles.container}
          resizeMode={'cover'}
          source={{
            uri: this.props.source,
          }}
          paused={!this.state.videoPlay}
          repeat={false}
        />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: mediaWidth,
    height: mediaHeight,
  },
});

export default VideoPlayer;
