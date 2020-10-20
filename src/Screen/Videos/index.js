import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Dimensions, ImageBackground, FlatList, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import Color from '../../Themes/Color';
import Fonts from '../../Themes/Fonts';
import Video from 'react-native-video';
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
        //  path: 'images',
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

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    videoListItem = ({ item }) => {
        return (
            <View style={{backgroundColor: 'gray',marginHorizontal: 10, }}>

              
                    <Video
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
                         style={{height:200}}
                        // paused={this.state.paused}
                        // muted={this.state.muted}
                        // repeat={this.state.repeat}
                        controls={false}
                    />
                    
        
                <View style={{ height: 60, position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'lightgray', borderRadius: 10, padding: 10, }}>
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
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{'My Feed'}</Text>
                        <View style={{ backgroundColor: 'white', height: 28, width: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'gray' }}>
                            <TouchableOpacity
                                onPress={this.imagePicker}>
                                <Image
                                    source={this?.state?.avatarSource}
                                    style={{ width: 28, height: 28, borderRadius: 14, alignSelf: 'center', resizeMode: 'cover', }}
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


