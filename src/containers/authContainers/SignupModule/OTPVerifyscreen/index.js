import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Post} from '@axios/AxiosInterceptorFunction';
import {URL, apiHeader} from '@config/apiUrl';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import Toast from '@components/utils/Toast';
import R from '@components/utils/R';
import {Footer} from '@components/utils/Svg';
import OTPInput from '@components/common/OTP';
import Icon from '@components/common/Icon';
import AuthBoiler from '@components/layout/AuthBoiler/ScreenBoiler';

const originalWidth = 463;
const originalHeight = 155;
const aspectRatio = originalWidth / originalHeight;
const windowWidth = Dimensions.get('window').width;

function OTPVerifyScreen(props) {
  const {navigation} = props;
  const Header = apiHeader(false, true);
  const {user} = props.route.params;
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 4;

  useEffect(() => {
    if (isPinReady) {
      Keyboard.dismiss();
    }
  }, [isPinReady]);

  const onSubmit = async () => {
    // navigation.navigate('VerfiySucess');

    setIsLoading(true);
    if (!code || code?.length < 4) {
      setCodeError(true);
    } else {
      try {
        const reqData = {
          user,
          otp: code,
        };
        const verifyOTPUrl = URL('auth/verify/otp');
        const response = await Post(verifyOTPUrl, reqData);

        if (response !== undefined) {
          Toast.show({
            title: 'Account Created Successfully',
            message: 'Login and get your goods delivered successfully',
          });
          navigation.navigate('VerfiySucess');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        Toast.show({
          title: 'Account Creation Failed',
          message: `${error}`,
          type: 'danger',
        });
      }

      setCodeError(false);
    }
    setIsLoading(false);
  };

  const resendOtp = () => {};

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <AuthBoiler>
      <KeyboardAwareScrollView
        style={R.styles.container}
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          paddingBottom: R.unit.scale(10),
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
            variant={R.unit.tabSizeCalc('h6', 'h5')}
            font={'Sequel451'}
            gutterBottom={5}
            color={R.color.white}
            align={'left'}
            transform={'none'}>
            Enter your
          </Text>
          <Text
            variant={R.unit.tabSizeCalc('h2', 'largeTitle')}
            font={'Sequel451'}
            gutterBottom={10}
            color={R.color.mainColor}
            align={'left'}
            letterSpacing={2}
            transform={'none'}>
            Verification {`\n`}
            Code
          </Text>
          <Text
            variant={R.unit.height(1) > 850 ? 'h6' : 'body1'}
            font={'PoppinsMedium'}
            gutterBottom={25}
            color={R.color.white}
            align={'left'}
            transform={'none'}>
            We have sent a code on your number
          </Text>
          <OTPInput
            code={code}
            setCode={setCode}
            maximumLength={maximumCodeLength}
            setIsPinReady={setIsPinReady}
          />

          <Button
            value="Verify"
            bgColor={R.color.mainColor}
            disabled={!isPinReady}
            width={'100%'}
            size={'lg'}
            variant={'body1'}
            font={'PoppinsMedium'}
            color={'black'}
            gutterTop={20}
            loaderColor={R.color.black}
            borderRadius={100}
            borderColor={R.color.mainColor}
            loader={isLoading}
            onPress={onSubmit}
            borderWidth={1}
          />
          <Text
            variant={'body2'}
            font={'PoppinsMedium'}
            gutterTop={R.unit.scale(30)}
            color={R.color.white}
            align={'center'}
            transform={'none'}>
            Didn't receive a code?{' '}
            <Text
              variant={'body2'}
              font={'PoppinsMedium'}
              color={R.color.mainColor}
              align={'center'}
              style={{
                paddingVertical: R.unit.scale(10),
                marginLeft: R.unit.scale(5),
              }}
              onPress={resendOtp}
              transform={'none'}>
              Resend
            </Text>
          </Text>
        </View>

        <View style={styles.footerImage}>
          <Footer
            width="100%"
            height="100%"
            viewBox={`0 0 ${originalWidth} ${originalHeight}`}
          />
        </View>
      </KeyboardAwareScrollView>
    </AuthBoiler>
  );
}
export default OTPVerifyScreen;

const styles = StyleSheet.create({
  formView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginTop: R.unit.scale(30),
    paddingHorizontal: R.unit.scale(10),
  },
  footerImage: {
    width: '100%',
    aspectRatio,
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerView: {
    zIndex: 99999,
    width: '100%',
    paddingVertical: R.unit.scale(10),
    marginBottom: R.unit.tabSizeCalc(R.unit.scale(40), R.unit.scale(90)),
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
