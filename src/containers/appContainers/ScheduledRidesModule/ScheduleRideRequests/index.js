import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {rideSession} from '@store/user/userSlice';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import RideRequestsCard from '@components/view/screen/Home/Instant/RideRequestsCard';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Button from '@components/common/Button';

function ScheduleRideRequestsScreen(props) {
  const {navigation} = props;
  const {data} = props.route.params;
  const dispatch = useDispatch();
  const [filteredArray, setFilteredArray] = useState(data);
  const [showEndButton, setShowEndButton] = useState(false);

  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        setFilteredArray(data);
      } else {
        setFilteredArray([]);
      }
    }

    if (data.every(item => item.rideStatus === 'ended')) {
      setShowEndButton(true);
    } else {
      setShowEndButton(false);
    }
  }, [data]);

  const onRemove = id => {
    let updatedArr = filteredArray.filter(item => item.id !== id);
    setFilteredArray(updatedArr);
  };

  const headerProps = {
    isMainHeader: true,
    isSubHeader: false,
    mainHeading: 'Payment',
  };

  const backPress = () => {
    navigation.goBack();
  };

  const finishRide = () => {
    const dataRide = {data: undefined, inRide: 'finished'};
    dispatch(rideSession(dataRide));
  };

  return (
    <ScreenBoiler props={props} headerProps={headerProps} backPress={backPress}>
      <View style={[styles.mainLayout, R.styles.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <View style={styles.contentView}>
            <Text
              variant={'h4'}
              font={'Sequel551'}
              color={R.color.blackShade3}
              align={'left'}
              transform={'none'}>
              Ride Requests
            </Text>
            {filteredArray?.map((item, index, arr) => {
              return (
                <RideRequestsCard
                  item={item}
                  index={index}
                  arr={arr}
                  key={index}
                  onRemove={onRemove}
                  screenType={'History'}
                />
              );
            })}

            {showEndButton && (
              <Button
                value={'Complete Ride'}
                bgColor={R.color.cancelColor}
                width={'100%'}
                size={'lg'}
                gutterTop={30}
                color={R.color.white}
                borderColor={R.color.cancelColor}
                disabled={false}
                loaderColor={R.color.white}
                borderWidth={1}
                borderRadius={10}
                onPress={finishRide}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </ScreenBoiler>
  );
}
export default ScheduleRideRequestsScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(16),
    flex: 1,
    marginTop: R.unit.scale(16),
  },
  contentView: {
    width: '100%',
    justifyContent: 'center',
  },
  addCardView: {
    justifyContent: 'flex-end',
    marginTop: R.unit.scale(40),
    paddingVertical: R.unit.scale(10),
  },

  titleView: {
    marginLeft: R.unit.scale(16),
    width: '75%',
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(17),
  },
  popupSvg: {
    aspectRatio: 1,
    height: R.unit.scale(30),
  },
  notificationCard: {
    marginTop: R.unit.scale(24),
  },
  image: {
    width: R.unit.scale(48),
    height: R.unit.scale(48),
    borderRadius: R.unit.scale(8),
  },
  detailView: {
    marginTop: R.unit.scale(12),
  },
  buttonContainer: {
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
  },
  buttonLayout: {
    justifyContent: 'flex-end',
    width: '70%',
  },
  cancelButton: {
    padding: R.unit.scale(16),
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(0.75),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(8),
  },
});
