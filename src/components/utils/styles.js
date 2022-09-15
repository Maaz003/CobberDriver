import {StyleSheet} from 'react-native';
import unit from './Unit';
import color from './Colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: unit.scale(10),
  },
  rowView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  twoItemsRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: unit.scale(10),
    alignItems: 'center',
  },
  twoItemsColumns: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: unit.scale(10),
    alignItems: 'center',
  },
  centeredView: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: color.black,
    width: '90%',
    marginLeft: unit.scale(12),
    height: 2,
  },
  verticalDivider: {
    backgroundColor: color.gray,
    width: 1,
    height: 40,
  },
  pickupEllipse: {
    borderRadius: 100,
    backgroundColor: color.white,
    height: unit.scale(20),
    width: unit.scale(20),
    borderWidth: unit.scale(4),
    borderColor: color.mainColor,
    marginBottom: unit.scale(4),
  },
  mapView: {
    height: unit.height(1),
    width: unit.width(1),
    top: 0,
  },
  mainLayout: {
    flex: 1,
  },
  loaderView: {
    zIndex: 99999,
    width: unit.width(1),
    height: '100%',
    position: 'absolute',
    bottom: unit.width(1) - unit.scale(250),
    right: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
});

export default styles;
