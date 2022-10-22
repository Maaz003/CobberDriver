import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import LocationCardBlack from '@components/view/cards/LocationCardBlack';
import Button from '@components/common/Button';

function CustomerCard(props) {
  const [itemPics, setItemPics] = useState([
    {image: R.image.VanPerson()},
    {image: R.image.VanPerson()},
    {image: R.image.VanPerson()},
    {image: R.image.VanPerson()},
    {image: R.image.VanPerson()},
    {image: R.image.VanPerson()},
    {image: R.image.VanPerson()},
    {image: R.image.VanPerson()},
  ]);

  return (
    <View style={styles.mainLayout}>
      <View style={R.styles.twoItemsRow}>
        <Image
          source={R.image.userPin()}
          resizeMode={'cover'}
          style={{
            height: R.unit.scale(50),
            width: R.unit.scale(50),
            borderRadius: R.unit.scale(50),
            marginRight: R.unit.scale(12),
            borderColor: R.color.black,
            borderWidth: R.unit.scale(1),
          }}
        />
        <Text
          variant={'body2'}
          font={'bold'}
          color={R.color.black}
          align={'left'}
          transform={'none'}>
          John Denly
        </Text>
      </View>
      <LocationCardBlack />
      <View style={styles.picturesRow}>
        {itemPics?.map(item => {
          return (
            <Image
              source={R.image.userPin()}
              resizeMode={'cover'}
              style={styles.itemPicture}
            />
          );
        })}
      </View>
      <View style={{...R.styles.rowView, marginTop: R.unit.scale(12)}}>
        <Button
          value="Accept Ride"
          bgColor={R.color.black}
          width={'49%'}
          size={'xxmd'}
          variant={'body2'}
          font={'semiBold'}
          color={R.color.white}
          borderRadius={10}
          borderColor={R.color.mainColor}
        />
        <Button
          value="Reject Ride"
          bgColor={R.color.red}
          width={'49%'}
          size={'xxmd'}
          variant={'body2'}
          font={'semiBold'}
          color={R.color.white}
          borderRadius={10}
          borderColor={R.color.mainColor}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    borderRadius: R.unit.scale(10),
    paddingVertical: R.unit.scale(12),
    paddingHorizontal: R.unit.scale(12),
    marginBottom: R.unit.scale(16),
  },
  picturesRow: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: R.unit.scale(16),
    width: '100%',
    flexDirection: 'row',
  },
  itemPicture: {
    height: R.unit.scale(45),
    width: R.unit.scale(45),
    borderRadius: R.unit.scale(5),
    marginRight: R.unit.scale(4),
    marginBottom: R.unit.scale(5),
    borderWidth: 1,
    borderColor: R.color.blackLightShade,
  },
});

export default CustomerCard;
