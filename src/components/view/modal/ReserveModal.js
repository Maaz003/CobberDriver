import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {URL, imageUrl} from '@config/apiUrl';
import {Post} from '@axios/AxiosInterceptorFunction';
import Toast from '@components/utils/Toast';
import convertTime from '@components/utils/TimeZone';
import Button from '@components/common/Button';
import Text from '@components/common/Text';

function ReserveModal(props) {
  const {item, navigation} = props;
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const [booked, setBooked] = useState(false);

  const authToken = auth?.userToken;
  const idPresent =
    item &&
    (item?.trainee?.some(x => x.includes(user?.user?._id)) ||
      item?.penalty?.some(x => x.includes(user?.user?._id)) ||
      item?.waitingList?.some(x => x.includes(user?.user?._id)));
  const getCardsURL = URL('timeTable/book/slot/');
  const Header = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingCompleteError, setBookingCompleteError] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [loader, setLoader] = useState(false);

  const packagePresent = user?.user?.subscriptionType.some(
    item => item == 'group',
  );

  if (item?.availableSlots && item?.availableSlots === 0) {
    setBookingCompleteError(true);
  }

  let trainerPhoto = imageUrl + item?.trainer?.photo;

  let startTime = convertTime(item?.startTime);
  let endTime = convertTime(item?.endTime);
  let date = convertTime(item?.startTime, 'D MMMM YYYY');

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const reserve = async () => {
    setLoader(true);
    const url = getCardsURL + `${item?._id}`;
    const response = await Post(url, Header);
    if (response !== undefined) {
      Toast.show({
        title: 'Sucess',
        message: response?.data?.message,
        type: 'success',
      });
      setBooked(true);
      setIsBlur(false);

      if (props.childCall) {
        props.childCall();
      }
    } else {
      setLoader(false);
    }
    setLoader(false);
  };

  const navigateToPackages = () => {
    setIsBlur(false);
    navigation.navigate('GroupPackages');
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
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            {!packagePresent && (
              <View style={[styles.errorToast]}>
                <Text
                  variant={'body2'}
                  font={'italic'}
                  gutterTop={15}
                  gutterBottom={0}
                  color={'white'}
                  align={'center'}
                  style={{paddingHorizontal: 10}}
                  transform={'none'}>
                  Before reserving any class. Kindly buy a package
                </Text>
              </View>
            )}

            <Text
              variant={'h2'}
              font={'boldItalic'}
              gutterTop={!packagePresent ? 50 : 0}
              gutterBottom={30}
              color={'white'}
              align={'center'}
              transform={'none'}>
              Book Class
            </Text>
            <View style={{alignItems: 'center'}}>
              {item?.trainer?.photo !== undefined ? (
                <Image
                  resizeMode="cover"
                  style={styles.profileImage}
                  imageStyle={{borderRadius: 120}}
                  source={{uri: trainerPhoto}}
                />
              ) : (
                <Image
                  resizeMode="cover"
                  style={styles.profileImage}
                  imageStyle={{borderRadius: 120}}
                  source={require('@assets/Images/profilePic.jpg')}
                />
              )}
            </View>
            <Text
              variant={'h6'}
              font={'bold'}
              gutterTop={15}
              gutterBottom={10}
              color={'white'}
              align={'center'}
              numberOfLines={1}
              ellipsis="tail"
              transform={'uppercase'}>
              {item?.trainer?.firstName + ' ' + item?.trainer?.lastName}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="book" size={20} color={'white'} />
              <Text
                variant={'body2'}
                // font={'light'}
                gutterTop={15}
                gutterBottom={10}
                color={'white'}
                align={'left'}
                numberOfLines={1}
                ellipsis="tail"
                style={{marginLeft: 20}}
                transform={'none'}>
                {item?.catType?.name}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="calendar-sharp" size={20} color={'white'} />
              <Text
                variant={'body2'}
                // font={'light'}
                gutterTop={15}
                gutterBottom={10}
                color={'white'}
                align={'left'}
                style={{marginLeft: 20}}
                transform={'none'}>
                {startTime + ' - ' + endTime}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="time" size={20} color={'white'} />
              <Text
                variant={'body2'}
                // font={''}
                gutterTop={15}
                gutterBottom={10}
                color={'white'}
                align={'left'}
                style={{marginLeft: 20}}
                transform={'none'}>
                {date}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="chair-school"
                size={20}
                color={'white'}
              />
              <Text
                variant={'body2'}
                // font={'light'}
                gutterTop={15}
                gutterBottom={10}
                color={'white'}
                align={'left'}
                style={{marginLeft: 20}}
                transform={'none'}>
                Slots available : {item?.availableSlots}
              </Text>
            </View>
            {bookingCompleteError && (
              <Text
                variant={'body3'}
                // font={'light'}
                gutterTop={15}
                gutterBottom={10}
                color={'red'}
                align={'left'}
                style={{marginLeft: 20}}
                transform={'none'}>
                All slots for this class are booked for right now. Your name
                will be in waiting list. Do you wish to proceed?
              </Text>
            )}
            {!packagePresent ? (
              <Button
                value="Select Packages"
                bgColor={'#888888'}
                width={'70%'}
                size={'xmd'}
                variant={'body3'}
                color={'white'}
                borderRadius={100}
                gutterTop={20}
                loaderColor={'black'}
                loader={loader}
                onPress={navigateToPackages}
              />
            ) : (
              <>
                {idPresent || booked ? (
                  <Text
                    variant={'body3'}
                    font={'italic'}
                    gutterTop={15}
                    gutterBottom={10}
                    color={'gray'}
                    align={'center'}
                    transform={'none'}>
                    Already enrolled
                  </Text>
                ) : (
                  <Button
                    value="Reserve Now"
                    bgColor={'#888888'}
                    width={'70%'}
                    size={'xmd'}
                    color={'white'}
                    borderRadius={100}
                    gutterTop={10}
                    loaderColor={'white'}
                    loader={loader}
                    variant={'body3'}
                    onPress={reserve}
                  />
                )}
              </>
            )}
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
  errorToast: {
    backgroundColor: '#87adbd',
    paddingBottom: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  profileImage: {
    width: 165,
    height: 165,
    borderRadius: 165,
    borderWidth: 2,
    borderColor: 'white',
  },
  modalView: {
    backgroundColor: '#3B3C40',
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 20,
  },
});

export default ReserveModal;
