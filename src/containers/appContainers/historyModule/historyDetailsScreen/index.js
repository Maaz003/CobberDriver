import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {URL, apiHeader, imageUrl} from '@config/apiUrl';
import {Patch} from '@axios/AxiosInterceptorFunction';
import {updateUser} from '@store/user/userSlice';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import TextInput from '@components/common/TextInput';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Toast from '@components/utils/Toast';
import PictureModal from '@components/view/modal/PictureModal';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';

const width = Dimensions.get('window').width;

function EditProfile(props) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const {navigation} = props;
  const headerProps = {
    isSubHeader: true,
    mainHeading: 'Profile',
  };
  const Header = apiHeader(false, true);

  const [isModal, setIsModal] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [picture, setPicture] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const updateURL = URL('users/updateMe');

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    contactNo: '',
    city: '',
    address: '',
    pictureTest: '',
    photo: '',
  });

  useEffect(() => {
    setProfile({
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      contactNo: user?.user?.contact,
      city: user?.user?.city,
      address: user?.user?.address,
      photo: imageUrl + user?.user?.photo,
    });
  }, [props.navigation, isFocused]);

  let firstNameDefault = profile?.firstName;
  let lastNameDefault = profile?.lastName;
  let contactNoDefault = profile?.contactNo;
  let cityStateDefault = profile?.city;
  let addressDefault = profile?.address;
  let photoDefault = imageUrl + profile?.photo;

  const openPicModal = () => {
    setIsModal(!isModal);
  };

  const formData = () => {
    var formData = new FormData();

    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    formData.append('contact', profile.contactNo);
    formData.append('address', profile.address);
    formData.append('city', profile.city);
    if (picture !== undefined) {
      formData.append('photo', {
        uri: profile?.photo,
        type: picture.mime,
        name: new Date() + '_image',
      });
    }
    return formData;
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (profile?.firstName == undefined || profile?.firstName?.length == 0) {
      setFirstNameError(true);
      setIsLoading(false);
    }
    if (profile?.lastName == undefined || profile?.lastName?.length == 0) {
      setLastNameError(true);
      setIsLoading(false);
    }
    if (profile?.contactNo == undefined || profile?.contactNo?.length == 0) {
      setContactNumberError(true);
      setIsLoading(false);
    }
    if (profile?.city == undefined || profile?.city?.length == 0) {
      setCityError(true);
      setIsLoading(false);
    }
    if (profile?.address == undefined || profile?.address?.length == 0) {
      setAddressError(true);
      setIsLoading(false);
    } else if (
      profile.firstName &&
      profile.lastName &&
      profile.address &&
      profile.city &&
      profile.contactNo
    ) {
      try {
        const userData = await formData();
        const response = await Patch(updateURL, userData, Header);
        if (response !== undefined) {
          const user = response?.data?.data?.user;
          dispatch(updateUser(user));
          Toast.show({
            title: 'Hurrah!',
            message: 'Profile Updated Successfully',
            type: 'success',
          });
          setIsLoading(false);
          navigation.navigate('Profile');
        } else {
          setIsLoading(false);
          Toast.show({
            title: 'Ooops!',
            message: 'Profile Not Updated',
            type: 'danger',
          });
        }
      } catch (error) {
        Toast.show({
          title: 'Ooops!',
          message: 'Profile Not Updated',
          type: 'danger',
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 50 : 100,
        }}>
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={{alignItems: 'center'}}>
          <View style={styles.profilePictureLayout}>
            {user?.user?.photo === undefined ||
            user?.user?.photo?.length === 0 ? (
              <Image
                resizeMode="cover"
                style={styles.profileImage}
                imageStyle={{borderRadius: R.unit.scale(120)}}
                source={R.image.userPin()}
              />
            ) : (
              <Image
                resizeMode="cover"
                style={styles.profileImage}
                imageStyle={{borderRadius: R.unit.scale(120)}}
                source={{uri: profile.photo}}
              />
            )}
            <TouchableOpacity
              onPress={openPicModal}
              style={[
                {
                  position: 'absolute',
                  bottom: 10,
                  right: 5,
                },
              ]}>
              <Icon
                name={'pencil'}
                size={25}
                type={'Octicons'}
                color={R.color.white}
                iconStyles={[
                  {
                    backgroundColor: '#3B3C40',
                    padding: 10,
                    borderRadius: 30,
                    overflow: 'hidden',
                  },
                ]}
              />
            </TouchableOpacity>
          </View>

          <TextInput
            secureText={false}
            placeholder={'Enter FirstName'}
            onChangeText={text => {
              setProfile({...profile, firstName: text});
            }}
            defaultValue={firstNameDefault}
            height={R.unit.scale(40)}
            inputWidth={0.9}
            width={0.9}
            gutterTop={0}
            gutterBottom={20}
            formErrorText={'Empty Field'}
            title={'First Name'}
            fontSize={14}
            formError={firstNameError}
            backgroundColor={R.color.lightSilverShade2}
            placeholdercolor={R.color.black}
            inputContainerStyles={{
              borderBottomWidth: 1.5,
              borderBottomColor: R.color.gray2,
            }}
            color={R.color.black}
          />
          <TextInput
            secureText={false}
            placeholder={'Enter LastName'}
            onChangeText={text => {
              setProfile({...profile, lastName: text});
            }}
            defaultValue={lastNameDefault}
            height={R.unit.scale(40)}
            inputWidth={0.9}
            width={0.9}
            gutterTop={0}
            fontSize={14}
            gutterBottom={20}
            formErrorText={'Empty Field'}
            title={'Last Name'}
            formError={firstNameError}
            backgroundColor={R.color.lightSilverShade2}
            placeholdercolor={R.color.black}
            inputContainerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: R.color.gray2,
            }}
            color={R.color.black}
          />
          <TextInput
            secureText={false}
            placeholder={'Enter PhoneNumber'}
            onChangeText={text => {
              setProfile({...profile, lastName: text});
            }}
            defaultValue={lastNameDefault}
            height={R.unit.scale(40)}
            inputWidth={0.9}
            width={0.9}
            gutterTop={0}
            fontSize={14}
            gutterBottom={20}
            formErrorText={'Empty Field'}
            title={'Phone Number'}
            formError={firstNameError}
            backgroundColor={R.color.lightSilverShade2}
            placeholdercolor={R.color.black}
            inputContainerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: R.color.gray2,
            }}
            color={R.color.black}
          />
          <TextInput
            secureText={false}
            placeholder={'Enter Email'}
            onChangeText={text => {
              setProfile({...profile, lastName: text});
            }}
            defaultValue={lastNameDefault}
            height={R.unit.scale(40)}
            inputWidth={0.9}
            width={0.9}
            gutterTop={0}
            fontSize={14}
            gutterBottom={20}
            formErrorText={'Empty Field'}
            title={'Email'}
            formError={firstNameError}
            backgroundColor={R.color.lightSilverShade2}
            placeholdercolor={R.color.black}
            inputContainerStyles={{
              borderBottomWidth: 1,
              borderBottomColor: R.color.gray2,
            }}
            color={R.color.black}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
      <PictureModal isVisibleModal={isModal} />
    </ScreenBoiler>
  );
}
export default EditProfile;

const styles = StyleSheet.create({
  container: {
    width: width,
    marginTop: R.unit.scale(30),
    paddingHorizontal: R.unit.scale(20),
  },
  buttonLayout: {
    width: '100%',
    marginBottom: 0,
    flexGrow: 0,
    overflow: 'scroll',
    paddingBottom: R.unit.scale(20),
    paddingHorizontal: R.unit.scale(17),
  },
  profilePictureLayout: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: R.unit.scale(60),
  },
  profileImage: {
    width: R.unit.scale(190),
    height: R.unit.scale(190),
    borderRadius: R.unit.scale(120),
    borderWidth: R.unit.scale(4),
    borderColor: R.color.blackShade2,
  },
  uploadIcon: {
    color: 'white',
    alignSelf: 'center',
    fontSize: R.unit.scale(22, 0.6),
    left: R.unit.scale(50),
    backgroundColor: '#707070',
    width: R.unit.scale(30),
    height: R.unit.scale(30),
    marginLeft: R.unit.scale(10),
    borderRadius: R.unit.scale(100),
    padding: R.unit.scale(4, 0.3),
  },
});
