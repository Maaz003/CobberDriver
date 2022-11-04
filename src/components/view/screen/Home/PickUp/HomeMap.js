import React, {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Map from '@components/view/mapView/Map';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import PickUpMarker from '@components/view/mapView/PickUpMarker';
import {mapStyles} from '@components/constants';
import {firstTimeAnimate} from '@store/common/commonSlice';

function HomeMap() {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  let coordinates = LocationCoordinates();
  const common = useSelector(state => state.common);
  const user = useSelector(state => state.user);

  const {
    pickUpLat,
    pickUpLong,
    addressRawPickup,
    initialLat,
    initialLong,
    pickupLoc,
  } = coordinates;

  console.log('PICKUP', coordinates, '--------', common?.firstAnimate);

  // useEffect(() => {
  //   animatePickup();
  // }, [pickUpLat || pickUpLong]);

  useEffect(() => {
    if (pickupLoc !== undefined) {
      // if (common?.firstAnimate === true) {
      if (!user?.locationLoader) {
        animatePickup();
        // dispatch(firstTimeAnimate(false));
      }
      // }
    }
  }, [pickupLoc, user.locationLoader]);

  const animatePickup = () => {
    let region = {
      latitude: pickUpLat ? Number(pickUpLat) : initialLat,
      longitude: pickUpLong ? Number(pickUpLong) : initialLong,
      latitudeDelta: Platform.OS === 'ios' ? 0.001 : 0.002,
      longitudeDelta: Platform.OS === 'ios' ? 0.001 : 0.002,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  const onMapReady = () => {};

  return (
    <SafeAreaView>
      <Map
        customMapStyle={mapStyles}
        mapForwardRef={mapRef}
        loadingEnabled={false}
        mapReady={onMapReady}>
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
