import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import {countriesDialCode} from '@components/constants';
import CountryFlag from 'react-native-country-flag';

function CountryListModal(props) {
  const {loaderParentCall} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const itemSelected = item => {
    loaderParentCall(item);
    setIsBlur(false);
  };

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={modalVisible}
      // visible={true}
      onRequestClose={() => setIsBlur(false)}
      onShow={() => {
        setIsBlur(true);
      }}>
      <View style={styles.centeredView}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          <TouchableOpacity
            onPress={() => setIsBlur(false)}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <View style={[R.styles.twoItemsRow, styles.header]}>
              <TouchableOpacity
                onPress={() => setIsBlur(false)}
                activeOpacity={0.6}>
                <Icon
                  name={'arrow-back'}
                  type={'Ionicons'}
                  color={R.color.mainColor}
                  size={40}
                  iconStyles={{
                    padding: R.unit.scale(10),
                  }}
                />
              </TouchableOpacity>
              <Text
                variant={'h4'}
                font={'semiBold'}
                color={'white'}
                align={'center'}
                style={{
                  marginLeft: R.unit.scale(30),
                }}
                transform={'none'}>
                Select Country
              </Text>
            </View>
            <FlatList
              bounces={false}
              data={countriesDialCode}
              nestedScrollEnabled={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[styles.listRow, R.styles.twoItemsRow]}
                    key={index}
                    onPress={() => {
                      itemSelected(item);
                    }}>
                    <View
                      style={{
                        ...R.styles.twoItemsRow,
                        width: R.unit.scale(100),
                      }}>
                      <CountryFlag isoCode={item?.code} size={20} />
                      <Text
                        color={R.color.black}
                        variant={'body2'}
                        font={'bold'}
                        style={{padding: R.unit.scale(10)}}>
                        {item?.dial_code}
                      </Text>
                    </View>
                    <Text
                      color={R.color.black}
                      variant={'body2'}
                      font={'semiBold'}
                      align={'left'}
                      style={{
                        padding: R.unit.scale(10),
                      }}>
                      {item?.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    height: R.unit.height(1),
    borderRadius: 10,
  },
  header: {
    paddingHorizontal: 0,
    backgroundColor: R.color.charcoalShade,
    marginBottom: R.unit.scale(10),
  },

  description: {
    fontSize: 18,
    fontFamily: 'Nunnito-SemiBold',
    color: R.color.mainColor,
    padding: R.unit.scale(10),
    marginLeft: R.unit.scale(-10),
    width: R.unit.width(0.97),
  },
  listRow: {
    padding: R.unit.scale(10),
  },
});

export default CountryListModal;
