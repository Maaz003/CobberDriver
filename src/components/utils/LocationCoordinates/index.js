import {useSelector} from 'react-redux';

export const LocationCoordinates = () => {
  const user = useSelector(state => state.user);
  const pickUpLat = user?.pickupLoc?.latitude;
  const pickUpLong = user?.pickupLoc?.longitude;
  const dropOffLat = user?.dropOffLoc?.latitude;
  const dropOffLong = user?.dropOffLoc?.longitude;
  const addressRawDropOff = user?.dropOffLoc?.address;
  const addressRawPickup = user?.pickupLoc?.address;
  const initialLat = user?.user?.currentLocation?.coordinates[1];
  const initialLong = user?.user?.currentLocation?.coordinates[0];
  const dropOffLoc = user?.dropOffLoc;
  const pickupLoc = user?.pickupLoc;
  return {
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
  };
};
