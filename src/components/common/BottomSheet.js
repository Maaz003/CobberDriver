import React, {useRef, useMemo, useCallback} from 'react';
import {Platform, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import R from '@components/utils/R';

function SwipeSheet(props) {
  const {
    children,
    initalHeight = 0.1,
    onSwipeBottomSheet,
    containerStyles,
  } = props;
  const sheetRef = useRef();
  const snapPoints = useMemo(
    () => [R.unit.height(initalHeight), R.unit.height(0.8)],
    [],
  );
  const handleSheetChange = useCallback(index => {
    onSwipeBottomSheet(index);
  }, []);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      backgroundStyle={[styles.mainLayout, containerStyles]}
      handleIndicatorStyle={styles.notch}
      onChange={handleSheetChange}>
      {children}
    </BottomSheet>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    width: '100%',
    height: '100%',
    backgroundColor: R.color.charcoalShade2,
    paddingHorizontal: R.unit.scale(10),
  },
  notch: {
    width: R.unit.scale(40),
    height: R.unit.scale(5),
    borderRadius: R.unit.scale(40),
    backgroundColor: R.color.gray5,
    marginTop: R.unit.scale(5),
  },
});

export default SwipeSheet;
