import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import RideRequestsCard from '@components/view/screen/Home/RideRequestsCard';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';

function NewScheduleRideRequestsScreen(props) {
  const {navigation} = props;
  const {data} = props.route.params;

  const headerProps = {
    isMainHeader: true,
    isSubHeader: false,
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
              New Requests
            </Text>

            {data?.requestedRides?.map((item, index, arr) => {
              return (
                <RideRequestsCard
                  item={item}
                  index={index}
                  arr={arr}
                  key={index}
                  mainRideId={data?._id}
                  screenType={'NewRequests'}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ScreenBoiler>
  );
}
export default NewScheduleRideRequestsScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(10),
    flex: 1,
    marginTop: R.unit.scale(16),
  },
  contentView: {
    width: '100%',
    justifyContent: 'center',
  },
  moreRequestsControlSection: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  moreRequestsControlButton: {
    backgroundColor: R.color.gray2,
    paddingHorizontal: R.unit.scale(14),
    paddingVertical: R.unit.scale(10),
    borderRadius: R.unit.scale(8),
  },

  badge: {
    position: 'absolute',
    right: -5,
    top: -8,
    backgroundColor: R.color.cancelColor,
    height: R.unit.scale(18),
    width: R.unit.scale(18),
    borderRadius: R.unit.scale(18),
    justifyContent: 'center',
  },
});
