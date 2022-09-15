import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {Post} from '@axios/AxiosInterceptorFunction';
import {URL} from '@config/apiUrl';
import Text from '@components/common/Text';
import Toast from '@components/utils/Toast';
import Button from '@components/common/Button';
import {useSelector} from 'react-redux';
import R from '@components/utils/R';
import Stars from '@components/common/RatingStars';
import TextInput from '@components/common/TextInput';

function RideCompleteModal(props) {
  const user = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {navigation} = props;

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);

  const adminDecide = async () => {};

  const ratingCallBack = data => {
    setStars(data);
  };

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={modalVisible}
      // visible={true}
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
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <Text
              variant={'largeTitle'}
              font={'bold'}
              gutterTop={5}
              color={'white'}
              align={'left'}
              transform={'none'}>
              Your {'\n'}Ride is
            </Text>
            <Text
              variant={'largeTitle'}
              font={'bold'}
              gutterTop={5}
              gutterBottom={10}
              color={R.color.mainColor}
              align={'left'}
              transform={'none'}>
              Completed
            </Text>
            <Text
              variant={'body2'}
              font={'bold'}
              gutterBottom={10}
              color={R.color.white}
              align={'left'}
              transform={'none'}>
              Please Rate your Driver
            </Text>

            <Stars ratingCallBack={ratingCallBack} />

            <TextInput
              secureText={false}
              placeholder={'Review'}
              onChangeText={text => {
                setReview(text);
              }}
              multiline={true}
              color={R.color.white}
              value={review}
              height={R.unit.scale(200)}
              inputHeight={R.unit.scale(180)}
              inputWidth={0.7}
              width={0.75}
              gutterTop={30}
              gutterBottom={20}
              borderColor={R.color.white}
              borderRadius={5}
              borderWidth={1}
              borderBottomWidth={1}
            />

            <Button
              value="Submit"
              bgColor={R.color.mainColor}
              width={'100%'}
              size={'xmd'}
              color={R.color.black}
              borderRadius={100}
              gutterTop={20}
              variant={'body1'}
              font={'bold'}
              loaderColor={'black'}
              loader={isLoading}
              onPress={adminDecide}
            />
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
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 10,
  },
});

export default RideCompleteModal;
