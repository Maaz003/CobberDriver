import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';
import R from '@components/utils/R';
import Icon from './Icon';
import {Dropdown} from 'react-native-element-dropdown';

const SearchableDropDown = props => {
  const {
    placeholder = 'Select Category',
    formError,
    gutterTop = 0,
    gutterBottom = 0,
    errorMTop = 8,
    errorMBottom = 0,
    borderColor = R.color.white,
    width = 0.94,
    //FUNCTIONS
    arrayData,
    zIndexIOS,
    value,
    defaultValue,
    loaderParentCall,
    schema,
    iconName,
    iconType,
  } = props;

  const [items, setItems] = useState(arrayData);
  const [selectedValue, setSelectedValue] = useState(value);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setItems(arrayData);
    setSelectedValue(value);
  }, [arrayData, value]);

  return (
    <View
      style={[
        gutterTop >= 0 && {
          marginTop: gutterTop,
        },
        gutterBottom >= 0 && {
          marginBottom: gutterBottom,
        },
        Platform.OS !== 'android' && {
          zIndex: zIndexIOS,
        },
      ]}>
      <Dropdown
        style={[
          styles.inputFieldLayout,
          borderColor && {
            borderColor: borderColor,
          },
          // width && {
          //   width: R.unit.width(width),
          // },
        ]}
        containerStyle={styles.dropDownContainer}
        activeColor={R.color.mainColor}
        selectedTextStyle={styles.inputFieldText}
        placeholderStyle={styles.placeholderStyle}
        renderItem={props => {
          return (
            <View
              style={{
                padding: R.unit.scale(15),
              }}>
              <Text
                variant={'body2'}
                font={'semiBold'}
                color={R.color.white}
                align={'left'}
                transform={'none'}>
                {props.title}
              </Text>
            </View>
          );
        }}
        data={items}
        search={true}
        inputSearchStyle={{color: R.color.white}}
        maxHeight={R.unit.scale(300)}
        flatListProps={true}
        ListEmptyComponent={() => {
          return <View style={{height: 300}}></View>;
        }}
        labelField={schema.label}
        valueField={schema.value}
        placeholder={placeholder}
        value={selectedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        showsVerticalScrollIndicator={false}
        onChange={item => {
          setIsFocus(false);
          loaderParentCall(item);
        }}
        renderLeftIcon={() => (
          <View style={styles.iconView}>
            <Icon
              name={iconName}
              type={iconType}
              size={25}
              color={R.color.white}
              iconStyles={[
                {
                  paddingLeft: iconName && R.unit.scale(8),
                },
              ]}
            />
          </View>
        )}
        renderRightIcon={() => {
          return (
            <Icon
              name={!isFocus ? 'arrow-drop-down' : 'arrow-drop-up'}
              type={'MaterialIcons'}
              size={30}
              color={R.color.mainColor}
            />
          );
        }}
      />

      {formError?.length > 0 && (
        <Text
          variant={'body4'}
          font={'italic'}
          gutterTop={R.unit.scale(errorMTop)}
          gutterBottom={R.unit.scale(errorMBottom)}
          color={'red'}
          style={{marginLeft: 20}}
          align={'left'}
          transform={'none'}>
          {formError}
        </Text>
      )}
    </View>
  );
};

export default React.memo(SearchableDropDown);

const styles = StyleSheet.create({
  inputFieldLayout: {
    height: R.unit.scale(48),
    borderWidth: R.unit.scale(1),
    borderRadius: R.unit.scale(80),
    backgroundColor: R.color.black,
    borderColor: R.color.white,
    paddingHorizontal: R.unit.scale(8, 0.6),
  },
  inputFieldText: {
    color: R.color.white,
    paddingHorizontal: R.unit.scale(7, 0.3),
    fontFamily: 'Nunito-Regular',
    fontSize: R.unit.scale(14, 0.3),
  },
  dropDownContainer: {
    backgroundColor: R.color.black,
    color: R.color.mainColor,
  },
  rowTextStyle: {
    color: R.color.mainColor,
    fontSize: R.unit.scale(16),
    fontFamily: 'Inter-Regular',
  },
  iconView: {
    width: R.unit.scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  placeholderStyle: {
    color: R.color.white,
    paddingHorizontal: R.unit.scale(7, 0.3),
    // backgroundColor: 'purple',
  },
});
