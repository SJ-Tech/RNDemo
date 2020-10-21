import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, FlatList, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import Color from '../../Themes/Color';
import Fonts from '../../Themes/Fonts';
import Video from 'react-native-video';
import Share from "react-native-share";
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import { getVideoList } from '../../ReduxStore/actions/VideoListAction';
let width = Dimensions.get('window').width;



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
            avatarSource: null
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
    }

    videoListItem = ({ item }) => {
        return (
            <View style={{ flex:1,marginHorizontal: 10, borderRadius: 10, overflow: 'hidden',backgroundColor: 'red', }}>
                {/* <Video
                    source={{
                        uri: item.video_url
                    }}
                    //  rate={1.0}
                    // volume={1.0}
                    resizeMode="cover"
                    //  isMuted={false}
                    //  shouldPlay={false}
                    //  isLooping = {false}
                    //  useNativeControls
                    paused

                    // ref={ref => {
                    //     this.player = ref;
                    // }}
                    // onEnd={() => { }}
                    style={{ height: 200 }}
                    // paused={this.state.paused}
                    // muted={this.state.muted}
                    // repeat={this.state.repeat}
                    controls
                /> */}


                <ImageBackground
                    source={{ uri: item.thumbnail_url }}
                    style={{
                        justifyContent: 'center',
                        height: 210,
                        width: "100%",
                    }}>
                    <TouchableOpacity activeOpacity={0.6}
                        onLongPress={() => {
                            const shareOptions = {
                                message: item.video_url
                            }
                            try {
                                const shareResponse = Share.open(shareOptions);
                                console.log(JSON.stringify(shareResponse));
                            } catch (error) {
                                console.log('Error---', error);
                            }
                        }}
                        onPress={() => this.props.navigation.navigate('VideoPlay')}
                        style={{ alignSelf: 'center', position: 'absolute', backgroundColor: 'rgba(0,0,0,0.7)', height: 50, width: 50, borderRadius: 25, justifyContent: 'center', }}>
                        <Image style={{ height: 18, width: 18, tintColor: 'white', alignSelf: 'center', justifyContent: 'center', }}
                            source={require('../../assets/play.png')} />
                    </TouchableOpacity>

                </ImageBackground>

                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'lightgray', borderRadius: 10, padding: 10, justifyContent: 'center', }}>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
                </View>

            </View>
        );
    }




    render() {
        return (
            <View style={styles.mainContainer}>
                {/* <SafeAreaView style={{ flex: 1, marginHorizontal: Fonts.px_10, marginVertical: Fonts.px_20, }}> */}

                <View style={{ backgroundColor: '#f2f3f4', height: 75, paddingHorizontal: 10, paddingTop: 20 }}>
                    <Text style={{ fontSize: 12 }}>{'TODAY'}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{'My Feed'}</Text>
                        <View style={{ backgroundColor: 'white', height: 28, width: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'gray' }}>
                            <TouchableOpacity
                                onPress={this.imagePicker}>
                                <Image
                                    source={this.state.avatarSource}
                                    style={{ width: 28, height: 28, borderRadius: 14, alignSelf: 'center', resizeMode: 'cover', alignSelf: 'center', }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ borderWidth: 0.5, borderColor: Color.GRAY_300 }}></View>

                <View style={{ flex: 1, }}>
                    <FlatList
                        style={{ marginTop: 10 }}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.props.videoList}
                        renderItem={this.videoListItem}
                        ItemSeparatorComponent={() => <View style={{ margin: Fonts.px_5 }} />}
                        ListFooterComponent={() => <View style={{ margin: Fonts.px_5 }} />}

                    />

                </View>




                {/* </SafeAreaView> */}
            </View>


        );
    }
}
const mapStateToProps = (state) => {
    return {
        videoList: state.video.videoList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        videoAction: () => {
            dispatch(getVideoList())
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(index);


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        backgroundVideo: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        mainContainer: {
            flex: 1,
            width: width,
            backgroundColor: Color.white
        },

    });


