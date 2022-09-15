import React from 'react';
import {View} from 'react-native';
import R from '@components/utils/R';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function SkeletonLoader(props) {
  return (
    <SkeletonPlaceholder
      backgroundColor={R.color.blackLightShade}
      highlightColor={R.color.lightGray}>
      <SkeletonPlaceholder.Item
        width={R.unit.width(0.9)}
        height={R.unit.scale(25)}
        borderRadius={R.unit.scale(10)}
        marginBottom={R.unit.scale(12)}
      />
      <View style={{...R.styles.twoItemsRow, paddingHorizontal: 0}}>
        <SkeletonPlaceholder.Item
          width={R.unit.scale(40)}
          height={R.unit.scale(40)}
          borderRadius={R.unit.scale(40)}
        />
        <SkeletonPlaceholder.Item
          width={R.unit.width(0.77)}
          height={R.unit.scale(25)}
          borderRadius={R.unit.scale(5)}
          marginLeft={R.unit.scale(10)}
        />
      </View>
      <SkeletonPlaceholder.Item
        width={R.unit.width(0.9)}
        height={R.unit.scale(25)}
        marginTop={R.unit.scale(12)}
        borderRadius={R.unit.scale(5)}
      />
    </SkeletonPlaceholder>
  );
}

export default SkeletonLoader;
