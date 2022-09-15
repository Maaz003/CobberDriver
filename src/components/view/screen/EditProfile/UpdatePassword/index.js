import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {URL, apiHeader} from '@config/apiUrl';
import {Patch} from '@axios/AxiosInterceptorFunction';
import {updateUser, updateUserToken} from '@store/user/userSlice';
import TextInput from '@components/common/TextInput';
import Toast from '@components/utils/Toast';
import R from '@components/utils/R';
import FormValidation from '@components/utils/FormValidation';
import Button from '@components/common/Button';

function UpdatePassword(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userToken = user?.userToken;
  const {navigation} = props;

  const Header = apiHeader(userToken, false);
  const [isLoading, setIsLoading] = useState(false);
  const [authUser, setAuthUser] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errorField, setErrorField] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const updatePassword = async () => {
    setIsLoading(true);
    const reqData = {
      oldPassword: authUser?.oldPassword,
      newPassword: authUser?.newPassword,
      confirmNewPassword: authUser?.confirmNewPassword,
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
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        },
        ...obj,
      });
    } else {
      setErrorField({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      try {
        const updatePswd = URL('auth/updateMyPassword');
        const userData = {
          passwordCurrent: password?.oldPassword,
          password: password?.newPassword,
          passwordConfirm: password?.confirmNewPassword,
        };
        const response = await Patch(updatePswd, userData, Header);
        if (response !== undefined) {
          dispatch(updateUser(response?.data?.user));
          dispatch(updateUserToken(response?.data?.token));
          Toast.show({
            title: 'Hurrah!',
            message: 'Password Updated Successfully',
            type: 'success',
          });
          setIsLoading(false);
          navigation.navigate('Profile');
        } else {
          setIsLoading(false);
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
    <>
      <ScrollView
        style={[R.styles.container, styles.container]}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          alignItems: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'space-between',
          justifyContent: 'space-between',
          paddingBottom: Platform.OS === 'ios' ? 50 : 100,
        }}>
        <View style={styles.formView}>
          <TextInput
            secureText={true}
            placeholder={'Old Password'}
            onChangeText={value => {
              setAuthUser({...authUser, oldPassword: value});
            }}
            value={authUser?.oldPassword}
            borderRadius={0}
            gutterBottom={24}
            formErrorText={'Empty Field'}
            width={0.9}
            formError={errorField?.oldPassword}
            backgroundColor={R.color.lightSilverShade2}
            placeholdercolor={R.color.black}
            inputContainerStyles={{
              borderBottomWidth: R.unit.scale(1.5),
              borderBottomColor: R.color.black,
            }}
            eyeColor={R.color.black}
          />
          <TextInput
            secureText={true}
            placeholder={'New Password'}
            onChangeText={value => {
              setAuthUser({...authUser, newPassword: value});
            }}
            value={authUser?.newPassword}
            borderRadius={0}
            gutterBottom={24}
            width={0.9}
            formErrorText={'Empty Field'}
            fontSize={14}
            formError={errorField?.newPassword}
            backgroundColor={R.color.lightSilverShade2}
            placeholdercolor={R.color.black}
            inputContainerStyles={{
              borderBottomWidth: R.unit.scale(1.5),
              borderBottomColor: R.color.black,
            }}
            eyeColor={R.color.black}
          />
          <TextInput
            secureText={true}
            placeholder={'Confirm New Password'}
            onChangeText={value => {
              setAuthUser({
                ...authUser,
                confirmNewPassword: value,
              });
            }}
            value={authUser?.confirmNewPassword}
            borderRadius={0}
            width={0.9}
            gutterBottom={24}
            formErrorText={'Empty Field'}
            fontSize={14}
            formError={errorField?.confirmNewPassword}
            backgroundColor={R.color.lightSilverShade2}
            placeholdercolor={R.color.black}
            inputContainerStyles={{
              borderBottomWidth: R.unit.scale(1.5),
              borderBottomColor: R.color.black,
            }}
            eyeColor={R.color.black}
          />
        </View>
        <View style={styles.buttonLayout}>
          <Button
            value={'Update'}
            bgColor={R.color.mainColor}
            width={'90%'}
            size={'xmd'}
            variant={'h6'}
            font={'bold'}
            color={'black'}
            borderRadius={100}
            borderColor={R.color.mainColor}
            loader={isLoading}
            loaderColor={R.color.black}
            onPress={updatePassword}
          />
        </View>
      </ScrollView>
    </>
  );
}
export default UpdatePassword;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  formView: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  buttonLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: R.unit.scale(50),
  },
});
