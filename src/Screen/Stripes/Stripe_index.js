import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Color from '../../Themes/Color';
import Fonts from '../../Themes/Fonts';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

let width = Dimensions.get('window').width;

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selected: null,
      ti: [],
    };
  }

  async componentDidMount() {
    let response = await fetch(
      'https://5f16ad48a346a0001673929b.mockapi.io/api/mockdata/chemicals',
    );
    let resonseJson = await response.json();
    resonseJson = resonseJson.filter((item) => item.values.length > 0);
    let selected = [];
    let ti = [];
    resonseJson.map((item, i) => {
      selected[i] = new Array(item.values.length);
      ti[i] = '';
      item.values.map((item, j) => {
        selected[i][j] = false;
      });
    });
    this.setState({
      data: resonseJson,
      selected,
      ti,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}>
          <Text style={{ fontSize: Fonts.px_24,marginVertical:10,color:Color.black }}>{'Test Stripes'}</Text>
          {this.state.data.map((item, index) => {
            let selectedValue = null;
            this.state.selected[index].map((item, i) => {
              if (this.state.selected[index][i]) {
                selectedValue = i;
              }
            });
            return (
              <View
                style={{
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 45,
                  }}>
                  <View
                    style={{
                      width: 30,
                      borderColor: Color.gray,
                      borderTopLeftRadius: index == 0 ? 5 : 0,
                      borderTopRightRadius: index == 0 ? 5 : 0,
                      borderTopWidth: index == 0 ? 1 : 0,
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      marginLeft: 10,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginBottom: 5,
                      }}>{`${item.name} (${item.unit})`}</Text>
                    <TextInput
                      value={this.state.ti[index]}
                      onChangeText={(text) => {
                        let arr = this.state.ti;
                        arr[index] = text;
                        this.setState({
                          ti: arr,
                        });
                      }}
                      keyboardType={'decimal-pad'}
                      returnKeyType={'done'}
                      onSubmitEditing={(text) => {
                        const number = parseFloat(this.state.ti[index]);
                        if (number != NaN)
                          var closest = item.values.reduce(function (
                            prev,
                            curr,
                          ) {
                            return Math.abs(parseFloat(curr.value) - number) <
                              Math.abs(parseFloat(prev.value) - number)
                              ? curr
                              : prev;
                          });
                        if (!!closest)
                          item.values.map((itm, i) => {
                            if (closest.value == itm.value) {
                              let ar = this.state.ti;
                              ar[index] = itm.value;
                              let arr = this.state.selected;
                              arr.map((it, j) => {
                                arr[index][j] = false;
                              });
                              arr[index][i] = true;
                              this.setState({
                                selected: arr,
                                ti: ar,
                              });
                            }
                          });
                      }}
                      style={{
                        width: 80,
                        height: 35,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: Color.gray,
                        alignSelf: 'center',
                        textAlign: 'center',
                        marginBottom: 5,
                      }}></TextInput>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', height: 30 }}>
                  <View
                    style={{
                      width: 30,
                      borderColor: Color.gray,
                      borderTopWidth: 0,
                      borderTopWidth: 0,
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                      backgroundColor:
                        selectedValue != null
                          ? item.values[selectedValue].color
                          : undefined, //update
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 4,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    {!!item.values &&
                      item.values.length > 0 &&
                      item?.values.map((value, i) => (
                        <TouchableOpacity
                          onPress={() => {
                            let ar = this.state.ti;
                            ar[index] = value.value;

                            let arr = this.state.selected;
                            if (arr[index][i]) {
                              arr[index][i] = false;
                            } else {
                              arr.map((it, j) => {
                                arr[index][j] = false;
                              });
                              arr[index][i] = true;
                            }
                            this.setState({
                              selected: arr,
                              ti: ar,
                            });
                          }}
                          style={{
                            borderRadius: 5,
                            marginLeft: 6,
                            flex: 1,
                            height: 30,
                            borderWidth: this.state.selected[index][i] ? 2 : 0,
                            borderColor: this.state.selected[index][i]
                              ? 'green'
                              : undefined,
                            padding: 2,
                          }}>
                          <View
                            style={{
                              flex: 1,
                              borderRadius: 3,
                              backgroundColor: value.color,
                            }}></View>
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>
                <View style={{ flexDirection: 'row', height: 30 }}>
                  <View
                    style={{
                      width: 30,
                      borderColor: Color.gray,
                      borderTopWidth: 0,
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                      borderBottomLeftRadius:
                        index == this.state.data.length - 1 ? 5 : 0,
                      borderBottomRightRadius:
                        index == this.state.data.length - 1 ? 5 : 0,
                      borderBottomWidth:
                        index == this.state.data.length - 1 ? 1 : 0,
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    {!!item.values &&
                      item.values.length > 0 &&
                      item?.values.map((value) => (
                        <Text
                          style={{
                            alignSelf: 'center',
                            textAlign: 'center',
                            flex: 1,
                          }}>
                          {value.value}
                        </Text>
                      ))}
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
