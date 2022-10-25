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
  const [height, setHeight] = useState(new Animated.Value(R.unit.height(0.07)));
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
      duration: 800,
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
        }}>
        <TouchableOpacity onPress={triggerAnimation} activeOpacity={0.8}>
          {!show && (
            <View style={R.styles.rowView}>
              <Text
                variant={'body1'}
                font={'bold'}
                color={R.color.white}
                align={'center'}
                style={{top: 2}}
                transform={'none'}>
                You have a New Ride
              </Text>
              <Text
                variant={'body2'}
                font={'bold'}
                color={R.color.black}
                align={'center'}
                style={{
                  padding: R.unit.scale(10),
                  borderRadius: R.unit.scale(20),
                  backgroundColor: R.color.mainColor,
                }}
                transform={'none'}>
                01
              </Text>
            </View>
          )}

          {show && (
            <ScrollView
              style={styles.fullContentView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'flex-start',
                flexGrow: 1,
                paddingBottom: R.unit.scale(50),
              }}>
              <View onStartShouldSetResponder={() => true}>
                <CustomerCard />
              </View>
            </ScrollView>
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
    bottom: Platform.OS === 'ios' && R.unit.height(1) > 800 ? -40 : 20,
    zIndex: 99999,
  },
  animatedView: {
    width: '95%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: R.unit.scale(8),
    backgroundColor: R.color.charcoalShade2,
    borderRadius: R.unit.scale(10),
  },
  fullContentView: {
    // height: '100%',
    paddingVertical:
      Platform.OS === 'ios' && R.unit.height(1) > 800
        ? R.unit.scale(40)
        : R.unit.scale(50),
  },
});

export default RidesList;
