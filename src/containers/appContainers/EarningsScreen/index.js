import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import {MasterCardIcon, VisaIcon} from '@components/utils/Svg';

function EarningsScreen(props) {
  const {navigation} = props;
  // const {type = 'home'} = props.route.params;

  const [active, setActive] = useState(0);

  const cards = [
    {last4: '4242', type: 'MasterCard'},
    {last4: '4242', type: 'visa'},
  ];

  const headerProps = {
    isSubHeader: true,
    mainHeading: 'Earnings',
    isBack: false,
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
        <View style={styles.contentView}>
          <View style={[styles.earningView]}>
            <Text
              variant={'h6'}
              font={'regular'}
              color={R.color.black}
              align={'left'}
              gutterTop={24}
              gutterBottom={24}
              transform={'none'}>
              Your Total Earning
            </Text>
            <Text
              variant={'h3'}
              font={'bold'}
              color={R.color.black}
              align={'left'}
              gutterBottom={25}
              transform={'none'}>
              {`$ ${Number('2058').toFixed(2)}`}
            </Text>
            <Button
              value={'Withdraw Payment'}
              bgColor={R.color.mainColor}
              width={'80%'}
              size={'xmd'}
              variant={'body2'}
              font={'semiBold'}
              color={R.color.black}
              borderRadius={10}
              onPress={() => null}
            />
          </View>
          <Text
            variant={'body2'}
            font={'medium'}
            color={R.color.black}
            align={'left'}
            gutterTop={32}
            transform={'none'}>
            Payment Method
          </Text>
          {cards?.map((item, index, arr) => {
            return (
              <View>
                <TouchableOpacity
                  style={[R.styles.twoItemsRow, styles.card]}
                  activeOpacity={0.6}
                  onPress={() => setActive(index)}>
                  <View style={styles.svgView}>
                    {item?.type === 'visa' ? (
                      <VisaIcon width="100%" height="100%" />
                    ) : (
                      <MasterCardIcon width="100%" height="100%" />
                    )}
                  </View>
                  <Text
                    variant={'body2'}
                    font={'semiBold'}
                    color={
                      active === index ? R.color.blackLightShade : R.color.gray6
                    }
                    align={'left'}
                    style={{flex: 1}}
                    transform={'capitalize'}>
                    **** **** **** {item.last4}
                  </Text>
                  {active === index && (
                    <Icon
                      name={'arrow-right'}
                      type={'SimpleLineIcons'}
                      color={R.color.blackLightShade}
                      size={15}
                    />
                  )}
                </TouchableOpacity>
                {index !== arr.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}
export default EarningsScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.lightSilverShade1,
    paddingHorizontal: 0,
    flex: 1,
  },
  contentView: {
    paddingHorizontal: R.unit.scale(10),
    width: '100%',
    justifyContent: 'center',
  },
  earningView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: R.unit.scale(12),
    paddingVertical: R.unit.scale(20),
    backgroundColor: R.color.white,
    borderRadius: R.unit.scale(20),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.06),
    marginRight: R.unit.scale(12),
  },
  card: {
    paddingVertical: R.unit.scale(10),
  },
  divider: {
    height: R.unit.scale(0.75),
    width: '100%',
    backgroundColor: R.color.gray,
  },
});
