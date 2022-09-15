import React from 'react';
import {View, StyleSheet, PixelRatio} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import {CarIcon, CarIcon2} from '@components/utils/Svg';
import Button from '@components/common/Button';
import {useSelector} from 'react-redux';

function VehicleCard(props) {
  const {navigation} = props;
  const user = useSelector(state => state.user);
  return (
    <View style={styles.vehicleCard}>
      <View style={[R.styles.rowView, styles.headingView]}>
        <Text
          variant={'h4'}
          font={'bold'}
          color={R.color.white}
          align={'center'}
          style={{
            flex: 1,
            marginLeft: R.unit.scale(45),
          }}
          numberOfLines={2}
          transform={'none'}>
          Select Vehicle
        </Text>
        {user?.Eta > 0 && (
          <View style={styles.etaView}>
            <Text
              variant={'body3'}
              font={'bold'}
              color={R.color.black}
              align={'center'}
              transform={'none'}>
              ETA
            </Text>
            <Text
              variant={'body4'}
              font={'regular'}
              color={R.color.black}
              align={'center'}
              transform={'none'}>
              {Math.ceil(user?.Eta)}m
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={[R.styles.rowView, styles.carSelectLayout]}>
        <View style={R.styles.twoItemsRow}>
          <View style={styles.svgView}>
            <CarIcon2 />
          </View>
          <View style={{marginLeft: 20}}>
            <Text
              variant={'body2'}
              font={'bold'}
              color={R.color.lightGray}
              align={'left'}
              transform={'none'}>
              Light duty
            </Text>
            <Text
              variant={'body4'}
              font={'regular'}
              color={R.color.white}
              style={{marginLeft: 2}}
              align={'left'}
              transform={'none'}>
              0-200 kg
            </Text>
          </View>
        </View>
        <Text
          variant={'h3'}
          font={'bold'}
          color={R.color.mainColor}
          align={'left'}
          transform={'none'}>
          $ 240
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[R.styles.rowView, styles.carSelectLayout]}>
        <View style={R.styles.twoItemsRow}>
          <View style={styles.svgView}>
            <CarIcon />
          </View>
          <View style={{marginLeft: 20}}>
            <Text
              variant={'body2'}
              font={'bold'}
              color={R.color.lightGray}
              align={'left'}
              transform={'none'}>
              Heavy duty
            </Text>
            <Text
              variant={'body4'}
              font={'regular'}
              color={R.color.white}
              style={{marginLeft: 2}}
              align={'left'}
              transform={'none'}>
              200-400 kg
            </Text>
          </View>
        </View>
        <Text
          variant={'h3'}
          font={'bold'}
          color={R.color.mainColor}
          align={'left'}
          transform={'none'}>
          $ 440
        </Text>
      </TouchableOpacity>

      <Button
        value={`Confirm Ride`}
        bgColor={R.color.mainColor}
        width={'95%'}
        size={'xmd'}
        variant={'body2'}
        font={'semiBold'}
        gutterTop={R.unit.scale(20)}
        color={R.color.black}
        borderRadius={100}
        onPress={() => navigation.navigate('LocationTracking')}
        borderColor={R.color.mainColor}
        loaderColor={'white'}
        borderWidth={2}
      />
    </View>
  );
}
export default VehicleCard;

const styles = StyleSheet.create({
  vehicleCard: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' && R.unit.height(1) > 800 ? -40 : 0,
    width: R.unit.width(1),
    marginTop: R.unit.scale(20),
    paddingHorizontal: R.unit.scale(20),
    paddingVertical:
      Platform.OS === 'ios' && R.unit.height(1) > 800
        ? R.unit.scale(40)
        : R.unit.scale(25),
    borderTopLeftRadius: R.unit.scale(40),
    borderTopRightRadius: R.unit.scale(40),
    backgroundColor: R.color.charcoalShade2,
    shadowColor: R.color.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  carSelectLayout: {
    marginTop: R.unit.scale(5),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.08),
  },
  headingView: {
    paddingHorizontal: R.unit.scale(20),
    marginBottom: R.unit.scale(16),
  },
  etaView: {
    backgroundColor: R.color.mainColor,
    borderRadius: R.unit.scale(120),
    width: R.unit.scale(50),
    height: R.unit.scale(50),
    justifyContent: 'center',
  },
});
