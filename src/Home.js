import React, {Component} from 'react';
import {baseURL} from './config';
import {WebView} from 'react-native-webview';
import {BackHandler, View, StatusBar, StyleSheet} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: baseURL,
    };
    this.flag = false;
    this.wv = null;
    const navigation = props.navigation;
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBack);
      const {route} = this.props;
      if (route && route.params && route.params.uri) {
        this.setState({
          uri: route.params.uri,
        });
        route.params.uri = '';
      }
    });
    navigation.addListener('blur', () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleAndroidBack,
      );
    });
  }
  handleAndroidBack = () => {
    const reg = /#(\/|\/info|\/search|\/user)$/;
    if (reg.test(this.state.uri)) {
      return true;
    }
    if (this.flag && this.wv) {
      this.wv.goBack();
      return true;
    }
    return true;
  };

  handleMessage = (e) => {
    const {info} = JSON.parse(e.nativeEvent.data);
    if (info === 'scan') {
      this.props.navigation.navigate('Scanner');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="rgba(59, 152, 248, 0.9)"
          barStyle="dark-content"
        />
        <WebView
          onMessage={this.handleMessage}
          onNavigationStateChange={(state) => {
            this.state.uri = state.url;
            this.flag = state.canGoBack;
          }}
          originWhitelist={['*']}
          ref={(webView) => {
            this.wv = webView;
          }}
          source={{
            uri: this.state.uri,
            // uri: "http://baidu.com"
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
