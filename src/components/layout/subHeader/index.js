import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Text from '../../common/Text';
import {moderateScale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '@components/common/Icon';
import R from '@components/utils/R';

const width = Dimensions.get('window').width;

function SubHeaderComponent(props) {
  const {navigation, headerProps} = props;

  const {
    mainHeading,
    isRightIcon = false,
    isBack = false,
    isCustomBack,
  } = headerProps;

  const toggleDrawer = () => {
    if (isBack && !isCustomBack) {
      navigation.goBack();
    } else if (!isBack && isCustomBack) {
      navigation.navigate(isCustomBack);
    } else {
      navigation.toggleDrawer();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer} style={{padding: 5}}>
        <Icon
          name={isBack || isCustomBack ? 'arrow-back-outline' : 'menu'}
          type={'Ionicons'}
          color={R.color.black}
          size={25}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginRight: isRightIcon ? 0 : 30,
        }}>
        {mainHeading && (
          <Text
            variant={'h3'}
            font={'bold'}
            gutterTop={5}
            color={R.color.black}
            align={'left'}
            transform={'capitalize'}>
            {mainHeading}
          </Text>
        )}
      </View>
      {isRightIcon && (
        <FontAwesome5 name="calendar-alt" color={'white'} size={20} />
      )}
    </View>
  );
}
export default SubHeaderComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width,
    marginTop: moderateScale(20, 0.3),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: R.unit.scale(10),
    paddingBottom: 10,
  },
});
