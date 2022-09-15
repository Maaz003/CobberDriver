import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import {Footer, SuccessFullTick} from '@components/utils/Svg';

const originalWidth = 490;
const originalHeight = 145;
const aspectRatio = originalWidth / originalHeight;
const windowWidth = Dimensions.get('window').width;

function SuccessfullScreen(props) {
  const {navigation} = props;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1200);
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          ...R.styles.container,
          ...styles.mainLayout,
        }}>
        <View style={styles.formView}>
          <SuccessFullTick />
          <Text
            variant={'h4'}
            font={'semiBold'}
            gutterTop={R.unit.scale(20)}
            gutterBottom={R.unit.scale(1)}
            color={R.color.black}
            align={'center'}
            transform={'none'}>
            Verification
          </Text>
          <Text
            variant={'extraLargeTitle'}
            font={'semiBold'}
            color={R.color.black}
            align={'center'}
            transform={'none'}>
            Successful
          </Text>
        </View>

        <View style={styles.footerImage}>
          <Footer
            width="100%"
            height="100%"
            viewBox={`0 0 ${originalWidth} ${originalHeight}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default SuccessfullScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.mainColor,
  },
  formView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerImage: {
    width: '100%',
    aspectRatio,
    width: windowWidth,
  },
});
