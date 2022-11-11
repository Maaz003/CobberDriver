import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '@store/auth/authSlice';
import {getUserData} from '@store/user/userSlice';
import {URL} from '@config/apiUrl';
import {Post} from '@axios/AxiosInterceptorFunction';
import Text from '@components/common/Text';
import Toast from '@components/utils/Toast';
import validators from '@components/utils/Validators';
import {Footer} from '@components/utils/Svg';
import R from '@components/utils/R';
import TextInput from '@components/common/TextInput';
import Button from '@components/common/Button';
import Icon from '@components/common/Icon';
import AuthBoiler from '@components/layout/AuthBoiler/ScreenBoiler';

const originalWidth = 463;
const originalHeight = 155;
const aspectRatio = originalWidth / originalHeight;
const windowWidth = Dimensions.get('window').width;

function ForgetPasswordScreen(props) {
  const dispatch = useDispatch();
  const loginURL = URL('users/login');
  const {navigation} = props;

  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailError, setEmailError] = useState(false);

  const onPress = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const userData = {
      email,
    };
    if (email?.length === 0) {
      setEmailError(true);
      setIsLoading(false);
    } else {
      if (!email || !validators.emailREX.test(String(email).toLowerCase())) {
        setEmailError(true);
        setIsLoading(false);
      } else if (email) {
        // const response = await Post(loginURL, userData);
        // const user = response?.data;
        // if (user !== undefined) {
        //   Toast.show({
        //     title: 'Password Changed Sucess!',
        //     message: 'A link has been sent to your email.',
        //   });
        //   dispatch(login(user));
        //   dispatch(getUserData(user));
        //   setIsLoading(false);
        // }
        setEmailError(false);
      }
      setIsLoading(false);
    }
  };

  return (
    <AuthBoiler>
      <ScrollView
        style={R.styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <View style={styles.formView}>
          <View style={styles.headerView}>
            <TouchableOpacity
              onPress={onPress}
              activeOpacity={0.9}
              style={styles.iconView}>
              <Icon
                name={'arrow-back'}
                type={'MaterialIcons'}
                size={25}
                color={R.color.white}
              />
            </TouchableOpacity>
          </View>
          <Text
            variant={R.unit.tabSizeCalc('h2', 'largeTitle')}
            font={'Sequel451'}
            gutterTop={80}
            gutterBottom={R.unit.scale(10)}
            color={R.color.mainColor}
            align={'left'}
            transform={'none'}>
            Cobber
          </Text>
          <Text
            variant={'h5'}
            font={'Sequel451'}
            gutterBottom={R.unit.scale(25)}
            color={R.color.white}
            align={'left'}
            transform={'none'}>
            Reset your password
          </Text>

          <TextInput
            secureText={false}
            placeholder={'Email'}
            onChangeText={text => {
              setEmail(text);
            }}
            color={R.color.white}
            value={email}
            width={0.94}
            gutterTop={0}
            gutterBottom={20}
            borderColor={R.color.white}
            borderRadius={80}
            borderWidth={1}
            borderBottomWidth={1}
            iconName={'user'}
            iconType={'FontAwesome'}
            formError={emailError}
            formErrorText={'Kindly enter valid email'}
          />
          <Button
            value="Submit"
            bgColor={R.color.mainColor}
            width={'100%'}
            size={'lg'}
            height={50}
            color={'black'}
            borderRadius={100}
            borderColor={R.color.mainColor}
            loader={isLoading}
            loaderColor={'white'}
            onPress={onSubmit}
            borderWidth={1}
          />
        </View>

        <View style={styles.footerImage}>
          <Footer
            width="100%"
            height="100%"
            viewBox={`0 0 ${originalWidth} ${originalHeight}`}
          />
        </View>
      </ScrollView>
    </AuthBoiler>
  );
}
export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  formView: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: R.unit.scale(10),
  },
  footerImage: {
    width: '100%',
    aspectRatio,
    width: windowWidth,
  },
  forgetPassView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerView: {
    zIndex: 99999,
    width: R.unit.width(0.97),
    paddingVertical: R.unit.scale(10),
    marginTop: R.unit.scale(70),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconView: {
    backgroundColor: R.color.charcoalShade2,
    padding: R.unit.scale(10),
    borderRadius: R.unit.scale(10),
    borderColor: R.color.black,
  },
});
