import R from '@components/utils/R';
import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';

function AuthBoiler(props) {
  const {children} = props;

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: R.color.blackLightShade}}
      />
      <SafeAreaView style={styles.background}>
        <StatusBar barStyle={'light-content'} />

        {children}
      </SafeAreaView>
    </>
  );
}

export default AuthBoiler;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: R.unit.width(1),
    alignItems: 'center',
    backgroundColor: R.color.blackLightShade,
  },
});
