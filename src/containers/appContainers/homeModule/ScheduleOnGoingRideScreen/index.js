import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import R from '@components/utils/R';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import PickUpMap from '@components/view/screen/Home/PickUp/HomeMap';
import HomeHeader from '@components/view/screen/Home/HomeHeader';
import ScheduleRideInProgressCard from '@components/view/screen/Home/ScheduleRideInProgressCard';

function ScheduleOnGoingRideScreen(props) {
  const {navigation} = props;
  const user = useSelector(state => state.user);

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  const onPress = () => {
    if (user?.inRide) {
      console.log('Cancel');
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={R.styles.mainLayout}>
        {/* <HomeHeader
          onPress={onPress}
          iconName={user.inRide ? 'close' : 'arrow-back'}
          iconType={user.inRide ? 'Ionicons' : 'MaterialIcons'}
          showLive={false}
        /> */}
        <PickUpMap />
        <ScheduleRideInProgressCard />
      </View>
    </ScreenBoiler>
  );
}

export default ScheduleOnGoingRideScreen;
