import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import MediaDisplay from '@components/view/screen/Home/Instant/MediaDisplay';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import RideMap from '@components/view/screen/Home/Instant/RideMap';
import HoverText from '@components/common/HoverText';
import Button from '@components/common/Button';

function RideDetailsScreen(props) {
  const {navigation} = props;

  const openDirections = type => {
    let latitude;
    let longitude;
    let label;

    if (type === 'Pickup') {
      latitude = '24.9162884';
      longitude = '67.0920345';
      label = 'Tech office';
    } else {
      latitude = '24.9456063';
      longitude = '67.1441915';
      label = 'Hospital';
    }

    const url = Platform.select({
      ios: 'maps:' + latitude + ',' + longitude + '?q=' + label,
      android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
    });

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url =
          'https://www.google.de/maps/@' +
          latitude +
          ',' +
          longitude +
          '?q=' +
          label;
        return Linking.openURL(browser_url);
      }
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[R.styles.container, styles.mainLayout]}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: R.unit.pdBottomList(50),
      }}>
      <View style={styles.contentView}>
        <Text
          variant={'h1'}
          font={'bold'}
          color={R.color.blackShade3}
          align={'left'}
          gutterBottom={24}
          transform={'none'}>
          Ride Details
        </Text>

        <MediaDisplay />

        <View style={R.styles.twoItemsRow}>
          <Image
            source={R.image.dummyUser()}
            resizeMode={'cover'}
            style={styles.image}
          />
          <Text
            variant={'h2'}
            font={'bold'}
            color={R.color.charcoalShade}
            align={'left'}
            transform={'none'}>
            LOREM ISPUM
          </Text>
        </View>

        <View style={[R.styles.twoItemsRow, styles.locationView]}>
          <Icon
            name={'star'}
            type={'Foundation'}
            color={R.color.mainColor}
            size={25}
          />
          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.charcoalShade}
            align={'left'}
            style={{marginLeft: R.unit.scale(8)}}
            transform={'none'}>
            5.0
          </Text>
          <View style={styles.dot} />
          <Text
            variant={'body2'}
            font={'InterSemiBold'}
            color={R.color.charcoalShade}
            align={'left'}
            transform={'none'}>
            Tennis coach
          </Text>

          <View style={styles.dot} />
          <Text
            variant={'body2'}
            font={'InterSemiBold'}
            color={R.color.charcoalShade}
            align={'left'}
            transform={'none'}>
            New York
          </Text>
        </View>
        <Divider lineStyles={{height: R.unit.scale(0.5)}} />
        <Text
          variant={'h1'}
          font={'bold'}
          color={R.color.charcoalShade}
          gutterBottom={32}
          align={'left'}
          transform={'none'}>
          Location
        </Text>

        <RideMap />

        <Text
          variant={'h6'}
          font={'bold'}
          color={R.color.charcoalShade}
          gutterTop={32}
          gutterBottom={8}
          align={'left'}
          transform={'none'}>
          PickUp
        </Text>
        <Text
          variant={'body1'}
          font={'semiBold'}
          color={R.color.gray6}
          gutterBottom={12}
          align={'left'}
          numberOfLines={3}
          transform={'none'}>
          Tech office
        </Text>

        <HoverText
          text={'Get directions'}
          onPress={() => openDirections('Pickup')}
        />

        <Text
          variant={'h6'}
          font={'bold'}
          color={R.color.charcoalShade}
          gutterTop={32}
          gutterBottom={8}
          align={'left'}
          transform={'none'}>
          DropOff
        </Text>
        <Text
          variant={'body1'}
          font={'semiBold'}
          color={R.color.gray6}
          gutterBottom={12}
          numberOfLines={3}
          align={'left'}
          transform={'none'}>
          Hospital
        </Text>
        <HoverText
          text={'Get directions'}
          onPress={() => openDirections('Dropoff')}
        />
        <View style={[R.styles.twoItemsRow, styles.buttonLayout]}>
          <TouchableOpacity style={styles.cancelButton} activeOpacity={0.5}>
            <Icon
              type={'Ionicons'}
              name={'close'}
              color={R.color.blackShade3}
              size={20}
            />
          </TouchableOpacity>

          <Button
            value={'Accept'}
            bgColor={R.color.mainColor}
            width={'83%'}
            size={'lg'}
            font={'bold'}
            variant={'body1'}
            color={R.color.white}
            borderColor={R.color.mainColor}
            disabled={false}
            loaderColor={R.color.white}
            borderWidth={1}
            borderRadius={10}
            onPress={() => null}
          />
        </View>
      </View>
    </ScrollView>
  );
}
export default RideDetailsScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(16),
    flex: 1,
  },
  contentView: {
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
  image: {
    height: R.unit.scale(70),
    width: R.unit.scale(70),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(12),
  },
  locationView: {
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(16),
  },
  dot: {
    height: R.unit.scale(4),
    width: R.unit.scale(4),
    backgroundColor: R.color.gray5,
    borderRadius: R.unit.scale(30),
    marginHorizontal: R.unit.scale(8),
  },
  buttonLayout: {
    marginTop: R.unit.scale(32),
    width: '100%',
    justifyContent: 'center',
  },
  cancelButton: {
    padding: R.unit.scale(15),
    borderColor: R.color.gray,
    borderWidth: R.unit.scale(0.5),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(8),
  },
});
