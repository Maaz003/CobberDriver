import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import {MasterCardIcon} from '@components/utils/Svg';

function SelectedPaymentMethod(props) {
  const {onPress} = props;
  return (
    <TouchableOpacity
      style={[R.styles.rowView, styles.paymentView]}
      onPress={onPress}
      activeOpacity={0.6}>
      <View style={[R.styles.twoItemsRow, styles.leftView]}>
        <View style={styles.svgView}>
          <MasterCardIcon height="100%" width="100%" />
        </View>
        <View>
          <Text
            variant={'body2'}
            font={'bold'}
            color={R.color.black}
            style={{marginLeft: 20}}
            align={'left'}
            transform={'none'}>
            MasterCard
          </Text>
          <View style={[R.styles.twoItemsRow, styles.cardRow]}>
            <Text
              variant={'body3'}
              font={'bold'}
              gutterTop={4}
              color={R.color.lightGray}
              align={'left'}
              transform={'none'}>
              ****{' '}
            </Text>
            <Text
              variant={'body3'}
              font={'bold'}
              color={R.color.lightGray}
              align={'left'}
              transform={'none'}>
              1234
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Icon name={'keyboard-arrow-right'} type={'MaterialIcons'} size={35} />
      </View>
    </TouchableOpacity>
  );
}
export default SelectedPaymentMethod;

const styles = StyleSheet.create({
  cardRow: {
    paddingHorizontal: 0,
    marginLeft: R.unit.scale(20),
  },
  paymentView: {
    width: '100%',
    paddingVertical: R.unit.scale(5),
  },
  leftView: {
    flex: 1,
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(50),
  },
});
