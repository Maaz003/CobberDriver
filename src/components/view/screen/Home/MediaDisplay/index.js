import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import R from '@components/utils/R';
import AppIntroSlider from 'react-native-app-intro-slider';
import {imageUrl} from '@config/apiUrl';

function MediaDisplay(props) {
  const {productImages} = props;

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{
            uri: imageUrl(item),
          }}
          resizeMode={'cover'}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    );
  };

  return (
    <View style={[styles.mainLayout]}>
      <View style={styles.contentView}>
        <AppIntroSlider
          data={productImages}
          renderItem={renderItem}
          showNextButton={false}
          showPrevButton={false}
          showDoneButton={false}
          activeDotStyle={{backgroundColor: R.color.mainColor}}
          dotStyle={{backgroundColor: R.color.gray5}}
        />
      </View>
    </View>
  );
}
export default MediaDisplay;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  contentView: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: R.unit.scale(16),
  },
  slide: {
    width: R.unit.width(1),
    height: R.unit.scale(193),
  },
});
