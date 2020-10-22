import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import Color from '../../Themes/Color';
import Fonts from '../../Themes/Fonts';
import Video from 'react-native-video';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import { getVideoList } from '../../ReduxStore/actions/VideoListAction';
let width = Dimensions.get('window').width;
import VideoPlayer from './VideoPlayer';

const options = {
  title: 'Select profile image',
  takePhotoButtonTitle: 'Take Photo...',
  chooseFromLibraryButtonTitle: 'Choose from Library...',
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class index extends Component {
  constructor() {
    super();
    this.state = {
      avatarSource: null,
    };
  }

  componentDidMount() {
    this.props.videoAction();
  }

  imagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          avatarSource: source,
        });
      }
    });
  };

 

  videoListItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          borderRadius: 10,
          overflow: 'hidden',
        }}>

        <ImageBackground
          source={{ uri: item.thumbnail_url }}
          style={{
            justifyContent: 'center',
            height: 210,
            width: '100%',
          }}>
          <VideoPlayer
            source={item.video_url}
            style={{ height: 200, width: '100%' }}
          />
        </ImageBackground>
      </View>
    );
  };

  onRefresh() {
    this.props.videoAction();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View
          style={{
            backgroundColor: '#f2f3f4',
            height: 75,
            paddingHorizontal: 10,
            paddingTop: 20,
          }}>
          <Text style={{ fontSize: Fonts.px_12 }}>{'TODAY'}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: Fonts.px_24, fontWeight: 'bold' }}>{'My Feed'}</Text>
            <View
              style={{
                backgroundColor: 'white',
                height: 28,
                width: 28,
                borderRadius: 14,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'gray',
              }}>
              <TouchableOpacity onPress={this.imagePicker}>
                <Image
                  source={this.state.avatarSource}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    alignSelf: 'center',
                    resizeMode: 'cover',
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ borderWidth: 0.5, borderColor: Color.GRAY_300 }}></View>

        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 10 }}
            onRefresh={() => this.onRefresh()}
            refreshing={this.props.videoList.loading}
            showsVerticalScrollIndicator={false}
            keyExtractor={(index) => index.toString()}
            data={this.props.videoList.videoList}
            renderItem={this.videoListItem}
            ItemSeparatorComponent={() => <View style={{ margin: Fonts.px_5 }} />}
            ListFooterComponent={() => <View style={{ margin: Fonts.px_5 }} />}
            onEndReached={() => this.props.videoAction()}
            onEndReachedThreshold={0.01}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    videoList: state.video
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    videoAction: () => {
      dispatch(getVideoList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    width: width,
    backgroundColor: Color.white,
  },
});
