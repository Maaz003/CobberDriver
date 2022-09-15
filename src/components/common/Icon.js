import React from 'react';
import {Icon as Iconc} from 'native-base';
import R from '@components/utils/R';

const Icon = props => {
  const {name, type, size, color = 'black', iconStyles, onPress} = props;
  return (
    <Iconc
      name={name}
      type={type}
      onPress={onPress}
      style={[{color: color, fontSize: R.unit.scale(size)}, iconStyles]}
    />
  );
};
export default Icon;
