import React, {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import R from '@components/utils/R';
import MapView from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import {firstTimeAnimate} from '@store/common/commonSlice';
import PickUpMarker from '@components/view/mapView/PickUpMarker';
import DropOffMarker from '@components/view/mapView/DropOffMarker';
import {useIsFocused} from '@react-navigation/native';

function DropOffMap() {
  const dispatch = useDispatch();
  const common = useSelector(state => state.common);
  const mapRef = useRef(null);
  const isFocused = useIsFocused();
  let coordinates = LocationCoordinates();
  const {
    pickUpLat,
    pickUpLong,
    dropOffLat,
    dropOffLong,
    addressRawDropOff,
    addressRawPickup,
    initialLat,
    initialLong,
    dropOffLoc,
    pickupLoc,
  } = coordinates;

  useEffect(() => {
    animateDropOff();
  }, [dropOffLat, dropOffLong, isFocused]);

  const animateDropOff = () => {
    if (dropOffLoc !== undefined) {
      let region = {
        latitude: Number(dropOffLat),
        longitude: Number(dropOffLong),
        latitudeDelta: Platform.OS === 'ios' ? 0.004 : 0.002,
        longitudeDelta: Platform.OS === 'ios' ? 0.004 : 0.002,
      };
      mapRef.current.animateToRegion(region, 2000);
    }
  };

  useEffect(() => {
    if (pickupLoc !== undefined) {
      if (common?.firstAnimate === true) {
        animatePickup();
        dispatch(firstTimeAnimate(false));
      }
    }
  }, [pickUpLat, pickUpLong]);

  const animatePickup = () => {
    let region = {
      latitude: Number(pickUpLat),
      longitude: Number(pickUpLong),
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  const onMapReady = () => {
    animateDropOff();
  };

  return (
    <SafeAreaView>
      <MapView
        style={R.styles.mapView}
        cacheEnabled={false}
        ref={mapRef}
        onMapReady={onMapReady}
        loadingEnabled={true}
        loadingIndicatorColor={R.color.mainColor}
        loadingBackgroundColor={'rgba(0,0,0,0.3)'}
        initialRegion={{
          latitude: dropOffLat
            ? dropOffLat
            : pickUpLat
            ? pickUpLat
            : initialLat,
          longitude: dropOffLong
            ? dropOffLong
            : pickUpLong
            ? pickUpLong
            : initialLong,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}>
        <PickUpMarker
          pickUpLat={pickUpLat}
          pickUpLong={pickUpLong}
          addressRawPickup={addressRawPickup}
          initialLat={initialLat}
          initialLong={initialLong}
        />
        {dropOffLoc !== undefined && (
          <DropOffMarker
            dropOffLat={dropOffLat}
            dropOffLong={dropOffLong}
            initialLat={initialLat}
            initialLong={initialLong}
            addressRawDropOff={addressRawDropOff}
          />
        )}
      </MapView>
    </SafeAreaView>
  );
}
export default DropOffMap;
