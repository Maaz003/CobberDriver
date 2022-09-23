import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';

function RippleButton(props) {
  const {navigation} = props;

  return (
    <View style={{backgroundColor: 'green', padding: 30}}>
      <TouchableNativeFeedback
        delayPressIn={0.1}
        delayPressOut={0.1}
        delayLongPress={0.1}
        background={TouchableNativeFeedback.Ripple('#42700b', true, 300)}
        style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}
        // onPress={}
      >
        <View
          style={{
            backgroundColor: 'red',
            padding: R.unit.scale(20),
            borderRadius: R.unit.scale(100),
          }}>
          <Icon
            name={'arrowright'}
            type={'AntDesign'}
            size={20}
            color={R.color.white}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
export default RippleButton;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.black,
    paddingTop: R.unit.scale(50),
  },
  formView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  footerImage: {
    marginTop: R.unit.scale(50),
    width: '100%',
  },
  forgetPassView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  countryFlag: {
    width: R.unit.scale(100),
    borderRadius: R.unit.scale(100),
    borderColor: R.color.white,
    borderWidth: R.unit.scale(1),
    paddingHorizontal: R.unit.scale(10),
    paddingVertical: R.unit.scale(12),
  },
  phoneNumberField: {
    flex: 1,
    paddingLeft: R.unit.scale(10),
  },
});
