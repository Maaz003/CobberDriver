import React from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import {MasterCardIcon, VisaIcon} from '@components/utils/Svg';
import LinearGradient from 'react-native-linear-gradient';

function CreditCard(props) {
  const {cardData} = props;

  return (
    <LinearGradient colors={['#2c2c2c', '#171717']} style={styles.cardLayout}>
      <View
        style={{
          ...R.styles.rowView,
          paddingHorizontal: R.unit.scale(30),
          justifyContent: 'flex-end',
        }}>
        <Text
          variant={'body2'}
          font={'PoppinsRegular'}
          color={R.color.white}
          align={'right'}
          gutterTop={20}
          gutterBottom={70}
          style={{width: '100%'}}
          transform={'capitalize'}>
          Debit
        </Text>
      </View>
      <View style={[R.styles.rowView, styles.numberView]}>
        <Text
          variant={'h3'}
          font={'PoppinsRegular'}
          color={R.color.white}
          align={'left'}
          style={{width: '70%'}}
          transform={'capitalize'}>
          **** **** **** {cardData?.endDigits ? cardData?.endDigits : '1234'}
        </Text>
        <View style={[R.styles.twoItemsRow, styles.validThruView]}>
          <View>
            <Text
              variant={'small'}
              font={'PoppinsRegular'}
              color={R.color.white}
              align={'left'}
              style={{
                marginLeft: R.unit.scale(20),
                marginRight: R.unit.scale(5),
              }}
              transform={'none'}>
              VALID
            </Text>
            <Text
              variant={'small'}
              font={'PoppinsRegular'}
              color={R.color.white}
              align={'left'}
              style={{
                marginLeft: R.unit.scale(20),
                marginRight: R.unit.scale(5),
              }}
              transform={'none'}>
              THRU
            </Text>
          </View>
          <Text
            variant={'body1'}
            font={'PoppinsRegular'}
            color={R.color.white}
            align={'right'}
            transform={'capitalize'}>
            {cardData?.validMonth ? cardData?.validMonth : '01'}/
            {cardData?.validYear ? cardData?.validYear : '01'}
          </Text>
        </View>
      </View>

      <View style={[R.styles.twoItemsRow, styles.validView]}>
        <View style={styles.svgView}>
          {cardData?.cardType === 'mastercard' ? (
            <MasterCardIcon height="100%" width="100%" />
          ) : (
            <VisaIcon height="100%" width="100%" />
          )}
        </View>
      </View>
    </LinearGradient>
  );
}
export default CreditCard;

const styles = StyleSheet.create({
  cardLayout: {
    backgroundColor: R.color.mainColor,
    width: '100%',
    borderRadius: R.unit.scale(20),
    paddingVertical: R.unit.scale(10),
  },
  validView: {
    paddingHorizontal: R.unit.scale(20),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(50),
  },
  numberView: {
    paddingHorizontal: R.unit.scale(20),
  },
  validThruView: {
    paddingHorizontal: R.unit.scale(0),
  },
});
