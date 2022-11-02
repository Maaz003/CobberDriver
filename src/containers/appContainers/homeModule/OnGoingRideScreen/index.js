import React, {useRef, useEffect} from 'react';
import {Platform, View} from 'react-native';
import {useSelector} from 'react-redux';
import R from '@components/utils/R';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import MapHeader from '@components/view/screen/Home/MapHeader';
import RidesInProgressCard from '@components/view/screen/Home/RideInProgressCard';
import PickUpMarker from '@components/view/mapView/PickUpMarker';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import Map from '@components/view/mapView/Map';

function OnGoingRideScreen(props) {
  const {navigation} = props;
  const user = useSelector(state => state.user);
  const mapRef = useRef(null);
  let rideType;
  let rideData;
  if (props.route.params === undefined) {
    rideType = user.rideSession.type;
    rideData = user.rideSession;
  } else {
    const {type = undefined, data = undefined} = props.route.params;
    rideType = type;
    rideData = data;
  }

  let coordinates = LocationCoordinates();
  const {pickUpLat, pickUpLong, addressRawPickup, initialLat, initialLong} =
    coordinates;

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  const onPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    animatePickup();
  }, [pickUpLat || pickUpLong]);

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
      <View style={R.styles.mainLayout}>
        {/* {user?.inRide === 'ended' ||
          (user?.inRide === 'finished' && (
            <MapHeader
              onPress={onPress}
              iconName={user.inRide ? 'close' : 'arrow-back'}
              iconType={user.inRide ? 'Ionicons' : 'MaterialIcons'}
              showLive={false}
            />
          ))} */}

        <Map
          mapViewStyles={R.styles.mapView}
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
        <RidesInProgressCard
          type={rideType}
          data={rideData}
          navigation={navigation}
        />
      </View>
    </ScreenBoiler>
  );
}

export default OnGoingRideScreen;
