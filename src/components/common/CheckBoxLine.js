import React from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import CheckBox from './CheckBox';
import Text from './Text';

const CheckBoxLine = props => {
  const {
    text,
    onPress,
    containerStyles,
    selected,
    textColor = R.color.black,
  } = props;
  return (
    <View style={[R.styles.twoItemsRow, styles.policyView, containerStyles]}>
      <CheckBox onPress={onPress} id={'abcd'} alreadySelected={selected} />
      <View
        style={{
          flexDirection: 'row',
          marginLeft: R.unit.scale(12),
          flex: 1,
        }}>
        <Text
          variant={'body2'}
          font={'InterRegular'}
          color={textColor}
          align={'left'}
          transform={'none'}>
          {text}
        </Text>
      </View>
    </View>
  );
};
export default CheckBoxLine;
const styles = StyleSheet.create({
  policyView: {
    marginTop: R.unit.scale(8),
  },
});
