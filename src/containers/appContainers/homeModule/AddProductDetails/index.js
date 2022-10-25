import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import {URL, apiHeader} from '@config/apiUrl';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import TextInput from '@components/common/TextInput';
import Toast from '@components/utils/Toast';
import R from '@components/utils/R';
import LocationCardBlack from '@components/view/cards/LocationPoint';
import Icon from '@components/common/Icon';
import ItemPictureModal from '@components/view/modal/ItemPictureModal';
import FormValidation from '@components/utils/FormValidation';
import SelectedPaymentMethod from '@components/view/screen/Home/SelectedPaymentMethod';
import DropDown from '@components/common/DropDown';
import {approxSizes, lengthMetric, weighthMetric} from '@components/constants';

function AddProductDetails(props) {
  const {navigation} = props;
  const Header = apiHeader(false, true);
  const [measurment, setMeasurment] = useState({
    length: '',
    lmetric: 'cm',
    width: '',
    wmetric: 'cm',
    depth: '',
    dmetric: 'cm',
    weight: '',
    wemetric: 'kg',
    goodType: '',
  });

  const [errorField, setErrorField] = useState({
    length: '',
    width: '',
    depth: '',
    weight: '',
    goodType: '',
    size: '',
  });

  const [size, setSize] = useState('');
  const [equipPictures, setEquipPictures] = useState([]);
  const [totalPictures, setTotalPictures] = useState(false);
  const [remaining, setRemaining] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalPic, setModalPic] = useState(false);
  const [show, setShow] = useState(true);

  const uploadImage = async () => {
    try {
      let pickerResult;
      pickerResult = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        multiple: true,
      });

      if (pickerResult) {
        let correctFormat = pickerResult.every(item => {
          return (
            item?.path.includes('.jpeg') ||
            item?.path.includes('.jpg') ||
            item?.path.includes('.png') ||
            item?.path.includes('.JPG') ||
            item?.path.includes('.PNG') ||
            item?.path.includes('.JPEG') ||
            item?.path.includes('.HEIC')
          );
        });

        if (correctFormat) {
          if (remaining < pickerResult?.length) {
            Toast.show({
              title: 'Picture Limit Exceeds',
              message: 'The total number of images are greater than 10 ',
              type: 'danger',
            });
          } else {
            addId(pickerResult);
          }
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

  const openModal = data => {
    setModalPic({...data});
    setIsModal(!isModal);
  };

  useEffect(() => {
    if (equipPictures?.length >= 10) {
      setTotalPictures(true);
    } else {
      setTotalPictures(false);
    }
  }, [equipPictures]);

  useEffect(() => {
    if (size.length > 0) {
      setShow(false);
      setErrorField({
        length: '',
        width: '',
        depth: '',
        weight: '',
        goodType: '',
      });
    } else {
      setShow(true);
    }
  }, [size]);

  const deleteParent = id => {
    let updatedData = equipPictures.filter(item => item.id !== id);
    setEquipPictures(updatedData);
    setRemaining(remaining + 1);
  };

  const addId = data => {
    if (equipPictures?.length === 0) {
      let updatedData = data.map(item => {
        item.id = uuid.v4();
        return item;
      });
      let filled = 10 - updatedData?.length;
      setRemaining(filled);
      setEquipPictures(updatedData);
    } else {
      let updatedData = data.map(item => {
        item.id = uuid.v4();
        return item;
      });
      let newArr = [...equipPictures, ...updatedData];
      let filled = 10 - newArr?.length;
      setRemaining(filled);
      setEquipPictures(newArr);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (size.length > 0) {
      navigation.navigate('SelectVehicle');
      setIsLoading(false);
    } else {
      const reqData = {
        length: measurment.length,
        width: measurment.width,
        depth: measurment.depth,
        weight: measurment.weight,
        goodType: measurment.goodType,
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
            length: '',
            width: '',
            depth: '',
            weight: '',
            goodType: '',
          },
          ...obj,
        });
      } else {
        setErrorField({
          length: '',
          width: '',
          depth: '',
          weight: '',
          goodType: '',
        });
        setIsLoading(false);
        navigation.navigate('SelectVehicle');
      }
    }
  };

  const onNavigateCards = () => {
    navigation.navigate('Payment', {
      type: 'product',
    });
  };

  const onPress = () => {
    navigation.goBack();
  };

  const clearDropDown = () => {
    setShow(true);
    setSize('');
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={[R.styles.container, styles.mainLayout]}
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={[R.styles.twoItemsRow, styles.headerView]}>
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
          <Text
            variant={'h3'}
            font={'semiBold'}
            color={R.color.black}
            align={'center'}
            style={{
              flex: 1,
              marginRight: R.unit.scale(20),
            }}
            transform={'none'}>
            Product Details
          </Text>
        </View>
        <LocationCardBlack />
        <View style={styles.formView}>
          <Text
            variant={'body1'}
            font={'semiBold'}
            color={R.color.black}
            align={'left'}
            gutterBottom={20}
            transform={'none'}>
            Please estimate the follow details of the product to be couriered in
            the form below
          </Text>

          <TextInput
            secureText={false}
            placeholder={'Item Description'}
            placeholdercolor={R.color.black}
            onChangeText={text => {
              setMeasurment({...measurment, goodType: text});
            }}
            value={measurment?.goodType}
            backgroundColor={'transparent'}
            gutterBottom={24}
            borderColor={R.color.gray}
            borderBottomWidth={1}
            borderWidth={0}
            borderRadius={0}
            formError={errorField?.goodType}
          />
          <View
            style={{
              ...R.styles.rowView,
              marginBottom: R.unit.scale(24),
              width: '100%',
            }}>
            <DropDown
              zIndex={1000}
              zIndexInverse={2000}
              zIndexIOS={10}
              arrayData={approxSizes}
              width={0.88}
              placeholder={'Approx size'}
              loaderParentCall={data => {
                setSize(data.title);
              }}
              schema={{
                label: 'title',
                value: 'title',
              }}
              search={false}
              value={size}
              formError={errorField?.size}
              bgColor={R.color.lightSilverShade1}
              borderColor={R.color.lightSilverShade1}
              color={R.color.black}
              placeholderColor={R.color.black}
              rightIconColor={R.color.black}
              containerStyles={{
                borderBottomWidth: 1,
                borderBottomColor: R.color.gray,
                borderRadius: 0,
                paddingHorizontal: 1,
              }}
            />
            <TouchableOpacity
              onPress={clearDropDown}
              disabled={show}
              style={{marginRight: R.unit.scale(4)}}>
              <Icon
                name={'cross'}
                type={'Entypo'}
                size={20}
                color={R.color.black}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'column',
              display: show ? 'flex' : 'none',
              width: '100%',
            }}>
            <View style={[R.styles.rowView, styles.fields]}>
              <TextInput
                secureText={false}
                placeholder={'Width'}
                placeholdercolor={R.color.black}
                onChangeText={text => {
                  setMeasurment({...measurment, width: text});
                }}
                value={measurment?.width}
                backgroundColor={'transparent'}
                width={0.68}
                borderColor={R.color.gray}
                borderBottomWidth={1}
                borderWidth={0}
                borderRadius={0}
                formError={errorField?.width}
                keyboardType={'decimal-pad'}
                errorMBottom={-24}
              />
              <DropDown
                zIndex={1000}
                zIndexInverse={2000}
                zIndexIOS={10}
                arrayData={lengthMetric}
                width={0.24}
                placeholder={'cm'}
                loaderParentCall={data => {
                  setMeasurment({...measurment, wmetric: data.title});
                }}
                schema={{
                  label: 'title',
                  value: 'title',
                }}
                search={false}
                gutterBottom={Platform.OS === 'ios' ? 5 : 1.5}
                value={measurment.wemetric}
                formError={errorField?.size}
                bgColor={R.color.lightSilverShade1}
                borderColor={R.color.lightSilverShade1}
                color={R.color.black}
                placeholderColor={R.color.black}
                rightIconColor={R.color.black}
                containerStyles={{
                  borderBottomWidth: 1,
                  borderBottomColor: R.color.gray,
                  borderRadius: 0,
                  paddingHorizontal: 1,
                }}
              />
            </View>

            <View style={[R.styles.rowView, styles.fields]}>
              <TextInput
                secureText={false}
                placeholder={'Depth'}
                placeholdercolor={R.color.black}
                onChangeText={text => {
                  setMeasurment({...measurment, depth: text});
                }}
                value={measurment.depth}
                backgroundColor={'transparent'}
                borderColor={R.color.gray}
                borderBottomWidth={1}
                borderWidth={0}
                borderRadius={0}
                width={0.68}
                formError={errorField?.depth}
                keyboardType={'decimal-pad'}
                errorMBottom={-24}
              />
              <DropDown
                zIndex={1000}
                zIndexInverse={2000}
                zIndexIOS={10}
                arrayData={lengthMetric}
                width={0.24}
                placeholder={'cm'}
                loaderParentCall={data => {
                  setMeasurment({...measurment, dmetric: data.title});
                }}
                schema={{
                  label: 'title',
                  value: 'title',
                }}
                search={false}
                gutterBottom={Platform.OS === 'ios' ? 5 : 1.5}
                value={measurment.dmetric}
                formError={errorField?.size}
                bgColor={R.color.lightSilverShade1}
                borderColor={R.color.lightSilverShade1}
                color={R.color.black}
                placeholderColor={R.color.black}
                rightIconColor={R.color.black}
                containerStyles={{
                  borderBottomWidth: 1,
                  borderBottomColor: R.color.gray,
                  borderRadius: 0,
                  paddingHorizontal: 1,
                }}
              />
            </View>

            <View style={[R.styles.rowView, styles.fields]}>
              <TextInput
                secureText={false}
                placeholder={'Length'}
                placeholdercolor={R.color.black}
                onChangeText={text => {
                  setMeasurment({...measurment, length: text});
                }}
                value={measurment?.length}
                backgroundColor={'transparent'}
                borderColor={R.color.gray}
                borderBottomWidth={1}
                borderWidth={0}
                borderRadius={0}
                width={0.68}
                formError={errorField?.length}
                keyboardType={'decimal-pad'}
                errorMBottom={-24}
              />
              <DropDown
                zIndex={1000}
                zIndexInverse={2000}
                zIndexIOS={10}
                arrayData={lengthMetric}
                width={0.24}
                placeholder={'cm'}
                loaderParentCall={data => {
                  setMeasurment({...measurment, lmetric: data.title});
                }}
                schema={{
                  label: 'title',
                  value: 'title',
                }}
                search={false}
                value={measurment.lmetric}
                gutterBottom={Platform.OS === 'ios' ? 5 : 1.5}
                formError={errorField?.size}
                bgColor={R.color.lightSilverShade1}
                borderColor={R.color.lightSilverShade1}
                color={R.color.black}
                placeholderColor={R.color.black}
                rightIconColor={R.color.black}
                containerStyles={{
                  borderBottomWidth: 1,
                  borderBottomColor: R.color.gray,
                  borderRadius: 0,
                  paddingHorizontal: 1,
                }}
              />
            </View>

            <View style={[R.styles.rowView, styles.fields]}>
              <TextInput
                secureText={false}
                placeholder={'Weight'}
                placeholdercolor={R.color.black}
                onChangeText={text => {
                  setMeasurment({...measurment, weight: text});
                }}
                value={measurment?.weight}
                backgroundColor={'transparent'}
                width={0.68}
                borderColor={R.color.gray}
                borderBottomWidth={1}
                borderWidth={0}
                borderRadius={0}
                formError={errorField?.weight}
                keyboardType={'decimal-pad'}
                errorMBottom={-24}
              />
              <DropDown
                zIndex={1000}
                zIndexInverse={2000}
                zIndexIOS={10}
                arrayData={weighthMetric}
                width={0.24}
                placeholder={'kg'}
                loaderParentCall={data => {
                  setMeasurment({...measurment, wemetric: data.title});
                }}
                schema={{
                  label: 'title',
                  value: 'title',
                }}
                search={false}
                value={measurment.lmetric}
                gutterBottom={Platform.OS === 'ios' ? 5 : 1.5}
                formError={errorField?.size}
                bgColor={R.color.lightSilverShade1}
                borderColor={R.color.lightSilverShade1}
                color={R.color.black}
                placeholderColor={R.color.black}
                rightIconColor={R.color.black}
                containerStyles={{
                  borderBottomWidth: 1,
                  borderBottomColor: R.color.gray,
                  borderRadius: 0,
                  paddingHorizontal: 1,
                }}
              />
            </View>
          </View>

          <Text
            variant={'h3'}
            font={'semiBold'}
            color={R.color.black}
            align={'left'}
            style={{
              width: '100%',
            }}
            gutterTop={10}
            transform={'none'}>
            Equipment Pictures
          </Text>

          <Text
            variant={'body3'}
            font={'regular'}
            gutterTop={10}
            color={R.color.lightGray}
            style={{
              width: '100%',
            }}
            align={'left'}
            transform={'none'}>
            *Maximum 10 pictures
          </Text>

          <View style={[R.styles.rowView, styles.picturesRow]}>
            {equipPictures?.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => openModal(item)} key={index}>
                  <Image source={{uri: item?.path}} style={styles.image} />
                </TouchableOpacity>
              );
            })}

            {!totalPictures && (
              <View style={[R.styles.twoItemsRow, styles.uploadPictures]}>
                <TouchableOpacity activeOpacity={0.8} onPress={uploadImage}>
                  <Icon
                    name={'add-a-photo'}
                    type={'MaterialIcons'}
                    color={R.color.charcoalShade2}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text
            variant={'h3'}
            font={'semiBold'}
            gutterTop={10}
            gutterBottom={20}
            color={R.color.black}
            align={'left'}
            style={{
              width: '100%',
            }}
            transform={'none'}>
            Payment Method
          </Text>

          <SelectedPaymentMethod onPress={onNavigateCards} />

          <Button
            value="Confirm Details"
            bgColor={R.color.mainColor}
            width={'95%'}
            size={'xmd'}
            variant={'body2'}
            font={'semiBold'}
            gutterTop={R.unit.scale(30)}
            color={R.color.black}
            borderRadius={100}
            borderColor={R.color.mainColor}
            loader={isLoading}
            loaderColor={'white'}
            onPress={onSubmit}
            // onPress={() => navigation.navigate('SelectVehicle')}
            borderWidth={1}
          />
        </View>
      </ScrollView>
      <ItemPictureModal
        isVisibleModal={isModal}
        modalPic={modalPic}
        deleteParent={deleteParent}
      />
    </SafeAreaView>
  );
}
export default AddProductDetails;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.lightSilverShade1,
    paddingTop: R.unit.scale(20),
  },
  formView: {
    marginTop: R.unit.scale(40),
    width: '100%',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: R.unit.scale(100),
  },
  headerView: {
    marginTop: R.unit.scale(0),
    marginBottom: R.unit.scale(10),
    width: '100%',
  },
  iconView: {
    backgroundColor: R.color.charcoalShade2,
    padding: R.unit.scale(10),
    borderRadius: R.unit.scale(10),
    borderColor: R.color.black,
  },
  uploadPictures: {
    paddingVertical: R.unit.scale(10),
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  picturesRow: {
    justifyContent: 'flex-start',
    paddingHorizontal: R.unit.scale(15),
    paddingVertical: R.unit.scale(10),
    flexWrap: 'wrap',
    width: '100%',
  },
  image: {
    height: R.unit.scale(58),
    width: R.unit.scale(58),
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: R.color.black,
  },
  fields: {
    marginBottom: R.unit.scale(24),
  },
});
