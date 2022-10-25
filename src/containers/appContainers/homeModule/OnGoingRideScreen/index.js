import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import R from '@components/utils/R';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import PickUpMap from '@components/view/screen/Home/PickUp/PickUpMap';
import HomeHeader from '@components/view/screen/Home/HomeHeader';
import RidesInProgressCard from '@components/view/screen/Home/RideInProgressCard';

function OnGoingRideScreen(props) {
  const {navigation} = props;
  const user = useSelector(state => state.user);

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={R.styles.mainLayout}>
        <HomeHeader onPress={onPress} iconName={'menu'} />
        <PickUpMap />
        <RidesInProgressCard />
      </View>
    </ScreenBoiler>
  );
}

export default OnGoingRideScreen;
