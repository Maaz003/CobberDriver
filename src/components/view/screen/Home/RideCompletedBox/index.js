import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {createRideSession} from '@store/user/userSlice';
import {URL, apiHeader} from '@config/apiUrl';
import {scheduledRides} from '@store/scheduleRides/scheduleSlice';
import {tempRidesSet} from '@store/common/commonSlice';
import {Post} from '@axios/AxiosInterceptorFunction';
import {updateUser} from '@store/user/userSlice';
import Text from '@components/common/Text';
import {imageUrl} from '@config/apiUrl';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import {useDispatch, useSelector} from 'react-redux';
import PopUp from '@components/common/PopUp';
import Stars from '@components/common/RatingStars';
import LocationDot from '@components/common/LocationDot';
import TextInput from '@components/common/TextInput';

function RideCompletedBox(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const schedule = useSelector(state => state.schedule);
  const common = useSelector(state => state.common);
  const rideSession = user?.rideSession;
  const {
    _id: customerId,
    displayName,
    photo,
    city,
    country,
  } = rideSession?.customer;
  const {pickUpLocation, dropOffLocation} = rideSession?.location;
  const [reviews, setReviews] = useState({ratings: 0, reviewText: ''});
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (reviews?.ratings > 0) setDisabled(false);
  }, [reviews?.ratings]);

  // console.log('disabled', reviews.ratings);

  const completeRide = async () => {
    if (rideSession?.type === 'schedule') {
      let tempArr = JSON.parse(JSON.stringify(schedule?.scheduledRides));
      let obj = tempArr?.find(item => item.id === rideSession?.id);
      obj.isCompleted = true;
      let flag = schedule?.scheduledRides?.every(
        item => item.rideStatus === 'dropoffended',
      );
      if (flag) {
        let commonTemparr = JSON.parse(JSON.stringify(common.tempRides));
        let index = commonTemparr.findIndex(item => item.requestedRides);
        let requestedRides = commonTemparr[index];
        requestedRides?.requestedRides.forEach(item => {
          item.isCompleted = true;
        });
        dispatch(tempRidesSet(commonTemparr));
      }
      const dataRide = {
        data: undefined,
        inRide: flag ? 'finished' : 'scheduleEnded',
      };
      dispatch(scheduledRides(tempArr));
      dispatch(createRideSession(dataRide));
      PopUp({
        heading: 'Ride Completed',
        bottomOffset: 0.7,
        visibilityTime: 3000,
        position: 'top',
      });
    } else {
      completeInstantRide();
    }
  };

  const completeInstantRide = async () => {
    setIsLoading(true);
    const reviewUrl = URL('reviews/ride');
    const reqBody = {
      reviewMessage: reviews?.reviewText,
      rating: reviews?.ratings,
      driver: user?.user?._id,
      customer: customerId,
      ride: rideSession?._id,
      reviewOn: 'customer',
    };
    const headers = apiHeader(user?.userToken, false);
    const response = await Post(reviewUrl, reqBody, headers);
    if (response !== undefined) {
      let updateObj = JSON.parse(JSON.stringify(user.user));
      updateObj.driverInfo.isInRide = false;
      await dispatch(updateUser(updateObj));
      const dataRide = {data: undefined, inRide: 'finished'};
      await dispatch(createRideSession(dataRide));
      PopUp({
        heading: 'Ride Completed',
        bottomOffset: 0.7,
        visibilityTime: 3000,
        position: 'top',
      });
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.mainLayout}>
      <Text
        variant={'h1'}
        font={'Sequel551'}
        color={R.color.white}
        align={'left'}
        numberOfLines={2}
        transform={'none'}>
        You Arrived!
      </Text>
      <Text
        variant={'h6'}
        font={'InterRegular'}
        color={R.color.white}
        align={'left'}
        gutterTop={10}
        gutterBottom={20}
        transform={'none'}>
        Final Cost: ${rideSession?.fare}
      </Text>
      <View style={R.styles.twoItemsRow}>
        <Image
          source={{uri: imageUrl(photo)}}
          resizeMode={'cover'}
          style={styles.image}
        />
        <View
          style={{
            marginLeft: R.unit.scale(5),
            flex: 1,
          }}>
          <Text
            variant={'body2'}
            font={'PoppinsRegular'}
            color={R.color.white}
            style={{flex: 1}}
            gutterTop={10}
            align={'left'}
            numberOfLines={2}
            transform={'capitalize'}>
            {displayName}
          </Text>
          <Text
            variant={'body2'}
            font={'PoppinsRegular'}
            color={R.color.white}
            style={{flex: 1}}
            align={'left'}
            numberOfLines={1}
            transform={'capitalize'}>
            {city}, {country}
          </Text>
        </View>
      </View>

      <View style={[R.styles.twoItemsRow, styles.locationView]}>
        <LocationDot color={R.color.white} />
        <Text
          variant={'body2'}
          font={'thin'}
          color={R.color.white}
          align={'left'}
          style={{flex: 1}}
          numberOfLines={2}
          transform={'capitalize'}>
          {pickUpLocation}
        </Text>
      </View>

      <View
        style={[
          R.styles.twoItemsRow,
          styles.locationView,
          styles.dropOffLocationView,
        ]}>
        <LocationDot color={'#04d604'} />
        <Text
          variant={'body2'}
          font={'PoppinsRegular'}
          color={'#04d604'}
          align={'left'}
          style={{flex: 1}}
          numberOfLines={2}
          transform={'capitalize'}>
          {dropOffLocation}
        </Text>
      </View>

      <Stars
        ratingCallBack={data => setReviews({...reviews, ratings: data})}
        containerStyles={{
          marginTop: R.unit.scale(24),
        }}
      />

      <TextInput
        secureText={false}
        onChangeText={text => {
          setReviews({...reviews, reviewText: text});
        }}
        placeholder={'Review'}
        color={R.color.white}
        value={reviews?.reviewText}
        gutterTop={40}
        widthInPercent={'100%'}
        gutterBottom={10}
        isRightTitle={false}
        backgroundColor={R.color.blackShade2}
        multiline={true}
        numberOfLines={60}
        borderWidth={0.5}
        borderColor={R.color.gray}
        borderRadius={8}
        height={148}
        inputHeight={148}
      />

      <Button
        value={`Complete Ride`}
        bgColor={R.color.mainColor}
        width={'100%'}
        size={'lg'}
        gutterTop={R.unit.scale(32)}
        color={R.color.black}
        borderRadius={10}
        onPress={completeRide}
        borderColor={R.color.mainColor}
        loaderColor={R.color.black}
        disabled={disabled || isLoading}
        loader={isLoading}
      />
    </View>
  );
}
export default RideCompletedBox;

const styles = StyleSheet.create({
  mainLayout: {
    position: 'absolute',
    width: '95%',
    padding: R.unit.scale(24),
    paddingHorizontal: R.unit.scale(10),
    borderRadius: R.unit.scale(10),
    backgroundColor: 'rgba(0,0,0,0.85)',
    marginVertical: R.unit.scale(26),
  },
  headingView: {
    paddingHorizontal: R.unit.scale(20),
    marginBottom: R.unit.scale(16),
  },
  image: {
    height: R.unit.scale(70),
    width: R.unit.scale(70),
    borderRadius: R.unit.scale(50),
    marginRight: R.unit.scale(12),
    borderColor: R.color.black,
    borderWidth: R.unit.scale(1),
  },
  locationView: {
    marginTop: R.unit.scale(24),
    alignItems: 'flex-start',
  },
  dropOffLocationView: {
    marginTop: R.unit.scale(12),
  },
});
