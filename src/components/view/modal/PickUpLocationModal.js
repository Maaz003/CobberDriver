import React, {useEffect, useState} from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import Icon from '@components/common/Icon';
import LocationModal from './LocationModal';
import ScheduleRideModal from './ScheduleRideModal';
import {MAPRef} from '@store/common/commonSlice';
import SlidingView from '../screen/Home/SlidingView';
import moment from 'moment';

function PickUpLocationModal(props) {
  const dispatch = useDispatch();
  const {triggerAnimate} = props;
  const load = user?.locationLoader;
  const user = useSelector(state => state.user);
  const common = useSelector(state => state.common);
  const pickupAddr = user?.pickupLoc?.address;
  const pickUpLat = user?.pickupLoc?.latitude;
  const pickUpLong = user?.pickupLoc?.longitude;
  let mapRef = common?.mapRef;

  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [showMore, setShowmore] = useState(false);
  const [scheduledTime, setScheduledTime] = useState();
  const [isLocationModal, setIsLocationModal] = useState(false);
  const [isScheduleModal, setIsScheduleModal] = useState(false);
  const [locType, setLocType] = useState('Pickup');

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  useEffect(() => {
    if (user?.pickupLoc !== undefined) {
      if (pickupAddr) {
        let region = {
          latitude: Number(pickUpLat),
          longitude: Number(pickUpLong),
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        };
        if (mapRef) {
          // if (mapRef.animateToRegion()) {
          // mapRef.animateToRegion(region, 2000);
          // }
          // dispatch(MAPRef(mapRef));
        }
      }
    }
  }, [props.isVisibleModal, isBlur]);

  const openModal = flag => {
    setIsLocationModal(!isLocationModal);
    setLocType(flag);
  };

  const openScheduleModal = flag => {
    setIsScheduleModal(!isScheduleModal);
  };

  const scheduleTime = data => {
    let formatted = moment(data?.date).calendar({
      sameDay: '[Today], hh:mm A',
      nextDay: '[Tomorrow], hh:mm A',
      nextWeek: 'Do MMM, hh:mm A',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'Do MMM, hh:mm A',
    });
    setScheduledTime(formatted);
  };

  const onSubmit = flag => {
    setShowmore(flag);
  };

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={true}
        // visible={true}
        style={{backgroundColor: 'red', flex: 1}}
        visible={modalVisible}
        onRequestClose={() => {
          triggerAnimate();
          setIsBlur(false);
        }}
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
                backgroundColor: 'rgba(0,0,0,1)',
              }}></TouchableOpacity>
          </View>
          <>
            <View style={styles.modalView}>
              {load ? (
                <SkeletonPlaceholder
                  backgroundColor={R.color.blackLightShade}
                  highlightColor={R.color.lightGray}>
                  <SkeletonPlaceholder.Item
                    width={R.unit.width(0.6)}
                    height={R.unit.scale(35)}
                    borderRadius={R.unit.scale(10)}
                    marginBottom={R.unit.scale(30)}
                  />
                  <View style={{...R.styles.twoItemsRow, paddingHorizontal: 0}}>
                    <SkeletonPlaceholder.Item
                      width={R.unit.scale(50)}
                      height={R.unit.scale(50)}
                      borderRadius={R.unit.scale(50)}
                    />
                    <SkeletonPlaceholder.Item
                      width={R.unit.width(0.7)}
                      height={R.unit.scale(40)}
                      borderRadius={R.unit.scale(5)}
                      marginLeft={R.unit.scale(10)}
                    />
                  </View>
                </SkeletonPlaceholder>
              ) : (
                <View style={styles.subLayout}>
                  <View style={[R.styles.rowView, styles.headingView]}>
                    <Text
                      variant={'h2'}
                      font={'bold'}
                      color={R.color.white}
                      align={'center'}
                      transform={'none'}>
                      Pickup Details
                    </Text>
                    <TouchableOpacity
                      onPress={openScheduleModal}
                      style={[R.styles.twoItemsRow, styles.timeView]}>
                      <Icon
                        name={'clock'}
                        type={'MaterialCommunityIcons'}
                        color={R.color.mainColor}
                        size={20}
                      />
                      <Text
                        variant={'body4'}
                        font={'semiBold'}
                        color={R.color.mainColor}
                        align={'center'}
                        style={{marginLeft: R.unit.scale(5)}}
                        transform={'none'}>
                        {scheduledTime ? scheduledTime : 'Today'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={[R.styles.twoItemsRow, styles.locationView]}
                    activeOpacity={0.6}
                    onPress={() => openModal('Pickup')}>
                    <View style={styles.iconView}>
                      <Icon
                        name={'location-pin'}
                        type={'Entypo'}
                        color={R.color.mainColor}
                        size={30}
                      />
                    </View>
                    <Text
                      variant={'body3'}
                      font={'regular'}
                      color={R.color.white}
                      style={{
                        marginLeft: R.unit.scale(12),
                        maxWidth: '80%',
                      }}
                      align={'left'}
                      numberOfLines={2}
                      transform={'none'}>
                      {pickupAddr ? pickupAddr : 'Enter PickUp location'}
                    </Text>
                  </TouchableOpacity>

                  <Button
                    value={`Confirm pickup`}
                    bgColor={R.color.mainColor}
                    width={'95%'}
                    size={'xmd'}
                    variant={'body2'}
                    disabled={pickupAddr ? false : true}
                    font={'semiBold'}
                    color={'black'}
                    borderRadius={100}
                    onPress={() => onSubmit(true)}
                    borderColor={R.color.mainColor}
                    loaderColor={'white'}
                  />
                  {showMore && (
                    <SlidingView showItems={showMore} onSubmit={onSubmit} />
                  )}
                </View>
              )}
            </View>
          </>
        </View>
      </Modal>
      <LocationModal isVisibleModal={isLocationModal} locType={locType} />
      <ScheduleRideModal
        isVisibleModal={isScheduleModal}
        scheduleTime={scheduleTime}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    // height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalView: {
    backgroundColor: R.color.charcoalShade2,
    borderTopLeftRadius: R.unit.scale(20),
    borderTopRightRadius: R.unit.scale(20),
    width: '100%',
    paddingHorizontal: R.unit.scale(16),
    paddingVertical:
      Platform.OS === 'ios' ? R.unit.scale(40) : R.unit.scale(25),
    // height: 500,
  },
  headingView: {
    paddingHorizontal: R.unit.scale(10),
    marginBottom: R.unit.scale(16),
  },
  subLayout: {
    // flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconView: {
    backgroundColor: R.color.blackLightShade,
    padding: R.unit.scale(10),
    borderRadius: R.unit.scale(120),
  },
  timeView: {
    paddingHorizontal: 0,
  },
  locationView: {
    marginBottom: R.unit.scale(10),
    paddingHorizontal: 0,
    marginBottom: R.unit.scale(16),
  },
});

export default PickUpLocationModal;
