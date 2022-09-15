import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';

function ItemPictureModal(props) {
  const {modalPic, deleteParent} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const deletePic = () => {
    deleteParent(modalPic?.id);
    setIsBlur(false);
  };

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      // visible={true}
      visible={modalVisible}
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
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <ImageBackground
              style={styles.backgroundImage}
              imageStyle={{borderRadius: R.unit.scale(20)}}
              source={{uri: modalPic?.path}}>
              <View style={styles.cancelButtonView}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setIsBlur(false)}
                  style={styles.closeButton}>
                  <Icon
                    type={'Entypo'}
                    name={'cross'}
                    iconStyles={{
                      backgroundColor: R.color.lightSilver,
                      borderRadius: R.unit.scale(100),
                    }}
                    color={R.color.blackShade2}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.editButtonView}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={deletePic}
                  style={styles.saveButton}>
                  <Icon
                    name={'trash'}
                    size={25}
                    type={'FontAwesome5'}
                    color={R.color.black}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: R.color.blackShade2,
    width: '100%',
    height: R.unit.height(0.4),
    borderRadius: R.unit.scale(20),
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  cancelButtonView: {
    zIndex: 9999,
    position: 'absolute',
    top: 12,
    right: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButtonView: {
    zIndex: 9999,
    position: 'absolute',
    bottom: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'flex-end',
    paddingRight: 20,
    borderBottomLeftRadius: R.unit.scale(25),
    borderBottomRightRadius: R.unit.scale(25),
  },

  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: R.color.mainColor,
    paddingHorizontal: R.unit.scale(20),
    borderRadius: R.unit.scale(10),
  },
  closeButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: R.color.lightSilver,
    borderRadius: R.unit.scale(100),
    padding: R.unit.scale(2),
    borderWidth: 2,
    borderColor: R.color.black,
  },
  saveButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: R.color.lightSilver,
    paddingHorizontal: R.unit.scale(10),
    borderRadius: R.unit.scale(10),
    borderWidth: 2,
    borderColor: R.color.black,
  },
});

export default ItemPictureModal;
