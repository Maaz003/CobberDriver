import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import R from '@components/utils/R';
import AppIntroSlider from 'react-native-app-intro-slider';

function MediaDisplay(props) {
  const {navigation} = props;

  const slides = [
    {
      key: 1,
      image:
        'https://lytesnap-demo.web.app/static/media/gallery-img-1.14636f95912c4fb9285b.png',
    },
    {
      key: 2,
      image:
        'https://lytesnap-demo.web.app/static/media/gallery-img-1.14636f95912c4fb9285b.png',
    },
    {
      key: 3,
      image:
        'https://lytesnap-demo.web.app/static/media/gallery-img-1.14636f95912c4fb9285b.png',
    },
    {
      key: 4,
      image:
        'https://lytesnap-demo.web.app/static/media/gallery-img-1.14636f95912c4fb9285b.png',
    },
    {
      key: 5,
      image:
        'https://lytesnap-demo.web.app/static/media/gallery-img-1.14636f95912c4fb9285b.png',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{
            uri: item.image,
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
          data={slides}
          renderItem={renderItem}
          showNextButton={false}
          showPrevButton={false}
          showDoneButton={false}
          activeDotStyle={{backgroundColor: R.color.white}}
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
