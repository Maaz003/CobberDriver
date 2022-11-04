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

function Step2Screen(props) {
  const {navigation} = props;
  const {step1Data} = props.route.params;
  const [authUser, setAuthUser] = useState({
    nic: '',
    license: '',
    residence: '',
    model: '',
  });
  const [errorField, setErrorField] = useState({
    nic: '',
    license: '',
    residence: '',
    model: '',
  });

  const onSubmit = async () => {
    navigation.navigate('Step3', {
      step2Data: {},
    });
    // const reqData = {
    //   license: authUser?.license,
    //   nic: authUser?.nic,
    //   residence: authUser?.residence,
    //   model: authUser?.model,
    // };

    // const formError = FormValidation(reqData);
    // if (formError) {
    //   const obj = {};
    //   formError?.errorArr?.map(item => {
    //     obj[item] = formError?.message;
    //   });

    //   setErrorField({
    //     ...{
    //       nic: '',
    //       license: '',
    //       residence: '',
    //       model: '',
    //     },
    //     ...obj,
    //   });
    // } else {
    //   setErrorField({
    //     nic: '',
    //     license: '',
    //     residence: '',
    //     model: '',
    //   });

    //   const reqData = {
    //     license: authUser?.license,
    //     nic: authUser?.nic,
    //     residence: authUser?.country,
    //     model: authUser?.model,
    //   };
    //   navigation.navigate('Step3', {
    //     step2Data: {...step1Data, ...reqData},
    //   });
    // }
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
              font={'bold'}
              gutterBottom={30}
              color={R.color.mainColor}
              align={'left'}
              transform={'none'}>
              Driver Details
            </Text>
          </Text>

          <TextInput
            secureText={false}
            placeholder={`Driver's License`}
            onChangeText={text => {
              setAuthUser({...authUser, license: text});
            }}
            color={R.color.white}
            value={authUser?.license}
            gutterBottom={24}
            iconName={'idcard'}
            iconType={'AntDesign'}
            formError={errorField?.license}
          />

          <TextInput
            secureText={false}
            placeholder={`Driver's NIC`}
            onChangeText={text => {
              setAuthUser({...authUser, nic: text});
            }}
            color={R.color.white}
            value={authUser?.nic}
            width={0.94}
            gutterBottom={24}
            iconName={'id-card'}
            iconType={'FontAwesome5'}
            formError={errorField?.nic}
          />

          <TextInput
            secureText={false}
            placeholder={`Proof of Residence`}
            onChangeText={text => {
              setAuthUser({...authUser, residence: text});
            }}
            color={R.color.white}
            value={authUser?.residence}
            width={0.94}
            gutterBottom={24}
            iconName={'house-user'}
            iconType={'FontAwesome5'}
            formError={errorField?.residence}
          />

          <TextInput
            secureText={false}
            placeholder={`Vehcile Model`}
            onChangeText={text => {
              setAuthUser({...authUser, model: text});
            }}
            color={R.color.white}
            value={authUser?.model}
            width={0.94}
            gutterBottom={24}
            iconName={'truck'}
            iconType={'MaterialCommunityIcons'}
            formError={errorField?.model}
          />
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
export default Step2Screen;

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
