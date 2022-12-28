import React from 'react';

let navigationRef = React.createRef();
function navigate(routeName, params) {
  navigationRef.current?.navigate(routeName, params);
}
function navigateReset(routeName, params) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: routeName}],
  });
}

function toggleDrawer(routeName, params) {
  // navigationRef.current?.toggleDrawer();
}

export default {
  navigate,
  toggleDrawer,
  navigationRef,
  navigateReset,
};
