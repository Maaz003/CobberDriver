import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Text from '@components/common/Text';
import {imageUrl} from '@config/apiUrl';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import {
  HistoryIcon,
  LegalIcon,
  LogOutIcon,
  WalletIcon,
  ScheduleRide,
  SettingsLogo,
  Footer,
  StarLogo,
  Home,
} from '@components/utils/Svg';
import LogOutModal from '@components/view/modal/LogOutModal';

const height = Dimensions.get('window').height;
const originalWidth = 465;
const originalHeight = 140;
const aspectRatio = originalWidth / originalHeight;

const CustomDrawer = props => {
  const {navigation} = props;
  const user = useSelector(state => state.user);
  let picture = imageUrl + user?.user?.photo;
  const [isModal, setIsModal] = useState(false);

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const navigateProfile = () => {
    navigation.navigate('Profile');
    navigation.closeDrawer();
  };

  const switchScreen = data => {
    if (data?.id === 7) {
      logOutFunction();
    } else if (data?.id === 1) {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    } else if (data.id === 3) {
      navigation.navigate('Payment', {
        type: 'home',
      });
    } else {
      navigation.navigate(data?.route);
      navigation.closeDrawer();
    }
  };

  const logOutFunction = () => {
    setIsModal(!isModal);
  };

  const drawerItems = [
    {
      name: 'Home',
      id: 1,
      route: 'HomeScreen',
      svg: <Home height="100%" width="100%" fill={'#85FA00'} />,
    },
    // {
    //   name: 'Schedule Ride',
    //   id: 2,
    //   route: 'History',
    //   svg: <ScheduleRide height="100%" width="100%" fill={'#85FA00'} />,
    // },
    {
      name: 'Add Payments',
      id: 3,
      route: 'Payment',
      svg: <WalletIcon height="100%" width="100%" fill={'#85FA00'} />,
    },
    {
      name: 'History',
      id: 4,
      route: 'History',
      svg: <HistoryIcon height="100%" width="100%" fill={'#85FA00'} />,
    },
    {
      name: 'Privacy Policy',
      id: 5,
      route: 'PrivacyPolicy',
      svg: <SettingsLogo height="100%" width="100%" fill={'#85FA00'} />,
    },
    {
      name: 'Help',
      id: 6,
      route: 'FAQ',
      svg: <LegalIcon height="100%" width="100%" fill={'#85FA00'} />,
    },
    {
      name: 'Logout',
      id: 7,
      route: 'History',
      svg: <LogOutIcon height="100%" width="100%" fill={'#85FA00'} />,
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          // paddingBottom: Platform.OS === 'ios' ? 60 : 40,
        }}>
        <View>
          <TouchableOpacity
            onPress={toggleDrawer}
            activeOpacity={0.6}
            style={styles.headerView}>
            <View
              styles={{
                width: '100%',
                backgroundColor: 'red',
                flexDirection: 'row',
                alignContent: 'flex-end',
              }}>
              <Icon
                name={'cross'}
                type={'Entypo'}
                size={40}
                color={R.color.mainColor}
              />
            </View>
          </TouchableOpacity>

          <View style={R.styles.twoItemsRow}>
            {user?.user?.photo === undefined ? (
              <TouchableOpacity activeOpacity={0.9} onPress={navigateProfile}>
                <Image
                  resizeMode="cover"
                  style={styles.image}
                  imageStyle={{borderRadius: 120}}
                  source={require('../../../assets/Images/profilePic.jpg')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.9} onPress={navigateProfile}>
                <Image
                  resizeMode="cover"
                  style={styles.image}
                  imageStyle={{borderRadius: 120}}
                  source={{uri: picture}}
                />
              </TouchableOpacity>
            )}
            <View style={styles.nameView}>
              <Text
                variant={'body3'}
                font={'regular'}
                color={R.color.white}
                align={'left'}
                transform={'capitalize'}>
                HELLO
              </Text>
              <Text
                variant={'h2'}
                font={'semiBold'}
                color={R.color.white}
                align={'left'}
                transform={'capitalize'}>
                {user?.user?.displayName}
              </Text>
              <View style={styles.ratingView}>
                <View style={styles.ratingSvgView}>
                  <StarLogo height="100%" width="100%" />
                </View>
                <Text
                  variant={'body3'}
                  font={'semiBold'}
                  color={R.color.white}
                  style={{
                    backgroundColor: R.color.black,
                    borderRadius: R.unit.scale(100),
                    paddingHorizontal: R.unit.scale(10),
                    paddingVertical: R.unit.scale(4),
                    marginLeft: R.unit.scale(5),
                  }}
                  align={'left'}
                  transform={'capitalize'}>
                  5.0
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.itemsView}>
            {drawerItems?.map(item => {
              return (
                <>
                  {item?.id > 1 && <View style={R.styles.divider} />}
                  <TouchableOpacity
                    onPress={() => switchScreen(item)}
                    style={[R.styles.twoItemsRow, styles.menuItemLayout]}>
                    <View style={styles.svgView}>{item.svg}</View>
                    <Text
                      variant={'body2'}
                      font={'semiBold'}
                      gutterTop={2}
                      color={R.color.white}
                      align={'left'}
                      style={{marginLeft: R.unit.scale(10)}}
                      transform={'capitalize'}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                </>
              );
            })}
          </View>
        </View>
        <View style={styles.footerView}>
          <Footer
            width="100%"
            height="100%"
            viewBox={`0 0 ${originalWidth} ${originalHeight}`}
          />
        </View>
      </ScrollView>
      <LogOutModal isVisibleModal={isModal} />
    </SafeAreaView>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: R.color.blackShade2,
  },
  headerView: {
    padding: R.unit.scale(20),
  },
  image: {
    height: R.unit.scale(80),
    width: R.unit.scale(80),
    borderRadius: R.unit.scale(120),
    borderColor: R.color.black,
    borderWidth: 1.5,
    shadowColor: R.color.mainColor,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  nameView: {
    justifyContent: 'center',
    marginLeft: R.unit.scale(10),
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingSvgView: {
    aspectRatio: 1,
    height: R.unit.height(0.022),
  },
  itemsView: {
    paddingHorizontal: R.unit.scale(5),
    marginTop: R.unit.scale(40),
  },
  menuItemLayout: {
    padding: R.unit.scale(15),
    alignItems: 'center',
  },
  menuItem: {
    marginRight: R.unit.scale(10),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.03),
  },
  footerView: {
    width: R.unit.width(1),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-end',
    paddingRight: R.unit.scale(30),
    aspectRatio,
  },
});
