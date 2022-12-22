import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  ImageBackground,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Text from '@components/common/Text';
import TextInput from '@components/common/TextInput';
import R from '@components/utils/R';
import FormValidation from '@components/utils/FormValidation';
import Icon from '@components/common/Icon';
import PictureOptionsModals from '@components/view/modal/PictureOptionsModal';
import Toast from '@components/utils/Toast';
import DropDown from '@components/common/DropDown';
import {useSelector} from 'react-redux';
import {useCallback} from 'react';
import AuthBoiler from '@components/layout/AuthBoiler/ScreenBoiler';

function Step2Screen(props) {
  const {navigation} = props;
  const {step1Data} = props.route.params;
  const common = useSelector(state => state.common);
  const [modalType, setModalType] = useState(undefined);
  const [activeIndex, setActiveIndex] = useState(undefined);
  const [isModal, setIsModal] = useState(false);
  const [authUser, setAuthUser] = useState({
    model: '',
    color: '',
    vehicle: '',
    vehicleId: '',
    licenseNumber: '',
  });
  const [errorField, setErrorField] = useState({
    model: '',
    color: '',
    vehicle: '',
    vehicleId: '',
    licenseNumber: '',
  });

  const [options, setOptions] = useState([
    {
      title: 'License',
      key: 'license',
      frontPicture: undefined,
      backPicture: undefined,
    },
    {
      title: 'Nic',
      key: 'nic',
      frontPicture: undefined,
      backPicture: undefined,
    },
    {
      title: 'Proof Of Residence',
      key: 'residence',
      frontPicture: undefined,
      backPicture: undefined,
    },
  ]);

  const openModal = (type, slotNo) => {
    setIsModal(!isModal);
    setModalType(type);
    setActiveIndex(slotNo);
  };

  const uploadPicture = data => {
    if (modalType === 'nic') {
      pictureNic(data);
    } else if (modalType === 'license') {
      pictureLicense(data);
    } else {
      pictureResidence(data);
    }
  };

  const pictureLicense = data => {
    let tempArr = JSON.parse(JSON.stringify(options));
    let obj = tempArr.find(item => item.key === modalType);
    obj[activeIndex] = data;
    setOptions(tempArr);
  };

  const pictureNic = data => {
    let tempArr = JSON.parse(JSON.stringify(options));
    let obj = tempArr.find(item => item.key === modalType);
    obj[activeIndex] = data;
    setOptions(tempArr);
  };

  const pictureResidence = data => {
    let tempArr = JSON.parse(JSON.stringify(options));
    let obj = tempArr.find(item => item.key === modalType);
    obj[activeIndex] = data;
    setOptions(tempArr);
  };

  const vehicleDropDown = useCallback(
    childData => {
      let dataObj = '';
      dataObj = childData;
      setAuthUser({
        ...authUser,
        vehicle: dataObj.name,
        vehicleId: dataObj._id,
      });
    },
    [{...authUser, vehicle: authUser?.vehicle}],
  );

  const onSubmit = async () => {
    let res = options?.every(
      item =>
        item?.backPicture !== undefined && item?.frontPicture !== undefined,
    );
    if (!res) {
      Toast.show({
        title: 'Pictures not uploaded',
        message: 'Kindly upload all pictures',
        type: 'danger',
      });
    } else {
      const formData = {
        model: authUser?.model,
        color: authUser?.color,
        vehicle: authUser?.vehicle,
        vehicleId: authUser?.vehicleId,
        licenseNumber: authUser?.licenseNumber,
      };
      const formError = FormValidation(formData);
      if (formError) {
        const obj = {};
        formError?.errorArr?.map(item => {
          obj[item] = formError?.message;
        });
        setErrorField({
          ...{
            model: '',
            color: '',
            vehicle: '',
            vehicleId: '',
          },
          ...obj,
        });
      } else {
        setErrorField({
          model: '',
        });
        const reqData = {
          model: authUser?.model,
          color: authUser?.color,
          pictures: options,
          vehicle: authUser?.vehicle,
          vehicleId: authUser?.vehicleId,
          licenseNumber: authUser?.licenseNumber,
        };
        navigation.navigate('Step3', {
          step2Data: {...step1Data, ...reqData},
        });
      }
    }
  };

  return (
    <AuthBoiler>
      <KeyboardAwareScrollView
        style={R.styles.container}
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
              font={'Sequel551'}
              gutterBottom={30}
              color={R.color.mainColor}
              align={'left'}
              transform={'none'}>
              Driver Details
            </Text>
          </Text>

          <DropDown
            zIndex={1000}
            zIndexInverse={2000}
            zIndexIOS={10}
            arrayData={common?.vehicles}
            placeholder={'Select Vehicle'}
            loaderParentCall={vehicleDropDown}
            schema={{
              label: 'name',
              value: 'name',
            }}
            search={true}
            widthInPercent={'100%'}
            value={authUser?.vehicle}
            gutterBottom={24}
            formError={errorField?.vehicle}
            iconName={'globe'}
            iconType={'FontAwesome'}
          />

          <TextInput
            secureText={false}
            placeholder={`Vehicle Model`}
            onChangeText={text => {
              setAuthUser({...authUser, model: text});
            }}
            color={R.color.white}
            value={authUser?.model}
            widthInPercent={'100%'}
            gutterBottom={24}
            iconName={'truck'}
            iconType={'MaterialCommunityIcons'}
            formError={errorField?.model}
          />
          <TextInput
            secureText={false}
            placeholder={`Vehicle Color`}
            onChangeText={text => {
              setAuthUser({...authUser, color: text});
            }}
            color={R.color.white}
            value={authUser?.color}
            widthInPercent={'100%'}
            gutterBottom={24}
            iconName={'truck'}
            iconType={'MaterialCommunityIcons'}
            formError={errorField?.color}
          />
          <TextInput
            secureText={false}
            placeholder={`License Number`}
            onChangeText={text => {
              setAuthUser({...authUser, licenseNumber: text});
            }}
            color={R.color.white}
            value={authUser?.licenseNumber}
            widthInPercent={'100%'}
            gutterBottom={24}
            iconName={'truck'}
            iconType={'MaterialCommunityIcons'}
            formError={errorField?.licenseNumber}
          />

          {options?.map(item => {
            return (
              <>
                <Text
                  variant={'body2'}
                  font={'PoppinsMedium'}
                  gutterBottom={10}
                  color={R.color.white}
                  align={'left'}
                  transform={'none'}>
                  {item.title} Pictures
                </Text>

                <View
                  style={{...R.styles.rowView, marginBottom: R.unit.scale(30)}}>
                  <>
                    <TouchableNativeFeedback
                      delayPressIn={0.1}
                      delayPressOut={0.1}
                      delayLongPress={0.1}
                      onPress={() => openModal(item.key, 'frontPicture')}
                      background={TouchableNativeFeedback.Ripple(
                        R.color.charcoalShade,
                        false,
                        300,
                      )}>
                      <View style={styles.touchableBox}>
                        {item.frontPicture ? (
                          <View style={styles.imageContainer}>
                            <ImageBackground
                              source={{uri: item.frontPicture?.path}}
                              style={{
                                height: '100%',
                                width: '100%',
                              }}
                              resizeMode={'cover'}
                            />
                            <View style={styles.overlay}>
                              <Icon
                                name={'pencil-outline'}
                                type={'MaterialCommunityIcons'}
                                size={20}
                                color={R.color.white}
                              />
                            </View>
                          </View>
                        ) : (
                          <>
                            <Icon
                              name={'paperclip'}
                              type={'Foundation'}
                              size={20}
                              color={R.color.white}
                            />
                            <Text
                              variant={'body4'}
                              gutterTop={10}
                              font={'PoppinsRegular'}
                              color={R.color.mainColor}
                              align={'center'}
                              transform={'none'}>
                              {item.title} {'Front Picture'}
                            </Text>
                          </>
                        )}
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      delayPressIn={0.1}
                      delayPressOut={0.1}
                      delayLongPress={0.1}
                      onPress={() => openModal(item.key, 'backPicture')}
                      background={TouchableNativeFeedback.Ripple(
                        R.color.charcoalShade,
                        false,
                        300,
                      )}>
                      <View style={styles.touchableBox}>
                        {item.backPicture ? (
                          <View style={styles.imageContainer}>
                            <ImageBackground
                              source={{uri: item?.backPicture?.path}}
                              style={{
                                height: '100%',
                                width: '100%',
                              }}
                              resizeMode={'cover'}
                            />
                            <View style={styles.overlay}>
                              <Icon
                                name={'pencil-outline'}
                                type={'MaterialCommunityIcons'}
                                size={20}
                                color={R.color.white}
                              />
                            </View>
                          </View>
                        ) : (
                          <>
                            <Icon
                              name={'paperclip'}
                              type={'Foundation'}
                              size={20}
                              color={R.color.white}
                            />
                            <Text
                              variant={'body4'}
                              gutterTop={10}
                              font={'PoppinsRegular'}
                              color={R.color.mainColor}
                              align={'center'}
                              transform={'none'}>
                              {item.title} Back Picture
                            </Text>
                          </>
                        )}
                      </View>
                    </TouchableNativeFeedback>
                  </>
                </View>
              </>
            );
          })}
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
      </KeyboardAwareScrollView>
      <PictureOptionsModals
        isVisibleModal={isModal}
        uploadPicture={uploadPicture}
      />
    </AuthBoiler>
  );
}
export default Step2Screen;

const styles = StyleSheet.create({
  formView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginTop: R.unit.scale(50),
    paddingHorizontal: R.unit.scale(10),
  },
  nextButtonLayout: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: R.unit.scale(10),
  },
  touchableBox: {
    backgroundColor: R.color.blackShade2,
    borderRadius: R.unit.scale(10),
    overflow: 'hidden',
    width: '47%',
    justifyContent: 'center',
    alignItems: 'center',
    height: R.unit.scale(100),
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
