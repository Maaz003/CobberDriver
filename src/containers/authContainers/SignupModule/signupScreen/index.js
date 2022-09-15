import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Post} from '@axios/AxiosInterceptorFunction';
import CountryFlag from 'react-native-country-flag';
import Geocoder from 'react-native-geocoding';
import {useDispatch, useSelector} from 'react-redux';
import {GOOGLE_GEOCODE} from '@env';
import {URL} from '@config/apiUrl';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import TextInput from '@components/common/TextInput';
import Toast from '@components/utils/Toast';
import R from '@components/utils/R';
import {Footer} from '@components/utils/Svg';
import DropDown from '@components/common/DropDown';
import {countriesDialCode, states} from '@components/constants';
import CurrentLocation from '@components/utils/CurrentLocation';
import FormValidation from '@components/utils/FormValidation';

const originalWidth = 463;
const originalHeight = 170;
const aspectRatio = originalWidth / originalHeight;
const windowWidth = Dimensions.get('window').width;

function SignupScreen(props) {
  const {navigation} = props;
  Geocoder.init(GOOGLE_GEOCODE);
  const dispatch = useDispatch();
  const headers = new Headers();
  const common = useSelector(state => state.common);
  const user = useSelector(state => state.user);
  const [countryCode, setCountryCode] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [cityData, setCityData] = useState([]);
  const [authUser, setAuthUser] = useState({
    name: '',
    email: '',
    dialCode: '+61',
    country: '',
    state: '',
    city: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    currentLoc: undefined,
  });
  const [errorField, setErrorField] = useState({
    name: '',
    gender: '',
    email: '',
    dialCode: '',
    country: '',
    state: '',
    city: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [filteredStates, setFilteredStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let tempCountry = '';

  headers.append(
    'X-CSCAPI-KEY',
    'VjlSNUFCZXhaVWU2Yktuenl3bU1CRFA0a2FBbXhrYzNuTGlsOU5JZw==',
  );

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  useEffect(() => {
    CurrentLocation({actionCall: dispatch});
  }, []);

  useEffect(() => {
    fetchStates();
  }, [countryCode]);

  useEffect(() => {
    fetchCities();
  }, [countryCode, stateCode]);

  useEffect(() => {
    if (common?.authCoordinates !== undefined) {
      const {country, state, city, countCode} = common?.authCoordinates;
      let dc = countriesDialCode.find(item => item.code.includes(countCode));
      let sc = states.find(item => item.name.includes(state));
      setCountryCode(countCode);
      setStateCode(sc.stateCode);
      tempCountry = country;
      setAuthUser({
        ...authUser,
        country: country,
        state: state,
        city: city,
        dialCode: dc.dial_code,
      });
    } else {
      setCountryCode('+61');
      setAuthUser({
        ...authUser,
        country: '',
        state: '',
        city: '',
        dialCode: '',
      });
    }
  }, [common?.authCoordinates]);

  useEffect(() => {
    setAuthUser({
      ...authUser,
      state: '',
      city: '',
    });
  }, [tempCountry, authUser?.country]);

  const fetchStates = async data => {
    await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const res = result;
        let states = res?.map(item => {
          return {
            title: item?.name,
            value: item?.name,
            iso2: item?.iso2,
          };
        });
        setFilteredStates(states);
      })
      .catch(error => console.log('error ', error));
  };

  const fetchCities = async () => {
    await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const res = result;
        let cities = res?.map(item => {
          return {
            title: item?.name,
            value: item?.name,
          };
        });
        setCityData(cities);
      })
      .catch(error => console.log('error ', error));
  };

  const getLatLong = async () => {
    return Geocoder.from(authUser?.city)
      .then(json => {
        var location = json.results[0].geometry.location;
        return location;
      })
      .catch(error => console.warn(error));
  };

  const countryDropDown = useCallback(
    childData => {
      let dataObj = '';
      dataObj = childData;
      fetchStates(dataObj?.code);
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

  const stateDropDown = useCallback(
    data => {
      setStateCode(data?.iso2);
      setAuthUser({...authUser, state: data?.value});
    },
    [
      {...authUser, country: authUser?.country},
      {...authUser, dialCode: authUser?.dialCode},
    ],
  );

  const onSubmit = async () => {
    // navigation.navigate('Verification', {
    //   user: '2222',
    // });
    setIsLoading(true);
    const reqData = {
      name: authUser?.name,
      email: authUser?.email,
      dialCode: authUser?.dialCode,
      country: authUser?.country,
      state: authUser?.state,
      city: authUser?.city,
      phoneNumber: authUser?.phoneNumber,
      password: authUser?.password,
      confirmPassword: authUser?.confirmPassword,
    };

    const formError = FormValidation(reqData);
    if (formError) {
      setIsLoading(false);
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
          state: '',
          city: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        },
        ...obj,
      });
    } else {
      setErrorField({
        name: '',
        email: '',
        dialCode: '',
        country: '',
        state: '',
        city: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
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
        role: 'customer',
        dialCode: authUser?.dialCode,
        country: authUser?.country,
        countryCode: countryCode,
        state: authUser?.state,
        email: authUser?.email,
        city: authUser?.city,
        // gender: 'Male',
        currentLocation: currentLoc,
        contact: authUser?.phoneNumber,
        password: authUser?.password,
        passwordConfirm: authUser?.confirmPassword,
      };
      const signUrl = URL('auth/signup');
      const response = await Post(signUrl, reqData);
      if (response !== undefined) {
        Toast.show({
          title: 'Registered Successfully',
          message: `OTP has been sent on your number.Meantime ${response?.data?.data?.user?.verificationCode}`,
          duration: 4000,
        });
        navigation.navigate('Verification', {
          user: response?.data?.data?.user?._id,
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
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
            font={'bold'}
            gutterBottom={R.unit.scale(5)}
            color={R.color.white}
            align={'left'}
            transform={'none'}>
            Create your
          </Text>
          <Text
            variant={'extraLargeTitle'}
            font={'bold'}
            gutterBottom={R.unit.scale(10)}
            color={R.color.white}
            align={'left'}
            transform={'none'}>
            Account
          </Text>
          <Text
            variant={'h5'}
            font={'bold'}
            gutterBottom={R.unit.scale(25)}
            color={R.color.white}
            align={'left'}
            transform={'none'}>
            Login into your existing account{' '}
          </Text>

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

          <DropDown
            zIndex={1000}
            zIndexInverse={2000}
            zIndexIOS={10}
            arrayData={filteredStates}
            placeholder={'Select State'}
            loaderParentCall={stateDropDown}
            schema={{
              label: 'title',
              value: 'value',
            }}
            search={true}
            value={authUser?.state}
            gutterBottom={24}
            formError={errorField?.state}
            iconName={'city'}
            iconType={'MaterialCommunityIcons'}
          />

          <DropDown
            zIndex={1000}
            zIndexInverse={2000}
            zIndexIOS={10}
            arrayData={cityData}
            placeholder={'Select City'}
            loaderParentCall={data => {
              setAuthUser({...authUser, city: data.title});
            }}
            defaultValue={authUser.city}
            schema={{
              label: 'title',
              value: 'value',
            }}
            search={true}
            value={authUser?.city}
            gutterBottom={24}
            formError={errorField?.city}
            iconName={'home-city'}
            iconType={'MaterialCommunityIcons'}
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

          <TextInput
            secureText={true}
            placeholder={'Password'}
            onChangeText={text => {
              setAuthUser({...authUser, password: text});
            }}
            color={R.color.white}
            value={authUser?.password}
            gutterBottom={24}
            iconName={'locked'}
            iconType={'Fontisto'}
            formError={errorField?.password}
          />
          <TextInput
            secureText={true}
            placeholder={'Confirm Password'}
            onChangeText={text => {
              setAuthUser({...authUser, confirmPassword: text});
            }}
            color={R.color.white}
            value={authUser?.confirmPassword}
            gutterBottom={44}
            iconName={'locked'}
            iconType={'Fontisto'}
            formError={errorField?.confirmPassword}
          />

          <Button
            value="Signup"
            bgColor={R.color.mainColor}
            width={'100%'}
            size={'lg'}
            variant={'h6'}
            font={'bold'}
            color={'black'}
            borderRadius={100}
            borderColor={R.color.mainColor}
            loader={isLoading}
            disabled={isLoading}
            loaderColor={'white'}
            onPress={onSubmit}
            borderWidth={1}
          />
        </View>

        <View style={styles.footerImage}>
          <View style={{...R.styles.twoItemsRow, justifyContent: 'center'}}>
            <Text
              variant={'body2'}
              font={'bold'}
              color={R.color.white}
              align={'center'}
              transform={'none'}>
              Already have an account?
            </Text>
            <Text
              variant={'body2'}
              font={'bold'}
              color={R.color.mainColor}
              align={'center'}
              style={{
                paddingVertical: R.unit.scale(10),
                marginLeft: R.unit.scale(5),
              }}
              onPress={() => navigation.navigate('Login')}
              transform={'none'}>
              Login
            </Text>
          </View>
          <Footer
            width="100%"
            height="100%"
            viewBox={`0 0 ${originalWidth} ${originalHeight}`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default SignupScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.black,
    paddingTop: R.unit.scale(50),
  },
  formView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  footerImage: {
    marginTop: R.unit.scale(50),
    width: '100%',
    aspectRatio,
    width: windowWidth,
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
});
