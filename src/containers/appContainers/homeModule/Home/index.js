import React, {useEffect} from 'react';
import {View} from 'react-native';
import R from '@components/utils/R';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import DropOffLocationCard from '@components/view/screen/Home/DropOff/DropOffLocationCard';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import CurrentLocation from '@components/utils/CurrentLocation';
import DropOffMap from '@components/view/screen/Home/DropOff/DropOffMap';
import HomeHeader from '@components/view/screen/Home/HomeHeader';

function HomeScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const user = useSelector(state => state.user);

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  useEffect(() => {
    if (!user?.pinLoc) {
      CurrentLocation({actionCall: dispatch, flag: 'home'});
    }
  }, [isFocused]);

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={R.styles.mainLayout}>
        <HomeHeader onPress={onPress} iconName={'arrow-back'} />
        <DropOffMap />
        <DropOffLocationCard navigation={props.navigation} />
      </View>
    </ScreenBoiler>
  );
}

export default HomeScreen;
