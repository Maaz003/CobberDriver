import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableNativeFeedback,
} from 'react-native';
import Text from '@components/common/Text';
import TextInput from '@components/common/TextInput';
import R from '@components/utils/R';
import FormValidation from '@components/utils/FormValidation';
import Icon from '@components/common/Icon';
import PopUp from '@components/common/PopUp';

function Step3Screen(props) {
  const {navigation} = props;
  const {step2Data} = props.route.params;
  const [authUser, setAuthUser] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errorField, setErrorField] = useState({
    password: '',
    confirmPassword: '',
  });

  const onSubmit = async () => {
    // navigation.navigate('Verification', {
    //   user: '2222',
    // });
    const reqData = {
      password: authUser?.password,
      confirmPassword: authUser?.confirmPassword,
    };

    const formError = FormValidation(reqData);

    if (formError) {
      const obj = {};
      formError?.errorArr?.map(item => {
        obj[item] = formError?.message;
      });

      setErrorField({
        ...{
          password: '',
          confirmPassword: '',
        },
        ...obj,
      });
    } else {
      setErrorField({
        password: '',
        confirmPassword: '',
      });

      const reqData = {
        license: authUser?.license,
        nic: authUser?.nic,
        residence: authUser?.country,
        model: authUser?.model,
      };
      PopUp({
        heading: `Registered Successfully.sicationCode}`,
        bottomOffset: 0.8,
        visibilityTime: 3000,
        position: 'top',
      });
      // navigation.navigate('Verification');
      // const signUrl = URL('auth/signup');
      // const response = await Post(signUrl, reqData);
      // if (response !== undefined) {
      //   PopUp({
      //     heading: `Registered Successfully.Meantime ${response?.data?.data?.user?.verificationCode}`,
      //     bottomOffset: 0.8,
      //     visibilityTime: 5000,
      //     position: 'top',
      //   });
      //   navigation.navigate('Verification', {
      //     user: response?.data?.data?.user?._id,
      //   });
      //   setIsLoading(false);
      // } else {
      //   setIsLoading(false);
      // }
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
            variant={'h2'}
            font={'Sequel451'}
            gutterBottom={30}
            color={R.color.white}
            align={'left'}
            transform={'none'}>
            Enter{' '}
            <Text
              variant={'h2'}
              font={'Sequel451'}
              gutterBottom={30}
              color={R.color.mainColor}
              align={'left'}
              transform={'none'}>
              Password
            </Text>
          </Text>

          <TextInput
            secureText={true}
            placeholder={`Password`}
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
            placeholder={`Confirm Password`}
            onChangeText={text => {
              setAuthUser({...authUser, confirmPassword: text});
            }}
            color={R.color.white}
            value={authUser?.confirmPassword}
            width={0.94}
            gutterBottom={24}
            iconName={'locked'}
            iconType={'Fontisto'}
            formError={errorField?.confirmPassword}
          />
          <View style={{...R.styles.twoItemsRow, justifyContent: 'center'}}>
            <Text
              variant={'body2'}
              font={'PoppinsMedium'}
              color={R.color.white}
              align={'center'}
              transform={'none'}>
              Already have an account?
            </Text>
            <Text
              variant={'body2'}
              font={'PoppinsMedium'}
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
        </View>
        <View style={styles.nextButtonLayout}>
          <TouchableNativeFeedback
            delayPressIn={0.1}
            delayPressOut={0.1}
            delayLongPress={0.1}
            onPress={() => navigation.goBack()}
            background={TouchableNativeFeedback.Ripple('#42700b', false, 27)}>
            <View
              style={{
                backgroundColor: R.color.mainColor,
                padding: R.unit.scale(15),
                borderRadius: R.unit.scale(100),
                overflow: 'hidden',
              }}>
              <Icon
                name={'arrowleft'}
                type={'AntDesign'}
                size={20}
                color={R.color.black}
              />
            </View>
          </TouchableNativeFeedback>
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
export default Step3Screen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.black,
  },
  formView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginTop: R.unit.scale(50),
    // backgroundColor: 'purple',
  },
  nextButtonLayout: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    // backgroundColor: 'red',
    width: '100%',
  },
});
