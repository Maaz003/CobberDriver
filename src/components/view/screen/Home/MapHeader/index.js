import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import LiveLocation from '../PickUp/LiveLocation';

function MapHeader(props) {
  const {
    onPress,
    iconName,
    iconType = 'MaterialIcons',
    showLive = true,
    showDrawer = true,
  } = props;

  return (
    <View style={styles.headerView}>
      {showDrawer && (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
          style={styles.iconView}>
          <Icon
            name={iconName}
            type={iconType}
            size={20}
            color={R.color.white}
          />
        </TouchableOpacity>
      )}

      {showLive && <LiveLocation />}
    </View>
  );
}
const styles = StyleSheet.create({
  headerView: {
    zIndex: 99999,
    width: R.unit.width(0.97),
    paddingVertical: R.unit.scale(10),
    position: 'absolute',
    top: R.unit.scale(10),
    left: R.unit.scale(7),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: R.unit.scale(5),
  },
  iconView: {
    backgroundColor: R.color.charcoalShade2,
    padding: R.unit.scale(10),
    borderRadius: R.unit.scale(10),
    borderColor: R.color.black,
  },
});

export default MapHeader;
