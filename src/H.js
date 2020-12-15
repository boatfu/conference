import React, {Component} from 'react';
import {baseURL} from './config';
import {WebView} from 'react-native-webview';
import {BackHandler, View, StatusBar, StyleSheet} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWeb: true,
    };
    this.flag = false;
    this.wv = null;
    this.uri = baseURL;
    const navigation = props.navigation;
    navigation.addListener('focus', () => {
      console.log('focus');
      BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBack);
      const {route} = this.props;
      console.log(111, route.params);
      if (route && route.params && route.params.uri) {
        console.log('收到二维码', route.params.uri);
        this.uri = route.params.uri;
        route.params.uri = '';
      }
      //   if (route && route.params && route.params.isBack) {
      //     route.params.isBack = false;
      //   }
      this.setState({
        showWeb: true,
      });
    });
    navigation.addListener('blur', () => {
      console.log('blur');
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleAndroidBack,
      );
    });
  }
  handleAndroidBack = () => {
    const reg = /#(\/|\/info|\/search|\/user)$/;
    if (reg.test(this.uri)) {
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
      this.setState({
        showWeb: false,
      });

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
        {this.state.showWeb && (
          <WebView
            onMessage={this.handleMessage}
            onNavigationStateChange={(state) => {
              this.uri = state.url;

              this.flag = state.canGoBack;
            }}
            ref={(webView) => {
              this.wv = webView;
            }}
            source={{
              uri: this.uri,
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
