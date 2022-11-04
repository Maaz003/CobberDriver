import {Platform} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {authLocationCoords} from '@store/common/commonSlice';
import {GOOGLE_GEOCODE} from '@env';
import {confirmPickUp, locationLoader} from '@store/user/userSlice';
import {stringTrim} from '../ReuseableFunctions';
import {statusLocationPermission} from '../Validators';
Geocoder.init(GOOGLE_GEOCODE);

const CurrentLocation = async props => {
  const {flag, actionCall, prevFlag} = props;

  if (Platform.OS === 'ios') {
    let granted = await statusLocationPermission();
    if (granted) {
      Geolocation.getCurrentPosition(
        position => {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          getAddressFromCoordinates(lat, long);
        },
        error => {
          console.log('ERRROR GET LOC IOS', error);
          actionCall(locationLoader(false));
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
      );
    } else {
      actionCall(locationLoader(false));
    }
  }

  if (Platform.OS === 'android') {
    console.log('ANDROID');
    let granted = await statusLocationPermission();
    if (granted) {
      console.log('first');
      Geolocation.getCurrentPosition(
        position => {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          getAddressFromCoordinates(lat, long);
        },
        error => {
          actionCall(locationLoader(false));
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
      );
    } else {
      actionCall(locationLoader(false));
    }
  }

  const getAddressFromCoordinates = async (latitude, longitude) => {
    console.log('MJ');
    await Geocoder.from(latitude, longitude)
      .then(json => {
        let addressRaw = json.results[0].formatted_address;
        const address = addressRaw && stringTrim(addressRaw, 2);
        const loc = {
          address,
          latitude,
          longitude,
        };

        let array = json.results[0].address_components;
        let CountryLocality = array.find(item => {
          return item.types.includes('country');
        });
        let StateLocality = array.find(item => {
          return item.types.includes('administrative_area_level_1');
        });
        let CityLocality = array.find(item => {
          return item.types.includes('administrative_area_level_2');
        });

        let coordinates = [latitude, longitude];
        let city = CityLocality.long_name.substring(
          0,
          CityLocality.long_name.indexOf(' '),
        );

        let userLocation = {
          coordinates,
          country: CountryLocality.long_name,
          countCode: CountryLocality.short_name,
          state: StateLocality.long_name,
          city,
        };
        actionCall(authLocationCoords(userLocation));
        actionCall(confirmPickUp(loc));
        actionCall(locationLoader(false));

        // if (flag) {
        // }
      })
      .catch(error => {
        console.log('ERROR GEOCODE', error);
        actionCall(locationLoader(false));
      });
  };
};

export const getAddressFromCoordinates = async (latitude, longitude) => {
  return await Geocoder.from(latitude, longitude)
    .then(json => {
      let addressRaw = json.results[0].formatted_address;
      const address = addressRaw && stringTrim(addressRaw, 2);
      actionCall(locationLoader(false));
      const loc = {
        address,
        latitude,
        longitude,
      };
      return loc;
    })
    .catch(error => {
      console.log('ERROR GEOCODE', error);
      actionCall(locationLoader(false));
    });
};

export default CurrentLocation;
