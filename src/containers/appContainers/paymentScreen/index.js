import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Text from '@components/common/Text';
import CreditCard from '@components/view/cards/CreditCard';
import Icon from '@components/common/Icon';

function PaymentScreen(props) {
  const {navigation} = props;
  const {type = 'home'} = props.route.params;

  const headerProps = {
    isSubHeader: true,
    mainHeading: 'Payment',
    headerColor: R.color.white,
    isBack: type === 'product' ? true : false,
  };

  return (
    <ScreenBoiler {...props} headerProps={headerProps}>
      <ScrollView
        style={[R.styles.container, styles.mainLayout]}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <View style={styles.formView}>
          <CreditCard cardData={{}} />
          <View style={[R.styles.rowView, styles.addCardView]}>
            <TouchableOpacity style={R.styles.rowView} activeOpacity={0.6}>
              <Text
                variant={'h6'}
                font={'bold'}
                color={R.color.black}
                align={'left'}
                style={{marginRight: R.unit.scale(5)}}
                transform={'none'}>
                Add Card
              </Text>
              <Icon
                name={'ios-add-circle'}
                type={'Ionicons'}
                color={R.color.charcoalShade2}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}
export default PaymentScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.lightSilverShade1,
    paddingHorizontal: 0,
    flex: 1,
  },
  formView: {
    paddingHorizontal: R.unit.scale(10),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
  addCardView: {
    justifyContent: 'flex-end',
    marginTop: R.unit.scale(40),
    paddingVertical: R.unit.scale(10),
  },
});
