import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from '@components/common/Icon';
import R from '@components/utils/R';

function ModalHeader(props) {
  const {goBack} = props;

  return (
    <View style={styles.container}>
      <View style={styles.notch} />
      <View style={styles.mainLayout}>
        <TouchableOpacity
          onPress={goBack}
          activeOpacity={0.7}
          style={styles.iconView}>
          <Icon
            type={'Ionicons'}
            name={'close'}
            color={R.color.blackShade2}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ModalHeader;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  notch: {
    height: R.unit.scale(5),
    width: R.unit.scale(50),
    backgroundColor: R.color.gray5,
    borderRadius: R.unit.scale(20),
    marginTop: R.unit.scale(8),
  },
  mainLayout: {
    width: '100%',
    paddingHorizontal: R.unit.scale(8),
    paddingVertical: R.unit.scale(24),
  },
  iconView: {
    padding: R.unit.scale(5),
    width: '10%',
  },
});
