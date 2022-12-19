import React, {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import Map from '@components/view/mapView/Map';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import PickUpMarker from '@components/view/mapView/PickUpMarker';
import {mapStyles} from '@components/constants';
import R from '@components/utils/R';
import MapView from 'react-native-maps';

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
    console.log('ANIMATE CALLED');
    if (mapRef.current) {
      let region = {
        latitude: pickUpLat ? Number(pickUpLat) : initialLat,
        longitude: pickUpLong ? Number(pickUpLong) : initialLong,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      };
      console.log(':ANIMATED REGION', region, mapRef.current.animateToRegion);
      mapRef?.current?.animateToRegion(region, 2000);
      // mapRef?.current?.animateCamera({
      //   center: region,
      // });
    }
  };

  const onMapReady = () => {
    console.log('MAP REAY CALLED');
    // animatePickup();
  };

  return (
    <SafeAreaView>
      <MapView
        style={R.styles.mapView}
        cacheEnabled={false}
        ref={mapRef}
        loadingEnabled={false}
        onMapReady={onMapReady}
        // loadingIndicatorColor={R.color.mainColor}
        // loadingBackgroundColor={'rgba(0,0,0,0.3)'}
        initialRegion={{
          latitude: pickUpLat ? pickUpLat : initialLat ? initialLat : 30.0002,
          longitude: pickUpLong
            ? pickUpLong
            : initialLong
            ? initialLong
            : 136.2092,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}>
        <PickUpMarker
          pickUpLat={pickUpLat}
          pickUpLong={pickUpLong}
          addressRawPickup={addressRawPickup}
          initialLat={initialLat}
          initialLong={initialLong}
        />
        <PickUpMarker
          pickUpLat={pickUpLat}
          pickUpLong={pickUpLong}
          addressRawPickup={addressRawPickup}
          initialLat={initialLat}
          initialLong={initialLong}
        />
      </MapView>
      {/* </Map> */}
    </SafeAreaView>
  );
}
export default HomeMap;
