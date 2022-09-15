import React from 'react';
import Dash from 'react-native-dash';

const DashLine = props => {
  const {
    dashGap,
    dashLength,
    dashThickness,
    dashColor = 'black',
    style,
  } = props;
  return (
    <Dash
      DashGap={dashGap}
      dashLength={dashLength}
      dashThickness={dashThickness}
      dashColor={dashColor}
      style={[style]}
    />
  );
};
export default DashLine;
