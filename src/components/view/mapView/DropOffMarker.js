import React from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import {Marker} from 'react-native-maps';
import {stringTrim} from '@components/utils/ReuseableFunctions';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';

function DropOffMarker(props) {
  const {dropOffLat, dropOffLong, addressRawDropOff, initialLat, initialLong} =
    props;

  const dropOffAddr = stringTrim(addressRawDropOff, 1);

  return (
    <Marker
      coordinate={{
        latitude: dropOffLat ? Number(dropOffLat) : initialLat,
        longitude: dropOffLong ? Number(dropOffLong) : initialLong,
      }}
      tracksViewChanges={false}
      pinColor={R.color.blackLightShade}>
      <View style={R.styles.columnView}>
        <Text
          variant={'body5'}
          font={'PoppinsMedium'}
          color={R.color.charcoalShade}
          style={{
            backgroundColor: R.color.mainColor,
            padding: R.unit.scale(6),
            borderRadius: R.unit.scale(2),
          }}
          align={'center'}
          transform={'none'}>
          {dropOffAddr ? dropOffAddr : ''}
        </Text>
        <Icon
          name={'location-sharp'}
          type={'Ionicons'}
          size={30}
          color={R.color.black}
        />
      </View>
    </Marker>
  );
}
export default DropOffMarker;

const styles = StyleSheet.create({
  mapView: {
    height: R.unit.height(1),
    width: R.unit.width(1),
    top: 0,
  },
});
