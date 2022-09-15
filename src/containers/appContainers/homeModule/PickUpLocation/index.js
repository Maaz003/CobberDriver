import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import R from '@components/utils/R';
import PickUpLocationCard from '@components/view/screen/Home/PickUp/PickUpLocationCard';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import PickUpMap from '@components/view/screen/Home/PickUp/PickUpMap';
import HomeHeader from '@components/view/screen/Home/HomeHeader';
import LiveLocation from '@components/view/screen/Home/PickUp/LiveLocation';

function PickUpLocation(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  const onPress = () => {
    navigation.toggleDrawer();
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={R.styles.mainLayout}>
        <HomeHeader onPress={onPress} iconName={'menu'} />
        <PickUpMap />
        <LiveLocation />
        {user?.locationLoader && (
          <View style={R.styles.loaderView}>
            <ActivityIndicator
              size="large"
              color={R.color.mainColor}
              style={{marginTop: R.unit.scale(280)}}
            />
          </View>
        )}
        <PickUpLocationCard navigation={props.navigation} />
      </View>
    </ScreenBoiler>
  );
}

export default PickUpLocation;
