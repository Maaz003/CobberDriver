import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import CustomerCard from './CustomerCard';

function RidesList(props) {
  const [height, setHeight] = useState(new Animated.Value(R.unit.height(0.08)));
  const [show, setShow] = useState(false);

  const triggerAnimation = () => {
    if (!show) {
      showContent();
    } else {
      hideContent();
    }
    setShow(!show);
  };

  const showContent = () => {
    Animated.timing(height, {
      toValue: R.unit.height(0.6),
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const hideContent = () => {
    Animated.timing(height, {
      toValue: R.unit.height(0.07),
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const maxHeight = height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.mainLayout}>
      <Animated.View
        style={{
          height: maxHeight,
          ...styles.animatedView,
          paddingHorizontal: R.unit.scale(!show ? 8 : 0),
        }}>
        <TouchableOpacity onPress={triggerAnimation} activeOpacity={0.8}>
          {!show && (
            <View style={R.styles.rowView}>
              <Text
                variant={'body2'}
                font={'bold'}
                color={R.color.white}
                align={'center'}
                style={{top: 2}}
                transform={'none'}>
                You have a New Ride
              </Text>
              <Text
                variant={'body4'}
                font={'bold'}
                color={R.color.black}
                align={'center'}
                style={{
                  padding: R.unit.scale(7),
                  borderRadius: R.unit.scale(20),
                  backgroundColor: R.color.mainColor,
                }}
                transform={'none'}>
                01
              </Text>
            </View>
          )}

          {show && (
            <View style={{width: '100%', alignItems: 'center'}}>
              <View style={styles.notch} />
              <ScrollView
                style={styles.fullContentView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  justifyContent: 'flex-start',
                  flexGrow: 1,
                  paddingBottom: R.unit.pdBottomList(140),
                }}>
                <View onStartShouldSetResponder={() => true}>
                  <CustomerCard />
                </View>
              </ScrollView>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    width: R.unit.width(1),
    flexDirection: 'row',
    position: 'absolute',
    bottom: Platform.OS === 'ios' && R.unit.height(1) > 800 ? -40 : 0,
    zIndex: 99999,
  },
  animatedView: {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: R.color.charcoalShade2,
    borderTopRightRadius: R.unit.scale(10),
    borderTopLeftRadius: R.unit.scale(10),
  },
  fullContentView: {
    marginTop: R.unit.scale(10),
    paddingBottom: R.unit.scale(40),
  },
  notch: {
    height: R.unit.scale(5),
    width: R.unit.scale(70),
    backgroundColor: R.color.gray5,
    borderRadius: R.unit.scale(20),
    marginTop: R.unit.scale(32),
  },
});

export default RidesList;
