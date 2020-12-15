import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, BackHandler} from 'react-native';
import {QRScannerRectView} from 'react-native-qrcode-scanner-view';
import {RNCamera} from 'react-native-camera';
import {baseURL} from './config';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   props.navigation.navigate('Home');
    //   return true;
    // });
  }
  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress');
  // }

  throttle = (func) => {
    let flag = true;
    return (args) => {
      if (flag) {
        func.call(this, args);
        flag = false;
        setTimeout(() => {
          flag = true;
        }, 1000);
      } else {
        return;
      }
    };
  };

  // barcodeReceived = (event) => {
  //   if (
  //     (event.data.indexOf('http') !== -1 ||
  //       event.data.indexOf('https') !== -1) &&
  //     event.data.match(baseURL)
  //   ) {
  //     const {navigation} = this.props;
  //     this.props.route.params.remember.uri = event.data;
  //     const remember = this.props.route.params.remember;
  //     navigation.navigate('Home', {
  //       remember: remember,
  //     });
  //   }
  // };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <RNCamera
          style={styles.preview}
          onBarCodeRead={this.throttle(this.props.onCodeRead.bind(this))}
          // renderFooterView={this.renderMenu}
          captureAudio={false}
          scanBarAnimateReverse>
          <QRScannerRectView />
        </RNCamera>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    textAlign: 'center',
  },
  preview: {
    flex: 1,
  },
});
