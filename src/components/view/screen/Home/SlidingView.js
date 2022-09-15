import Button from '@components/common/Button';
import R from '@components/utils/R';
import React, {useEffect, useState} from 'react';

import {Animated, Easing, View, Text, StyleSheet} from 'react-native';

const SlidingView = props => {
  const {isSlideView, showItems, onSubmit} = props;

  const [height, setHeight] = useState(new Animated.Value(0));
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (showItems) {
      showContent();
      onSubmit(true);
    } else {
      hideContent();
      onSubmit(false);
    }
  }, [showItems]);

  const showContent = () => {
    setShow(true);
    Animated.timing(height, {
      toValue: R.unit.height(1),
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false, // <-- neccessary
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false, // <-- neccessary
      }).start();
    });
  };

  const hideContent = () => {
    setShow(false);
    Animated.timing(height, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false, // <-- neccessary
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false, // <-- neccessary
      }).start();
    });
  };

  const maxHeight = height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // <-- value that larger than your content's height
  });

  return (
    <View style={styles.container}>
      {/* {!show && (
        <Button
          title="Show content"
          value={`Confirm dropoff`}
          bgColor={R.color.mainColor}
          width={'95%'}
          size={'xmd'}
          variant={'body2'}
          onPress={showContent}
        />
      )} */}

      <Animated.View
        style={{
          opacity: opacity,
          maxHeight: maxHeight,
          height: height,
          backgroundColor: 'green',
        }}>
        <Text style={styles.content}>
          Lorem Ipsum is simply a dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        {show && (
          <Button
            title="Show content"
            value={`Confirm dropoff`}
            bgColor={R.color.mainColor}
            width={'95%'}
            size={'xmd'}
            variant={'body2'}
            onPress={hideContent}
          />
        )}
      </Animated.View>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginTop: 66,
    // height: 300,
  },
  button: {
    padding: 8,
  },
  spacing: {
    backgroundColor: 'yellow',
    height: 100,
    width: '100%',
  },
  content: {
    // backgroundColor: '#FFFFFF',
    // height: 100,
  },
});

export default SlidingView;
