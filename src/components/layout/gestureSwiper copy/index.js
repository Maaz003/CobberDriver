import React from 'react';
import {StyleSheet} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

function GestureSwiper(props) {
  const {onSwipeUp, onSwipeDown, containerStyles, children} = props;

  const swipeUp = gestureState => {
    console.log('gestureState', gestureState);
    onSwipeUp();
  };

  const swipeDown = gestureState => {
    onSwipeDown();
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeUp={state => swipeUp(state)}
      onSwipeDown={state => swipeDown(state)}
      config={config}
      style={[styles.mainLayout, containerStyles]}>
      {children}
    </GestureRecognizer>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    // zIndex: 9999,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default GestureSwiper;
