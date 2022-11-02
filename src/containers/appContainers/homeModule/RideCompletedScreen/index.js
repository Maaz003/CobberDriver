import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import RideCompletedBox from '@components/view/screen/Home/RideCompletedBox';
import Map from '@components/view/mapView/Map';
import PickUpMarker from '@components/view/mapView/PickUpMarker';

function RideCompletedScreen(props) {
  const {navigation} = props;
  const mapRef = useRef(null);
  let coordinates = LocationCoordinates();
  const {pickUpLat, pickUpLong, initialLat, initialLong, addressRawPickup} =
    coordinates;

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  const animatePickup = data => {
    let region = {
      latitude: pickUpLat ? Number(pickUpLat) : initialLat,
      longitude: pickUpLong ? Number(pickUpLong) : initialLong,
      latitudeDelta: Platform.OS === 'ios' ? 0.001 : 0.002,
      longitudeDelta: Platform.OS === 'ios' ? 0.001 : 0.002,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  const onMapReady = () => {
    animatePickup();
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={[R.styles.mainLayout, styles.mainLayout]}>
        <Map
          style={R.styles.mapView}
          mapForwardRef={mapRef}
          mapReady={onMapReady}>
          <PickUpMarker
            pickUpLat={pickUpLat}
            pickUpLong={pickUpLong}
            addressRawPickup={addressRawPickup}
            initialLat={initialLat}
            initialLong={initialLong}
          />
        </Map>

        <RideCompletedBox />
      </View>
    </ScreenBoiler>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RideCompletedScreen;
