import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Post, Get} from '@axios/AxiosInterceptorFunction';
import {URL, apiHeader} from '@config/apiUrl';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import Toast from '@components/utils/Toast';
import R from '@components/utils/R';
import {Footer} from '@components/utils/Svg';
import OTPInput from '@components/common/OTP';
import Icon from '@components/common/Icon';
import AuthBoiler from '@components/layout/AuthBoiler/ScreenBoiler';
import PopUp from '@components/common/PopUp';

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
  const [timerCount, setTimer] = useState(120);
  const [isResendable, setIsResendable] = useState(false);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);

  const maximumCodeLength = 4;

  useEffect(() => {
    if (isPinReady) {
      Keyboard.dismiss();
    }
  }, [isPinReady]);

  useEffect(() => {
    let interval;
    if (isResendable) {
      interval = setInterval(() => {
        if (timerCount > 0) {
          setTimer(lastTimerCount => {
            lastTimerCount <= 1 && clearInterval(interval);
            return lastTimerCount - 1;
          });
        }
      }, 1000);
    }

    if (timerCount === 0) {
      setIsResendable(false);
      setTimer(120);
    }

    return () => {
      if (isResendable) {
        clearInterval(interval);
      }
    };
  }, [isResendable, timerCount]);

  useEffect(() => {
    let minutes = Math.floor(timerCount / 60);
    let seconds = timerCount - minutes * 60;
    setSeconds(seconds);
    setMinutes(minutes);
  }, [timerCount, isResendable]);

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

  const resendOtp = async () => {
    setIsResendable(true);
    const getOTPUrl = URL(`auth/resend/code?user=${user}`);
    const response = await Get(getOTPUrl);
    PopUp({
      heading: `Verification Code .Meantime ${response?.data?.data?.code}`,
      bottomOffset: 0.8,
      visibilityTime: 5000,
      position: 'top',
    });
  };

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
            width={'100%'}
            size={'lg'}
            variant={'body1'}
            font={'PoppinsMedium'}
            color={'black'}
            gutterTop={20}
            gutterBottom={40}
            loaderColor={R.color.black}
            borderRadius={100}
            borderColor={R.color.mainColor}
            loader={isLoading}
            disabled={!isPinReady || isLoading}
            onPress={onSubmit}
            borderWidth={1}
          />
          <View style={R.styles.rowView}>
            <View style={R.styles.twoItemsRow}>
              <Text
                variant={'body2'}
                font={'PoppinsRegular'}
                color={R.color.white}
                align={'center'}
                transform={'none'}>
                Didn't receive a code?{' '}
              </Text>
              <TouchableOpacity
                onPress={resendOtp}
                disabled={isResendable}
                activeOpacity={0.7}>
                <Text
                  variant={'body2'}
                  font={'PoppinsSemiBold'}
                  color={isResendable ? R.color.gray : R.color.mainColor}
                  align={'center'}
                  transform={'none'}>
                  Resend
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              variant={'body2'}
              font={'PoppinsSemiBold'}
              color={R.color.mainColor}
              align={'center'}
              transform={'none'}>
              {minutes}:
              {seconds > 0 ? (seconds < 10 ? `0${seconds}` : seconds) : '00'}
            </Text>
          </View>
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
