import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {URL, apiHeader} from '@config/apiUrl';
import {Get, Post} from '@axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import {getUserCards} from '@store/user/userSlice';
import {MasterCardIcon, VisaIcon} from '@components/utils/Svg';
import R from '@components/utils/R';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Text from '@components/common/Text';
import CreditCard from '@components/view/cards/CreditCard';
import Icon from '@components/common/Icon';
import AddCardsModal from '@components/view/modal/AddCardsModal';
import PopUp from '@components/common/PopUp';

function PaymentScreen(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const authToken = user?.userToken;
  const header = apiHeader(authToken, false);

  const headerProps = {
    isSubHeader: true,
    mainHeading: 'Payment',
    isBack: false,
  };

  const [cards, setCards] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [paymentId, setPaymentId] = useState();
  const [cardData, setCardData] = useState();

  useEffect(() => {
    getCards();
    setCards(user?.userCards);
  }, []);

  const getCards = async () => {
    const getCardsURL = URL('users/payment-methods');
    const response = await Get(getCardsURL, authToken);
    if (response !== undefined) {
      dispatch(getUserCards(response?.data?.data));
      setCards(response?.data?.data);
    }
  };

  const addCard = data => {
    setCards(data);
  };

  const selectCard = item => {
    setPaymentId(item?.id);
    let trimmedString = String(item?.card?.exp_year).substring(
      String(item?.card?.exp_year).indexOf('0') + 1,
    );
    setCardData({
      validMonth: item?.card?.exp_month,
      validYear: trimmedString,
      cardType: item?.card?.brand,
      endDigits: item?.card?.last4,
    });
  };

  const deleteCard = async id => {
    const removeCardUrl = URL('users/detach-payment-methods');
    let updatedData = cards.filter(item => item.id !== id);
    setCards(updatedData);
    setCardData({});
    PopUp({
      heading: 'Card Removed Successfully',
      bottomOffset: 0.7,
      visibilityTime: 3000,
      position: 'top',
    });
    const data = {
      pmId: id,
    };
    const response = await Post(removeCardUrl, data, header);
    if (response !== undefined) {
      dispatch(getUserCards(response?.data?.data));
      setPaymentId('');
    }
  };

  return (
    <ScreenBoiler {...props} headerProps={headerProps}>
      <View style={[R.styles.container, styles.mainLayout]}>
        <View style={styles.formView}>
          <CreditCard cardData={cardData} />
          <View style={[R.styles.rowView, styles.addCardView]}>
            <TouchableOpacity
              style={R.styles.rowView}
              activeOpacity={0.6}
              onPress={() => setIsModal(!isModal)}>
              <Text
                variant={'h5'}
                font={'PoppinsRegular'}
                color={R.color.black}
                align={'left'}
                style={{marginRight: R.unit.scale(5)}}
                transform={'none'}>
                Add Card
              </Text>
              <Icon
                name={'ios-add-circle'}
                type={'Ionicons'}
                color={R.color.charcoalShade2}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {cards?.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                marginTop: R.unit.scale(120),
              }}>
              <Text
                variant={'body2'}
                font={'PoppinsSemiBold'}
                color={R.color.blackShade2}
                align={'center'}
                transform={'capitalize'}>
                No cards found
              </Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              contentContainerStyle={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column',
                paddingBottom: R.unit.scale(100),
              }}>
              {cards?.map((item, index) => {
                return (
                  <View
                    style={[R.styles.twoItemsRow, styles.radioOption]}
                    key={index}>
                    <TouchableOpacity
                      style={{padding: 5}}
                      activeOpacity={0.9}
                      onPress={() => selectCard(item)}>
                      <View
                        style={
                          paymentId === item?.id
                            ? styles.selectedCheckBoxView
                            : styles.checkBoxView
                        }
                      />
                    </TouchableOpacity>
                    <View style={styles.svgView}>
                      {item?.card?.brand === 'visa' ? (
                        <VisaIcon width="100%" height="100%" />
                      ) : (
                        <MasterCardIcon width="100%" height="100%" />
                      )}
                    </View>
                    <Text
                      variant={'body2'}
                      font={'semiBold'}
                      color={R.color.black}
                      align={'left'}
                      style={{marginLeft: R.unit.scale(5)}}
                      transform={'capitalize'}>
                      {item?.card?.last4}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                      }}>
                      <Icon
                        name={'trash-o'}
                        type={'FontAwesome'}
                        color={R.color.red}
                        size={25}
                        iconStyles={{
                          padding: 5,
                        }}
                        onPress={() => deleteCard(item?.id)}
                      />
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
      <AddCardsModal isVisibleModal={isModal} submitCard={addCard} />
    </ScreenBoiler>
  );
}
export default PaymentScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.lightSilver,
    paddingHorizontal: 0,
    flex: 1,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
  addCardView: {
    justifyContent: 'flex-end',
    marginTop: R.unit.scale(40),
    paddingVertical: R.unit.scale(10),
    borderBottomColor: R.color.gray,
    // borderBottomWidth: R.unit.scale(0.75),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.06),
  },
  radioOption: {
    marginVertical: R.unit.height(0.007),
    paddingHorizontal: 0,
  },
  checkBoxView: {
    backgroundColor: R.color.white,
    width: R.unit.scale(20),
    height: R.unit.scale(20),
    marginRight: R.unit.scale(20),
    borderRadius: R.unit.scale(20),
    borderColor: R.color.gray,
    borderWidth: R.unit.scale(0.5),
  },
  selectedCheckBoxView: {
    backgroundColor: R.color.black,
    width: R.unit.scale(20),
    height: R.unit.scale(20),
    marginRight: R.unit.scale(20),
    borderRadius: R.unit.scale(20),
    borderColor: R.color.gray6,
    borderWidth: R.unit.scale(3),
  },
});
