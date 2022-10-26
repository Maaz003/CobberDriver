import React from 'react';
import {View, Dimensions, Image, StyleSheet} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import DashLine from '@components/common/DashLine';

function HistoryCard(props) {
  return (
    <View style={styles.historyCard}>
      <View style={[R.styles.twoItemsRow, styles.header]}>
        <Image source={R.image.userPin()} style={styles.image} />
        <Text
          variant={'body2'}
          font={'bold'}
          gutterTop={2}
          color={R.color.black}
          style={{marginLeft: 10, maxWidth: '80%'}}
          align={'left'}
          numberOfLines={1}
          transform={'none'}>
          John Denly
        </Text>
      </View>
      <View style={[R.styles.twoItemsRow, styles.content]}>
        <View style={styles.iconsColumn}>
          <View style={R.styles.pickupEllipse} />
          <DashLine
            dashGap={1}
            dashColor={R.color.gray}
            style={{
              width: 10,
              height: 40,
              flexDirection: 'column',
              alignItems: 'center',
            }}
          />
          <Icon
            name={'location-sharp'}
            type={'Ionicons'}
            color={R.color.mainColor}
            size={28}
            iconStyles={{marginTop: 2}}
          />
        </View>
        <View style={styles.textView}>
          <Text
            variant={'body4'}
            font={'semiBold'}
            gutterTop={2}
            color={R.color.lightGray}
            align={'left'}
            numberOfLines={2}
            transform={'none'}>
            Pick up point
          </Text>
          <Text
            variant={'body3'}
            font={'thin'}
            color={R.color.black}
            align={'left'}
            gutterTop={5}
            gutterBottom={10}
            numberOfLines={2}
            transform={'none'}>
            5967 Torphy Forks5967 Torphy Forks5967 Torphy Forks5967 Torphy
            Forks5967 Torphy Forks
          </Text>
          <View
            style={{
              ...R.styles.divider,
              backgroundColor: R.color.gray,
              height: R.unit.scale(0.5),
            }}
          />
          <Text
            variant={'body4'}
            font={'semiBold'}
            gutterTop={10}
            color={R.color.lightGray}
            align={'left'}
            numberOfLines={2}
            transform={'none'}>
            Drop off point
          </Text>
          <Text
            variant={'body3'}
            font={'thin'}
            color={R.color.black}
            align={'left'}
            gutterTop={5}
            gutterBottom={10}
            numberOfLines={2}
            transform={'none'}>
            5967 Torphy Forks5967 Torphy Forks5967 Torphy Forks5967 Torphy
            Forks5967 Torphy Forks
          </Text>
        </View>
      </View>
    </View>
  );
}
export default HistoryCard;

const styles = StyleSheet.create({
  historyCard: {
    width: R.unit.width(0.85),
    marginTop: R.unit.scale(20),
    borderRadius: R.unit.scale(20),
    paddingHorizontal: R.unit.scale(20),
    paddingVertical: R.unit.scale(10),
    backgroundColor: R.color.white,
    shadowColor: R.color.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  header: {
    paddingHorizontal: 0,
    marginBottom: R.unit.scale(10),
  },
  content: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  image: {
    width: R.unit.scale(45),
    height: R.unit.scale(45),
    borderRadius: R.unit.scale(100),
    borderWidth: R.unit.scale(2),
    borderColor: R.color.mainColor,
  },
  iconsColumn: {
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView: {
    width: '87%',
  },
});
