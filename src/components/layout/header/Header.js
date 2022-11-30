import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';

function Header(props) {
  const {backPress} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[R.styles.twoItemsRow, styles.pressableView]}
        onPress={backPress}>
        <Icon
          name={'chevron-back-outline'}
          type={'Ionicons'}
          color={R.color.blackShade3}
          size={20}
        />
        <Text
          variant={'body3'}
          font={'InterMedium'}
          color={R.color.blackShade3}
          align={'left'}
          style={{marginLeft: R.unit.scale(8)}}
          transform={'capitalize'}>
          Go back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Header;
const styles = StyleSheet.create({
  container: {
    marginTop: R.unit.scale(24),
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: R.unit.scale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pressableView: {
    width: '30%',
  },
});
