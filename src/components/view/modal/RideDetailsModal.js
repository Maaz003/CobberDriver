import React, {useEffect, useState} from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import ModalHeader from '@components/layout/modalHeader';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import {ClockIcon, PinLocation} from '@components/utils/Svg';
import ItemPictureModal from './ItemPictureModal';
import {itemPictures} from '@components/constants';

function RideDetailsModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const closeModal = () => {
    setIsBlur(false);
  };

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      // visible={true}
      visible={modalVisible}
      onRequestClose={closeModal}
      onShow={() => {
        setIsBlur(true);
      }}>
      <View style={styles.centeredView}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          <TouchableOpacity
            onPress={closeModal}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <ModalHeader goBack={closeModal} />
            <View style={styles.contentView}>
              <Text
                variant={'h1'}
                font={'bold'}
                color={R.color.blackShade2}
                align={'left'}
                gutterBottom={24}
                transform={'none'}>
                Ride Details
              </Text>
              <View style={[R.styles.twoItemsRow, styles.nameView]}>
                <Image
                  source={R.image.dummyUser()}
                  style={styles.image}
                  resizeMode={'cover'}
                />
                <Text
                  variant={'h2'}
                  font={'bold'}
                  color={R.color.blackShade2}
                  align={'left'}
                  numberOfLines={2}
                  transform={'none'}>
                  Lorem Ipsum
                </Text>
              </View>
              <View style={[R.styles.twoItemsRow, styles.detailsView]}>
                <View style={styles.svgView}>
                  <View style={styles.pickupEllipse} />
                </View>
                <Text
                  variant={'body2'}
                  font={'regular'}
                  color={R.color.gray4}
                  align={'left'}
                  style={{flex: 1}}
                  numberOfLines={3}
                  transform={'none'}>
                  DeWitt Clinton Park, W 54th St, New.
                </Text>
              </View>

              <View style={[R.styles.twoItemsRow, styles.detailsView]}>
                <View style={styles.svgView}>
                  <PinLocation
                    height="100%"
                    width="100%"
                    fill={R.color.gray6}
                  />
                </View>
                <Text
                  variant={'body2'}
                  font={'regular'}
                  color={R.color.gray4}
                  align={'left'}
                  style={{flex: 1}}
                  numberOfLines={3}
                  transform={'none'}>
                  DeWitt Clinton Park, W 54th St, New.
                </Text>
              </View>
              <View style={[R.styles.twoItemsRow, styles.detailsView]}>
                <View style={styles.svgView}>
                  <ClockIcon height="100%" width="100%" fill={R.color.gray6} />
                </View>
                <Text
                  variant={'body2'}
                  font={'regular'}
                  color={R.color.gray4}
                  align={'left'}
                  numberOfLines={1}
                  transform={'none'}>
                  Ride Details
                </Text>
              </View>
              <View style={[R.styles.twoItemsRow, styles.detailsView]}>
                <View
                  style={{
                    marginRight: R.unit.scale(12),
                    width: R.unit.scale(20),
                    alignItems: 'center',
                  }}>
                  <Icon
                    name={'calendar'}
                    type={'Ionicons'}
                    color={R.color.gray6}
                    size={17}
                  />
                </View>
                <Text
                  variant={'body2'}
                  font={'regular'}
                  color={R.color.gray4}
                  align={'left'}
                  numberOfLines={1}
                  transform={'none'}>
                  Ride Details
                </Text>
              </View>

              <View style={styles.picturesRow}>
                {itemPictures?.map(item => {
                  return (
                    <TouchableOpacity onPress={() => setIsModal(!isModal)}>
                      <Image
                        source={R.image.userPin()}
                        resizeMode={'cover'}
                        style={styles.itemPicture}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={[R.styles.rowView, styles.buttonLayout]}>
              <TouchableOpacity style={styles.rejectButton}>
                <Icon
                  name={'close'}
                  type={'Ionicons'}
                  color={R.color.blackShade2}
                  size={20}
                />
              </TouchableOpacity>
              <Button
                value="Accept"
                bgColor={R.color.mainColor}
                width={'80%'}
                size={'lg'}
                variant={'body2'}
                font={'bold'}
                color={R.color.white}
                borderRadius={10}
                borderColor={R.color.mainColor}
                onPress={() => {
                  return null;
                }}
              />
            </View>
          </View>
        </>
      </View>
      <ItemPictureModal isVisibleModal={isModal} showControls={false} />
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    borderTopRightRadius: R.unit.scale(10),
    borderTopLeftRadius: R.unit.scale(10),
    paddingBottom: R.unit.pdBottomList(10),
  },
  contentView: {
    width: '100%',
    paddingHorizontal: R.unit.scale(16),
  },
  nameView: {
    marginBottom: R.unit.scale(32),
  },
  image: {
    height: R.unit.scale(130),
    width: R.unit.scale(89),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(12),
  },
  detailsView: {
    marginBottom: R.unit.scale(16),
  },
  pickupEllipse: {
    height: R.unit.scale(15),
    width: R.unit.scale(15),
    backgroundColor: R.color.white,
    borderWidth: R.unit.scale(5),
    borderColor: R.color.gray6,
    borderRadius: R.unit.scale(20),
  },
  svgView: {
    height: R.unit.scale(15),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: R.unit.scale(12),
    width: R.unit.scale(20),
  },
  picturesRow: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: R.unit.scale(16),
    width: '100%',
    flexDirection: 'row',
  },
  itemPicture: {
    height: R.unit.scale(55),
    width: R.unit.scale(55),
    borderRadius: R.unit.scale(5),
    marginRight: R.unit.scale(4),
    marginBottom: R.unit.scale(5),
    borderWidth: 1,
    borderColor: R.color.blackLightShade,
  },
  buttonLayout: {
    width: '100%',
    borderTopColor: R.color.gray,
    borderTopWidth: R.unit.scale(0.75),
    padding: R.unit.scale(16),
    marginTop: R.unit.scale(24),
  },
  rejectButton: {
    padding: R.unit.scale(15),
    borderRadius: R.unit.scale(10),
    borderColor: R.color.gray5,
    borderWidth: R.unit.scale(0.75),
  },
});

export default RideDetailsModal;
