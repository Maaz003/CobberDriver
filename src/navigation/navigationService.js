import React from 'react';

let navigationRef = React.createRef();
function navigate(routeName, params) {
  navigationRef.current?.navigate(routeName, params);
}

function toggleDrawer(routeName, params) {
  // navigationRef.current?.toggleDrawer();
}

export default {
  navigate,
  toggleDrawer,
  navigationRef,
};
