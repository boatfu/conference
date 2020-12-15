import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {BackHandler, View, StatusBar, StyleSheet, Text} from 'react-native';
import {baseURL} from './config';
import Scanner from './Scanner';

export default function Home({route, navigation}) {
  const handleAndroidBack = () => {
    setCanScan(false);
    setUri(baseURL);
    const reg = /#(\/|\/info|\/search|\/user)$/;
    if (reg.test(url)) {
      return true;
    }
    if (flag && wv) {
      wv.goBack();
      return true;
    }
    return true;
  };

  const handleMessage = (e) => {
    const {info} = JSON.parse(e.nativeEvent.data);
    if (info === 'scan') {
      setCanScan(true);
    }
  };

  const handleCodeRead = (e) => {
    if (
      (e.data.indexOf('http') !== -1 || e.data.indexOf('https') !== -1) &&
      e.data.match(baseURL)
    ) {
      setUri(e.data);
      setCanScan(false);
    }
  };

  const [canScan, setCanScan] = useState(false);
  const [uri, setUri] = useState(baseURL);

  useEffect(() => {
    let wv = null;
    let url = '';
    let flag = false;
    console.log('start');
  }, []);
  useEffect(() => {
    navigation.addListener('focus', () => {
      console.log('focus');
      BackHandler.addEventListener('hardwareBackPress', handleAndroidBack);
    });
    navigation.addListener('blur', () => {
      console.log('blur');
      BackHandler.removeEventListener('hardwareBackPress', handleAndroidBack);
    });
  }, [navigation]);
  if (canScan) {
    return <Scanner onCodeRead={handleCodeRead} />;
  }
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="rgba(59, 152, 248, 0.9)"
        barStyle="dark-content"
      />
      <WebView
        onMessage={handleMessage}
        onNavigationStateChange={(state) => {
          url = state.url;
          flag = state.canGoBack;
        }}
        ref={(webView) => {
          wv = webView;
        }}
        source={{
          uri: uri,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
