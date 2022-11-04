import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableNativeFeedback,
  Image as Imagec,
  TouchableOpacity,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Geocoder from 'react-native-geocoding';
import {Image} from 'react-native-compressor';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {GOOGLE_GEOCODE} from '@env';
import Text from '@components/common/Text';
import TextInput from '@components/common/TextInput';
import R from '@components/utils/R';
import DropDown from '@components/common/DropDown';
import {countriesDialCode} from '@components/constants';
import CurrentLocation from '@components/utils/CurrentLocation';
import FormValidation from '@components/utils/FormValidation';
import Icon from '@components/common/Icon';
import Toast from '@components/utils/Toast';
import PopUp from '@components/common/PopUp';

function Step1Screen(props) {
  const {navigation} = props;
  Geocoder.init(GOOGLE_GEOCODE);
  const dispatch = useDispatch();
  const common = useSelector(state => state.common);
  const [countryCode, setCountryCode] = useState('');
  const [photo, setPhoto] = useState('');
  const [picture, setPicture] = useState({});
  const [authUser, setAuthUser] = useState({
    name: '',
    email: '',
    dialCode: '+61',
    country: '',
    phoneNumber: '',
    currentLoc: undefined,
  });
  const [errorField, setErrorField] = useState({
    name: '',
    email: '',
    dialCode: '',
    country: '',
    phoneNumber: '',
  });

  useEffect(() => {
    CurrentLocation({actionCall: dispatch});
  }, []);

  const uploadImage = async () => {
    try {
      let pickerResult;
      pickerResult = await ImagePicker.openPicker({mediaType: 'photo'});
      if (pickerResult) {
        if (
          pickerResult.path.includes('.jpeg') ||
          pickerResult.path.includes('.jpg') ||
          pickerResult.path.includes('.png') ||
          pickerResult.path.includes('.JPG') ||
          pickerResult.path.includes('.PNG') ||
          pickerResult.path.includes('.JPEG') ||
          pickerResult.path.includes('.HEIC')
        ) {
          setPicture(pickerResult);
          const result = await Image.compress(pickerResult.path, {
            maxWidth: 1000,
            maxHeight: 1000,
            quality: 0.9,
            input: 'uri',
            output: 'jpg',
          });
          setPhoto(result);
        } else {
          Toast.show({
            title: 'Picture Error',
            message: 'Image path is wrong',
            type: 'danger',
          });
        }
      }
    } catch (error) {
      Toast.show({
        title: 'Picture Error',
        message: 'Image not uploaded',
        type: 'danger',
      });
    }
  };

  const countryDropDown = useCallback(
    childData => {
      let dataObj = '';
      dataObj = childData;
      setCountryCode(dataObj?.code);
      setAuthUser({
        ...authUser,
        country: dataObj.title,
        dialCode: dataObj.dial_code,
      });
    },
    [
      {...authUser, country: authUser?.country},
      {...authUser, dialCode: authUser?.dialCode},
    ],
  );

  const onSubmit = async () => {
    // navigation.navigate('Step2', {
    //   step1Data: {},
    // });
    const reqData = {
      name: authUser?.name,
      email: authUser?.email,
      dialCode: authUser?.dialCode,
      country: authUser?.country,
      phoneNumber: authUser?.phoneNumber,
    };

    const formError = FormValidation(reqData);
    if (formError) {
      const obj = {};
      formError?.errorArr?.map(item => {
        obj[item] = formError?.message;
      });

      setErrorField({
        ...{
          name: '',
          email: '',
          dialCode: '',
          country: '',
          phoneNumber: '',
        },
        ...obj,
      });
    } else if (photo.length === 0) {
      PopUp({
        heading: 'Please upload a picture',
        bottomOffset: 0.7,
        visibilityTime: 3000,
        position: 'top',
      });
    } else {
      setErrorField({
        name: '',
        email: '',
        dialCode: '',
        country: '',
        phoneNumber: '',
      });
      var currentLoc;
      if (common?.authCoordinates) {
        if (common?.authCoordinates?.coordinates.length > 0) {
          currentLoc = {coordinates: common?.authCoordinates?.coordinates};
        }
      } else {
        let res = await getLatLong();
        let tempArr = [];
        let latitude = res.lat;
        let longitude = res.lng;
        tempArr.push(latitude, longitude);
        currentLoc = {coordinates: tempArr};
      }

      const reqData = {
        displayName: authUser?.name,
        role: 'driver',
        dialCode: authUser?.dialCode,
        country: authUser?.country,
        countryCode: countryCode,
        email: authUser?.email,
        currentLocation: currentLoc,
        contact: authUser?.phoneNumber,
      };
      navigation.navigate('Step2', {
        step1Data: reqData,
      });
    }
  };

  return (
    <SafeAreaView>
      <StatusBar
        style={{flex: 0, backgroundColor: 'green'}}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : ' light-content'}
      />
      <ScrollView
        style={{
          ...R.styles.container,
          ...styles.mainLayout,
        }}
        keyboardShouldPersistTaps={'always'}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          paddingBottom: R.unit.scale(50),
        }}>
        <View style={styles.formView}>
          <Text
            variant={'h5'}
            font={'Sequel451'}
            gutterBottom={5}
            color={R.color.white}
            align={'left'}
            transform={'none'}>
            Create your
          </Text>
          <Text
            variant={'largeTitle'}
            font={'Sequel451'}
            gutterBottom={10}
            color={R.color.mainColor}
            align={'left'}
            transform={'none'}>
            Driver Account
          </Text>
          <Text
            variant={'body2'}
            font={'PoppinsMedium'}
            gutterBottom={R.unit.scale(25)}
            color={R.color.white}
            align={'left'}
            transform={'none'}>
            Create your new account
          </Text>

          <View style={styles.profilePictureLayout}>
            {!photo ? (
              <Imagec
                resizeMode="cover"
                style={styles.profileImage}
                imageStyle={{borderRadius: R.unit.scale(120)}}
                source={R.image.userPin()}
              />
            ) : (
              <Imagec
                resizeMode="cover"
                style={styles.profileImage}
                imageStyle={{borderRadius: R.unit.scale(120)}}
                source={{uri: photo}}
              />
            )}
            <TouchableOpacity
              onPress={uploadImage}
              activeOpacity={0.7}
              style={[
                {
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                },
              ]}>
              <View style={styles.iconView}>
                <Icon
                  name={'camera'}
                  size={15}
                  type={'Ionicons'}
                  color={R.color.black}
                />
              </View>
            </TouchableOpacity>
          </View>
          <TextInput
            secureText={false}
            placeholder={'Name'}
            onChangeText={text => {
              setAuthUser({...authUser, name: text});
            }}
            color={R.color.white}
            value={authUser?.name}
            gutterBottom={24}
            iconName={'user'}
            iconType={'FontAwesome'}
            formError={errorField?.name}
          />

          <TextInput
            secureText={false}
            placeholder={'Email'}
            onChangeText={text => {
              setAuthUser({...authUser, email: text});
            }}
            color={R.color.white}
            value={authUser?.email}
            width={0.94}
            gutterBottom={24}
            iconName={'envelope'}
            iconType={'FontAwesome'}
            formError={errorField?.email}
          />

          <DropDown
            zIndex={1000}
            zIndexInverse={2000}
            zIndexIOS={10}
            arrayData={countriesDialCode}
            placeholder={'Select Country'}
            loaderParentCall={countryDropDown}
            schema={{
              label: 'title',
              value: 'title',
            }}
            search={true}
            value={authUser?.country}
            gutterBottom={24}
            formError={errorField?.country}
            iconName={'globe'}
            iconType={'FontAwesome'}
          />

          <View
            style={{
              ...R.styles.rowView,
              marginBottom: R.unit.scale(errorField?.phoneNumber ? 36 : 24),
            }}>
            <View style={[R.styles.rowView, styles.countryFlag]}>
              <CountryFlag
                isoCode={countryCode ? countryCode : 'AU'}
                size={20}
              />
              <Text
                variant={'body2'}
                font={'bold'}
                color={R.color.white}
                align={'left'}
                transform={'none'}>
                {authUser?.dialCode}
              </Text>
            </View>
            <View style={styles.phoneNumberField}>
              <TextInput
                secureText={false}
                placeholder={'Phone'}
                onChangeText={text => {
                  setAuthUser({...authUser, phoneNumber: text});
                }}
                color={R.color.white}
                value={authUser?.phoneNumber}
                inputWidth={R.unit.width(1) > 900 ? 0.82 : 0.68}
                widthInPercent={R.unit.width(1) > 900 ? '97%' : '100%'}
                errorMBottom={Platform.OS === 'ios' ? -25 : -20}
                keyboardType={'phone-pad'}
                iconName={'phone-alt'}
                iconType={'FontAwesome5'}
                formError={errorField?.phoneNumber}
              />
            </View>
          </View>
        </View>

        <View style={styles.nextButtonLayout}>
          <TouchableNativeFeedback
            delayPressIn={0.1}
            delayPressOut={0.1}
            delayLongPress={0.1}
            onPress={onSubmit}
            background={TouchableNativeFeedback.Ripple('#42700b', false, 27)}>
            <View
              style={{
                backgroundColor: R.color.mainColor,
                padding: R.unit.scale(15),
                borderRadius: R.unit.scale(100),
                overflow: 'hidden',
              }}>
              <Icon
                name={'arrowright'}
                type={'AntDesign'}
                size={20}
                color={R.color.black}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default Step1Screen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.black,
  },
  formView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginTop: R.unit.scale(50),
  },
  footerImage: {
    marginTop: R.unit.scale(50),
    width: '100%',
  },
  forgetPassView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  countryFlag: {
    width: R.unit.scale(100),
    borderRadius: R.unit.scale(100),
    borderColor: R.color.white,
    borderWidth: R.unit.scale(1),
    paddingHorizontal: R.unit.scale(10),
    paddingVertical: R.unit.scale(12),
  },
  phoneNumberField: {
    flex: 1,
    paddingLeft: R.unit.scale(10),
  },
  profilePictureLayout: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    marginBottom: R.unit.scale(50),
    borderRadius: R.unit.scale(10),
    width: R.unit.scale(120),
    height: R.unit.scale(120),
    borderWidth: R.unit.scale(5),
    borderColor: R.color.gray,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  iconView: {
    backgroundColor: R.color.mainColor,
    padding: R.unit.scale(10),
    borderRadius: R.unit.scale(30),
    overflow: 'hidden',
    borderColor: R.color.black,
    borderWidth: R.unit.scale(4),
  },
  nextButtonLayout: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    // marginTop: R.unit.scale(24),
    width: '100%',
  },
});
