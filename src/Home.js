import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {BackHandler, View, StatusBar, StyleSheet} from 'react-native';
export default function Home() {
  let wv;
  let flag;
  let url;
  const handleAndroidBack = () => {
    const reg = /#(\/|\/info|\/search|\/user)$/;
    if (reg.test(url)) {
      return;
    }
    if (flag && wv) {
      wv.goBack();
      return true;
    }
    return false;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleAndroidBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleAndroidBack);
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="rgba(59, 152, 248, 0.9)"
        barStyle="dark-content"
      />
      <WebView
        onNavigationStateChange={(state) => {
          url = state.url;
          flag = state.canGoBack;
        }}
        ref={(webView) => {
          wv = webView;
        }}
        source={{
          uri: 'http://120.79.136.0:8060/',
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
