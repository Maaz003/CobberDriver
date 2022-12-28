import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {URL, apiHeader} from '@config/apiUrl';
import {STRIPE_KEY} from '@env';
import {useSelector} from 'react-redux';
import {Post} from '@axios/AxiosInterceptorFunction';
import {
  StripeProvider,
  CardField,
  useStripe,
} from '@stripe/stripe-react-native';
import R from '@components/utils/R';
import PopUp from '@components/common/PopUp';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import {toastConfig} from '@components/utils/Validators';

function AddCardsModal(props) {
  const {submitCard} = props;
  const auth = useSelector(state => state.auth);
  const authToken = auth?.userToken;
  const header = apiHeader(authToken, false);
  const {createPaymentMethod} = useStripe();
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const addCard = async () => {
    setIsLoading(true);
    const responseCard = await createPaymentMethod({type: 'Card'});
    if (responseCard?.error) {
      setShowToast(false);

      PopUp({
        heading: responseCard?.error?.message,
        bottomOffset: 0.7,
        visibilityTime: 3000,
        position: 'top',
      });
      setIsLoading(false);
    } else {
      const id = responseCard?.paymentMethod?.id;
      const data = {
        pmId: id,
      };
      const addCardUrl = URL('users/attach-payment-methods');
      const response = await Post(addCardUrl, data, header);

      if (response !== undefined) {
        setShowToast(true);
        PopUp({
          heading: 'Card Added Succesfully',
          bottomOffset: 0.7,
          visibilityTime: 2000,
          position: 'top',
        });
        submitCard(response?.data?.data);
        setIsLoading(false);
        setIsBlur(false);
      } else {
        setShowToast(false);
        PopUp({
          heading: 'Card Not Added',
          bottomOffset: 0.7,
          visibilityTime: 3000,
          position: 'top',
          type: 'danger',
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal
      animationType={'fades'}
      transparent={true}
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
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <Text
              variant={'h2'}
              font={'PoppinsSemiBold'}
              gutterTop={5}
              gutterBottom={30}
              color={R.color.charcoalShade2}
              align={'center'}
              transform={'uppercase'}>
              Card
            </Text>
            <Text
              variant={'body1'}
              font={'PoppinsMedium'}
              gutterTop={5}
              gutterBottom={0}
              color={R.color.charcoalShade2}
              align={'left'}
              transform={'none'}>
              Enter card details
            </Text>

            <StripeProvider
              publishableKey={STRIPE_KEY}
              merchantIdentifier="merchant.identifier">
              <CardField
                postalCodeEnabled={false}
                autofocus
                placeholder={{
                  number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                  backgroundColor: R.color.lightSilver,
                  textColor: R.color.black,
                  placeholderColor: R.color.gray,
                }}
                style={{
                  width: '100%',
                  height: 50,
                  marginVertical: 10,
                }}
                onCardChange={e => {
                  if (e.complete) {
                    setValid(true);
                  } else {
                    setValid(false);
                  }
                }}
              />
            </StripeProvider>

            <Button
              value="Done"
              bgColor={R.color.mainColor}
              width={'70%'}
              size={'xxmd'}
              disabled={isLoading}
              color={R.color.blackLightShade}
              borderRadius={100}
              gutterTop={40}
              fontSize={20}
              loaderColor={'white'}
              loader={isLoading}
              onPress={addCard}
            />
          </View>
        </>
      </View>
      {!showToast && <Toast config={toastConfig} />}
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
    paddingHorizontal: R.unit.scale(16),
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    paddingHorizontal: R.unit.scale(16),
    paddingVertical: R.unit.scale(16),
    borderRadius: R.unit.scale(2),
  },
});

export default AddCardsModal;
