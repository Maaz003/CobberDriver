import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Button from '@components/common/Button';

function PictureOptionsModals(props) {
  const {uploadPicture} = props;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  const uploadImage = async type => {
    try {
      let pickerResult;
      if (type === 'gallery') {
        pickerResult = await ImagePicker.openPicker({mediaType: 'photo'});
      } else {
        pickerResult = await ImagePicker.openCamera({mediaType: 'photo'});
      }
      if (pickerResult) {
        if (
          pickerResult.path.includes('.jpeg') ||
          pickerResult.path.includes('.jpg') ||
          pickerResult.path.includes('.png') ||
          pickerResult.path.includes('.JPG') ||
          pickerResult.path.includes('.PNG') ||
          pickerResult.path.includes('.JPEG') ||
          pickerResult.path.includes('.HEIC')
        ) {
          uploadPicture(pickerResult);
          setIsBlur(false);
        } else {
          console.log('EL:SE');
        }
      }
    } catch (error) {
      console.log('ERR', error);
    }
  };

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      // visible={true}
      visible={modalVisible}
      onRequestClose={() => setIsBlur(false)}
      onShow={() => {
        setIsBlur(true);
      }}>
      <View style={styles.centeredView}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          <TouchableOpacity
            onPress={() => setIsBlur(false)}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <Text
              variant={'h3'}
              font={'Sequel551'}
              gutterTop={10}
              gutterBottom={25}
              color={R.color.mainColor}
              align={'center'}
              transform={'none'}>
              Choose Option
            </Text>
            <View style={R.styles.rowView}>
              <View
                style={{width: '50%', backgroundColor: R.color.blackShade2}}>
                <Button
                  bgColor={R.color.blackShade2}
                  width={'49%'}
                  size={'lg'}
                  variant={'body1'}
                  font={'PoppinsMedium'}
                  iconName={'camera'}
                  iconType={'Ionicons'}
                  onPress={() => uploadImage('camera')}
                  iconSize={30}
                  rippleColor={R.color.charcoalShade2}
                />
                <Text
                  variant={'body2'}
                  font={'PoppinsMedium'}
                  color={R.color.mainColor}
                  align={'center'}
                  transform={'none'}>
                  Camera
                </Text>
              </View>
              <View
                style={{width: '50%', backgroundColor: R.color.blackShade2}}>
                <Button
                  bgColor={R.color.blackShade2}
                  width={'49%'}
                  size={'lg'}
                  variant={'body1'}
                  font={'PoppinsMedium'}
                  color={R.color.mainColor}
                  onPress={() => uploadImage('gallery')}
                  iconName={'picture-o'}
                  iconType={'FontAwesome'}
                  iconSize={25}
                  rippleColor={R.color.charcoalShade2}
                />
                <Text
                  variant={'body2'}
                  font={'PoppinsMedium'}
                  color={R.color.mainColor}
                  align={'center'}
                  transform={'none'}>
                  Gallery
                </Text>
              </View>
            </View>
          </View>
        </>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: R.color.blackShade2,
    width: '100%',
    paddingHorizontal: R.unit.scale(25),
    paddingVertical: R.unit.scale(25),
    borderTopRightRadius: R.unit.scale(12),
    borderTopLeftRadius: R.unit.scale(12),
    paddingBottom: R.unit.scale(40),
  },
});

export default PictureOptionsModals;
