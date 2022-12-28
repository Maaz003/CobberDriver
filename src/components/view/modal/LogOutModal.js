import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {logOut} from '@store/auth/authSlice';
import {clearUser} from '@store/user/userSlice';
import {clearCommon} from '@store/common/commonSlice';
import {clearRides} from '@store/rides/ridesSlice';
import Text from '@components/common/Text';
import {clearRide} from '@store/ride/rideSlice';
import R from '@components/utils/R';
import Button from '@components/common/Button';

function LogOutModal(props) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const buttonSubmit = flag => {
    if (flag) {
      dispatch(logOut());
      dispatch(clearUser());
      dispatch(clearCommon());
      dispatch(clearRides());
      dispatch(clearRide());
    } else {
      setIsBlur(false);
    }
  };

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
              font={'PoppinsMedium'}
              gutterTop={20}
              gutterBottom={25}
              color={R.color.wzs}
              style={{paddingHorizontal: 20}}
              align={'center'}
              transform={'none'}>
              Are you sure you want to logout?
            </Text>
            <View style={R.styles.rowView}>
              <Button
                value={`LogOut`}
                bgColor={R.color.mainColor}
                width={'49%'}
                size={'xmd'}
                gutterTop={R.unit.scale(20)}
                color={R.color.charcoalShade}
                borderRadius={100}
                onPress={() => buttonSubmit(true)}
                borderColor={R.color.mainColor}
                loaderColor={'white'}
                borderWidth={R.unit.scale(1)}
              />

              <Button
                value={`Cancel`}
                bgColor={R.color.blackShade2}
                width={'49%'}
                size={'xmd'}
                gutterTop={R.unit.scale(20)}
                color={R.color.mainColor}
                borderRadius={100}
                onPress={() => buttonSubmit(false)}
                borderColor={R.color.mainColor}
                loaderColor={'white'}
                borderWidth={R.unit.scale(1)}
              />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: R.color.blackShade2,
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 10,
  },
});

export default LogOutModal;
