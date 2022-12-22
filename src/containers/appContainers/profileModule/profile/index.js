import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {imageUrl} from '@config/apiUrl';
import Text from '@components/common/Text';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import PictureModal from '@components/view/modal/PictureModal';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';

const width = Dimensions.get('window').width;

function Profile(props) {
  const isFocused = useIsFocused();
  const user = useSelector(state => state.user);
  const {navigation} = props;
  const headerProps = {
    isSubHeader: true,
    mainHeading: 'Profile',
    isBack: false,
  };

  const [isModal, setIsModal] = useState(false);
  let photo = imageUrl + user?.user?.photo;

  const openPicModal = () => {
    setIsModal(!isModal);
  };

  const EditField = data => {
    if (data === 'name') {
      navigation.navigate('EditField', {
        title: 'Name',
        fieldValue: user?.user?.displayName,
      });
    } else if (data === 'number') {
      navigation.navigate('EditField', {
        title: 'Number',
        fieldValue: user?.user?.contact,
      });
    } else {
      navigation.navigate('EditField', {
        title: 'Password',
        fieldValue: 'MAAZ',
      });
    }
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 50 : 100,
          alignItems: 'center',
        }}>
        <View style={styles.profilePictureLayout}>
          {user?.user?.photo === undefined ||
          user?.user?.photo?.length === 0 ? (
            <Image
              resizeMode="cover"
              style={styles.profileImage}
              imageStyle={{borderRadius: R.unit.scale(120)}}
              source={R.image.userPin()}
            />
          ) : (
            <Image
              resizeMode="cover"
              style={styles.profileImage}
              imageStyle={{borderRadius: R.unit.scale(120)}}
              source={{uri: imageUrl(user?.user?.photo)}}
            />
          )}
          <TouchableOpacity
            onPress={openPicModal}
            style={[
              {
                position: 'absolute',
                bottom: 10,
                right: 5,
              },
            ]}>
            <View style={styles.iconView}>
              <Icon
                name={'camera'}
                size={25}
                type={'Ionicons'}
                color={R.color.white}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.itemLayout}>
          <TouchableOpacity
            style={[R.styles.twoItemsRow, styles.itemRow]}
            activeOpacity={0.5}
            onPress={() => EditField('name')}>
            <View
              style={{
                width: R.unit.scale(50),
                alignItems: 'center',
              }}>
              <Icon
                name={'user-circle-o'}
                size={25}
                type={'FontAwesome'}
                color={R.color.lightGray}
              />
            </View>

            <View style={{marginLeft: R.unit.scale(10)}}>
              <Text
                variant={'body1'}
                font={'semiBold'}
                color={R.color.lightGray}
                align={'left'}
                transform={'none'}>
                Name
              </Text>
              <Text
                variant={'h6'}
                font={'regular'}
                gutterTop={5}
                color={R.color.black}
                align={'left'}
                transform={'capitalize'}>
                {user?.user?.displayName}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[R.styles.twoItemsRow, styles.itemRow]}
            activeOpacity={0.5}
            onPress={() => EditField('number')}>
            <View
              style={{
                width: R.unit.scale(50),
                alignItems: 'center',
              }}>
              <Icon
                name={'mobile1'}
                size={25}
                type={'AntDesign'}
                color={R.color.lightGray}
              />
            </View>

            <View style={{marginLeft: R.unit.scale(10)}}>
              <Text
                variant={'body1'}
                font={'semiBold'}
                color={R.color.lightGray}
                align={'left'}
                transform={'none'}>
                Mobile Number
              </Text>
              <Text
                variant={'h6'}
                font={'regular'}
                gutterTop={5}
                color={R.color.black}
                align={'left'}
                transform={'capitalize'}>
                {user?.user?.dialCode + user?.user?.contact}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[R.styles.twoItemsRow, styles.itemRow]}
            activeOpacity={0.5}
            onPress={() => EditField('password')}>
            <View
              style={{
                width: R.unit.scale(50),
                alignItems: 'center',
              }}>
              <Icon
                name={'lock-closed-outline'}
                size={25}
                type={'Ionicons'}
                color={R.color.lightGray}
              />
            </View>

            <View style={{marginLeft: R.unit.scale(10)}}>
              <Text
                variant={'body1'}
                font={'semiBold'}
                color={R.color.lightGray}
                align={'left'}
                transform={'none'}>
                Change Password
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <PictureModal isVisibleModal={isModal} />
    </ScreenBoiler>
  );
}
export default Profile;

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingTop: R.unit.scale(30),
    paddingHorizontal: R.unit.scale(10),
    backgroundColor: R.color.lightSilver,
  },
  buttonLayout: {
    width: '100%',
    marginBottom: 0,
    flexGrow: 0,
    overflow: 'scroll',
    paddingBottom: R.unit.scale(20),
    paddingHorizontal: R.unit.scale(17),
  },
  profilePictureLayout: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: R.unit.scale(50),
  },
  profileImage: {
    width: R.unit.scale(160),
    height: R.unit.scale(160),
    borderRadius: R.unit.scale(120),
    borderWidth: R.unit.scale(2),
    borderColor: R.color.blackShade2,
  },
  itemLayout: {
    width: '100%',
    paddingHorizontal: 0,
  },
  itemRow: {
    padding: R.unit.scale(10),
    marginBottom: R.unit.scale(10),
    // backgroundColor: 'red',
    paddingHorizontal: 0,
  },
  iconView: {
    backgroundColor: '#3B3C40',
    padding: R.unit.scale(10),
    borderRadius: R.unit.scale(30),
    overflow: 'hidden',
  },
  uploadIcon: {
    color: 'white',
    alignSelf: 'center',
    fontSize: R.unit.scale(22, 0.6),
    left: R.unit.scale(50),
    backgroundColor: '#707070',
    width: R.unit.scale(30),
    height: R.unit.scale(30),
    marginLeft: R.unit.scale(10),
    borderRadius: R.unit.scale(100),
    padding: R.unit.scale(4, 0.3),
  },
});
