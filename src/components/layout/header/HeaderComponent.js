import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import LogoHeader from '@assets/Images/Svgs/LogoHeader.svg';
import {imageUrl} from '@config/apiUrl';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function HeaderComponent(props) {
  const {navigation} = props;
  const user = useSelector(state => state.user);

  let picture = imageUrl + user?.user?.photo;

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <LogoHeader />
    </View>
  );
}
export default HeaderComponent;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    width: width * 0.9,
    marginTop: 20,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightView: {
    height: 70,
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#303030',
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
});
