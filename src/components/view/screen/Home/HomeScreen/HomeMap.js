import React, {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import Map from '@components/view/mapView/Map';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import PickUpMarker from '@components/view/mapView/PickUpMarker';
import {mapStyles} from '@components/constants';
import R from '@components/utils/R';

function HomeMap() {
  const mapRef = useRef(null);
  let coordinates = LocationCoordinates();
  const user = useSelector(state => state.user);

  const {
    pickUpLat,
    pickUpLong,
    addressRawPickup,
    initialLat,
    initialLong,
    pickupLoc,
  } = coordinates;

  useEffect(() => {
    if (pickupLoc !== undefined) {
      if (!user?.locationLoader) {
        animatePickup();
      }
    }
  }, [pickupLoc, user.locationLoader]);

  const animatePickup = () => {
    let region = {
      latitude: pickUpLat ? Number(pickUpLat) : initialLat,
      longitude: pickUpLong ? Number(pickUpLong) : initialLong,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  return (
    <SafeAreaView>
      <Map
        customMapStyle={mapStyles}
        mapForwardRef={mapRef}
        loadingEnabled={false}
        mapViewStyles={{height: R.unit.height(0.9)}}
        mapReady={() => null}>
        <PickUpMarker
          pickUpLat={pickUpLat}
          pickUpLong={pickUpLong}
          addressRawPickup={addressRawPickup}
          initialLat={initialLat}
          initialLong={initialLong}
        />
      </Map>
    </SafeAreaView>
  );
}
export default HomeMap;
