import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserCards, updateUser} from '@store/user/userSlice';
import {Get, Post} from '@axios/AxiosInterceptorFunction';
import {URL, apiHeader} from '@config/apiUrl';
import R from '@components/utils/R';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';
import {MasterCardIcon, VisaIcon} from '@components/utils/Svg';
import AddCardsModal from '@components/view/modal/AddCardsModal';
import CreditCard from '@components/view/cards/CreditCard';
import Button from '@components/common/Button';
import Toast from '@components/utils/Toast';

function PaymentScreen(props) {
  const {navigation} = props;
  // const {planId} = props.route.params;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const authToken = auth?.userToken;
  const header = apiHeader(authToken, false);
  const headerProps = {
    isSubHeader: true,
    mainHeading: 'Payment',
  };

  const [paymentId, setPaymentId] = useState();
  const [isModal, setIsModal] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [cardData, setCardData] = useState();
  const [paymentProcessingLoading, setPaymentProcessLoading] = useState(false);
  const [cardsList, setCardsList] = useState(user?.userCards);

  useEffect(() => {
    getCards();
    setCardsList(user?.userCards);
  }, [isFocused]);

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
    let updatedData = cardsList.filter(item => item.id !== id);
    setCardsList(updatedData);
    Toast.show({
      title: 'Sucess',
      message: 'Card Removed Successfully',
      type: 'success',
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

  const getCards = async () => {
    const getCardsURL = URL('users/payment-methods');
    const response = await Get(getCardsURL, authToken);
    if (response !== undefined) {
      dispatch(getUserCards(response?.data?.data));
      setCardsList(response?.data?.data);
    }
  };

  const getUpdatedCards = data => {
    dispatch(getUserCards(data));
    setCardsList(data);
  };

  const purchasePlan = async () => {
    setPaymentProcessLoading(true);
    const data = {
      paymentMethodId: paymentId,
      // planId: planId,
    };
    const purchasePackageUrl = URL('users/package/buy');
    const response = await Post(purchasePackageUrl, data, header);
    if (response !== undefined) {
      const updatedUser = response?.data?.data;
      dispatch(updateUser(updatedUser));
      Toast.show({
        title: 'Sucess',
        message: 'Package bought. Now you can avail services',
        type: 'success',
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
      setPaymentProcessLoading(false);
      setPaymentId(undefined);
    }
    setPaymentProcessLoading(false);
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView
        style={styles.mainLayout}
        nestedScrollEnabled={true}
        vertical={false}
        scrollEnabled={enabled}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom:
            Platform.OS === 'ios' ? R.unit.height(0.02) : R.unit.height(0.02),
          paddingHorizontal: 10,
          height: R.unit.height(0.8),
        }}>
        <CreditCard cardData={cardData} />
        <Text
          variant={'h2'}
          font={'semiBold'}
          gutterTop={30}
          color={R.color.gray}
          align={'left'}
          style={{width: '100%'}}
          transform={'capitalize'}>
          Select Card
        </Text>

        {cardsList?.length === 0 ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              variant={'body2'}
              font={'italic'}
              color={R.color.gray}
              align={'left'}
              transform={'capitalize'}>
              No cards found
            </Text>
          </View>
        ) : (
          <ScrollView
            style={{width: '100%', marginTop: 10}}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            onTouchStart={ev => {
              setEnabled(false);
            }}
            onMomentumScrollEnd={e => {
              setEnabled(true);
            }}
            onScrollEndDrag={e => {
              setEnabled(true);
            }}
            onTouchEnd={ev => {
              setEnabled(true);
            }}
            contentContainerStyle={{
              paddingBottom: 40,
            }}>
            {cardsList?.map((item, index) => {
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
                    color={R.color.gray}
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
        <TouchableOpacity
          style={styles.addCardButton}
          activeOpacity={0.6}
          onPress={() => setIsModal(!isModal)}>
          <Icon
            name={'md-add-outline'}
            type={'Ionicons'}
            color={R.color.white}
            size={30}
          />
        </TouchableOpacity>
        {paymentId && cardsList?.length > 0 ? (
          <Button
            value={'Purchase'}
            bgColor={R.color.mainColor}
            width={'55%'}
            size={'xmd'}
            variant={'body2'}
            font={'semiBold'}
            height={R.unit.scale(80, 0.3)}
            loader={paymentProcessingLoading}
            disabled={paymentProcessingLoading}
            color={'white'}
            borderRadius={R.unit.scale(100, 0.3)}
            borderColor={'black'}
            gutterBottom={R.unit.scale(40, 0.3)}
            onPress={purchasePlan}
          />
        ) : null}
      </ScrollView>
      <AddCardsModal isVisibleModal={isModal} refreshList={getUpdatedCards} />
    </ScreenBoiler>
  );
}
export default PaymentScreen;

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    width: '100%',
    paddingHorizontal: R.unit.scale(10),
    paddingTop: R.unit.scale(10),
    position: 'relative',
  },
  addCardButton: {
    height: R.unit.height(0.07),
    width: R.unit.width(0.162),
    backgroundColor: R.color.mainColor,
    borderRadius: R.unit.width(0.2),
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? R.unit.height(0.05) : R.unit.height(0.02),
    right: 20,
    zIndex: 99999,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: R.color.mainColor,
    width: R.unit.scale(20),
    height: R.unit.scale(20),
    marginRight: R.unit.scale(20),
    borderRadius: R.unit.scale(20),
    borderColor: R.color.gray6,
    borderWidth: R.unit.scale(3),
  },
});
