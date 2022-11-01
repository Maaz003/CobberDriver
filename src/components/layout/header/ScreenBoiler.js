import R from '@components/utils/R';
import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import SubHeaderComponent from '../subHeader';
import Header from './Header';

export default function ScreenBoiler(props) {
  const {navigation, children, headerProps, backPress} = props;
  const {isSubHeader, isMainHeader} = headerProps;

  return (
    <SafeAreaView
      style={{
        ...styles.background,
        backgroundColor: isMainHeader
          ? R.color.white
          : R.color.lightSilverShade2,
      }}>
      <StatusBar
        style={{flex: 0, backgroundColor: 'green'}}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : ' light-content'}
      />
      {isMainHeader && <Header backPress={backPress} />}

      {isSubHeader && (
        <SubHeaderComponent navigation={navigation} headerProps={headerProps} />
      )}
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: R.unit.width(1),
    alignItems: 'center',
  },
});
