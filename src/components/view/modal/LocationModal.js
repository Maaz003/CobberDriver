import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useDispatch, useSelector} from 'react-redux';
import {GOOGLE_GEOCODE} from '@env';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import {
  confirmDropOff,
  confirmPickUp,
  pinLocation,
} from '@store/user/userSlice';
import navigationService from '../../../navigation/navigationService';

function LocationModal(props) {
  const {locType} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [showPin, setShowPin] = useState(true);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  useEffect(() => {
    if (text.length === 0) {
      setShowPin(true);
    } else {
      setShowPin(false);
    }
  }, [text]);

  const locationSelected = (data, details) => {
    let CooOrdiantes = {
      address: data?.description,
      latitude: details?.geometry?.location?.lat,
      longitude: details?.geometry?.location?.lng,
    };
    if (locType === 'Pickup') {
      dispatch(confirmPickUp(CooOrdiantes));
      dispatch(pinLocation(true));
      setIsBlur(false);
    } else {
      dispatch(confirmDropOff(CooOrdiantes));
      setIsBlur(false);
    }
  };

  const locationPin = () => {
    setIsBlur(false);
    navigationService.navigate('MarkerMap', {
      locType: locType,
    });
  };

  let country = user?.user?.countryCode;
  let lat = user?.user?.currentLocation?.coordinates[1];
  let lon = user?.user?.currentLocation?.coordinates[0];

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        // visible={true}
        onRequestClose={() => {
          setIsBlur(false);
        }}
        onShow={() => {
          setIsBlur(true);
        }}>
        <ScrollView
          style={styles.centeredView}
          keyboardShouldPersistTaps="always">
          <View style={styles.modalView}>
            <View style={[R.styles.twoItemsRow, styles.headerView]}>
              <TouchableOpacity
                onPress={() => setIsBlur(false)}
                activeOpacity={0.6}>
                <Icon
                  name={'arrow-back'}
                  type={'Ionicons'}
                  color={R.color.mainColor}
                  size={40}
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  variant={'h4'}
                  font={'semiBold'}
                  color={'white'}
                  align={'center'}
                  style={{
                    marginRight: R.unit.scale(30),
                  }}
                  transform={'none'}>
                  {locType} Location
                </Text>
              </View>
            </View>

            <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails={true}
              onPress={(data, details = null) => {
                locationSelected(data, details);
              }}
              keepResultsAfterBlur={true}
              minLength={1}
              enableHighAccuracyLocation={true}
              renderLeftButton={() => (
                <Icon
                  name={'location'}
                  type={'Entypo'}
                  size={25}
                  color={R.color.mainColor}
                />
              )}
              textInputProps={{
                placeholderTextColor: R.color.white,
                onChangeText: value => {
                  setText(value);
                },
              }}
              enablePoweredByContainer={false}
              listViewDisplayed={false}
              isRowScrollable={true}
              styles={{
                textInputContainer: styles.textInputContainer,
                textInput: styles.textInput,
                listView: styles.listView,
                row: styles.row,
                separator: styles.seperator,
                description: styles.description,
              }}
              query={{
                key: GOOGLE_GEOCODE,
                language: 'en',
                components: `country:${country}`,
                // location: `${lat}, ${lon}`,
                // radius: 50000,
                // strictbounds: true,
              }}
            />

            {showPin && (
              <TouchableOpacity
                onPress={locationPin}
                style={[R.styles.twoItemsRow, styles.secondOptionView]}>
                <Icon
                  name={'location'}
                  type={'Ionicons'}
                  size={30}
                  color={R.color.mainColor}
                />
                <Text
                  variant={'body3'}
                  font={'bold'}
                  color={R.color.mainColor}
                  align={'center'}
                  transform={'none'}>
                  Select location from map
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  centeredView: {
    flex: 1,
    backgroundColor: R.color.charcoalShade,
  },
  modalView: {
    backgroundColor: R.color.charcoalShade,
    width: '100%',
    height: R.unit.height(1),
    paddingHorizontal: R.unit.scale(12),
    paddingVertical: R.unit.scale(25),
  },
  headerView: {
    paddingHorizontal: 0,
    marginTop: R.unit.scale(20),
    marginBottom: R.unit.scale(20),
  },
  secondOptionView: {
    position: 'absolute',
    top: R.unit.scale(170),
    width: '100%',
    marginLeft: R.unit.scale(30),
  },
  textInputContainer: {
    backgroundColor: R.color.charcoalShade2,
    borderRadius: R.unit.scale(50),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.white,
    paddingHorizontal: R.unit.scale(20),
    paddingVertical: R.unit.height(1) > 900 ? R.unit.scale(5) : 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: R.unit.scale(20),
  },
  textInput: {
    backgroundColor: R.color.charcoalShade2,
    color: R.color.white,
    fontFamily: 'Nunito-Medium',
    display: 'flex',
    marginTop: R.unit.scale(5),
  },
  listView: {
    backgroundColor: R.color.charcoalShade2,
    height: '100%',
    zIndex: 99999,
    position: 'absolute',
    top:
      Platform.OS === 'android'
        ? 60
        : Platform.OS === 'ios' && R.unit.height(1) > 900
        ? 90
        : 60,
    width: R.unit.width(1),
    marginLeft: R.unit.scale(-10),
    borderBottomWidth: 0,
  },
  row: {
    backgroundColor: R.color.blackLightShade,
    borderBottomWidth: 0,
  },
  seperator: {
    height: 0,
    backgroundColor: R.color.mainColor,
  },
  description: {
    fontSize: R.unit.fontSize(18),
    fontFamily: 'Nunito-SemiBold',
    color: R.color.mainColor,
    padding: R.unit.scale(10),
    marginLeft: R.unit.scale(-10),
    width: R.unit.width(0.97),
  },
});

export default LocationModal;
