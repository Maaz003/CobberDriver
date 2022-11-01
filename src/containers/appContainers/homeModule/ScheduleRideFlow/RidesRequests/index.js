import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import {lessonRequests} from '@components/constants';
import RideRequestsCard from '@components/view/screen/Home/Instant/RideRequestsCard';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';

function RideRequestsScreen(props) {
  const {navigation} = props;
  const [filteredArray, setFilteredArray] = useState(lessonRequests);

  const onRemove = id => {
    let updatedArr = filteredArray.filter(item => item.id !== id);
    setFilteredArray(updatedArr);
  };

  const headerProps = {
    isMainHeader: true,
    isSubHeader: false,
    mainHeading: 'Payment',
  };

  const backPress = () => {
    navigation.goBack();
  };

  return (
    <ScreenBoiler props={props} headerProps={headerProps} backPress={backPress}>
      <View style={[styles.mainLayout, R.styles.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <View style={styles.contentView}>
            <Text
              variant={'h4'}
              font={'Sequel551'}
              color={R.color.blackShade3}
              align={'left'}
              transform={'none'}>
              Ride Requests
            </Text>
            {filteredArray?.map((item, index, arr) => {
              return (
                <RideRequestsCard
                  item={item}
                  index={index}
                  arr={arr}
                  key={index}
                  onRemove={onRemove}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ScreenBoiler>
  );
}
export default RideRequestsScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(16),
    flex: 1,
    marginTop: R.unit.scale(16),
  },
  contentView: {
    width: '100%',
    justifyContent: 'center',
  },
  addCardView: {
    justifyContent: 'flex-end',
    marginTop: R.unit.scale(40),
    paddingVertical: R.unit.scale(10),
  },

  titleView: {
    marginLeft: R.unit.scale(16),
    width: '75%',
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(17),
  },
  popupSvg: {
    aspectRatio: 1,
    height: R.unit.scale(30),
  },
  notificationCard: {
    marginTop: R.unit.scale(24),
  },
  image: {
    width: R.unit.scale(48),
    height: R.unit.scale(48),
    borderRadius: R.unit.scale(8),
  },
  detailView: {
    marginTop: R.unit.scale(12),
  },
  buttonContainer: {
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
  },
  buttonLayout: {
    justifyContent: 'flex-end',
    width: '70%',
  },
  cancelButton: {
    padding: R.unit.scale(16),
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(0.75),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(8),
  },
});
