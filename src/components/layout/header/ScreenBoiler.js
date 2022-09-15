import R from '@components/utils/R';
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  SafeAreaView,
} from 'react-native';
import SubHeaderComponent from '../subHeader';

const width = Dimensions.get('window').width;

export default function ScreenBoiler(props) {
  const {navigation, children, headerProps} = props;
  const {isSubHeader} = headerProps;

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        style={{flex: 0, backgroundColor: 'green'}}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : ' light-content'}
      />

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
    width: width,
    backgroundColor: R.color.lightSilverShade2,
    alignItems: 'center',
  },
});
