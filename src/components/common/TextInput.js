import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput as TextInputc,
  Platform,
} from 'react-native';

import {Icon} from 'native-base';
import Text from './Text';
import R from '@components/utils/R';

const TextInput = props => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeText = text => {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };
  const {
    placeholder = 'Type here...',
    width = 0.94,
    color = R.color.black,
    // inputHeight = R.unit.height(1) > 1000 ? 100 : 50,
    inputHeight,
    widthInPercent,
    // inputWidth = width - 0.01,
    inputContainerStyles,
    gutterTop = 0,
    gutterBottom = 0,
    backgroundColor = R.color.black,
    borderColor = R.color.white,
    borderWidth = 0.75,
    placeholdercolor = R.color.white,
    borderRadius = 50,
    multiline = false,
    numberOfLines,
    formError,
    title,
    errorMTop = 8,
    errorMBottom = 0,
    iconName,
    iconType,
    iconColor = R.color.white,
    fontSize,
    eyeColor = R.color.white,
    returnKeyType,
  } = props;

  return (
    <View
      style={[
        gutterTop >= 0 && {
          marginTop: gutterTop,
        },
        gutterBottom >= 0 && {
          marginBottom: gutterBottom,
        },
      ]}>
      {title && (
        <Text
          variant={'body2'}
          font={'semiBold'}
          gutterTop={1}
          gutterBottom={2}
          color={R.color.inputTitle}
          align={'left'}
          transform={'capitalize'}>
          {title}
        </Text>
      )}
      <View
        style={[
          styles.fieldSet,
          {
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            width: widthInPercent ? widthInPercent : R.unit.width(width),
          },
          borderRadius && {
            borderRadius: R.unit.scale(borderRadius),
          },
          borderWidth && {
            borderWidth: R.unit.scale(borderWidth),
          },
          inputContainerStyles,
        ]}>
        {iconName && (
          <Icon
            name={iconName}
            type={iconType}
            style={[
              {
                color: iconColor,
                fontSize: R.unit.scale(18, 0.6),
                paddingLeft: iconName && R.unit.scale(14),
              },
            ]}
          />
        )}

        {props.secureText ? (
          <>
            <TextInputc
              style={[
                {
                  color: color,
                },
                fontSize && {
                  fontSize: R.unit.scale(fontSize, 0.5),
                },
                Platform.OS === 'android'
                  ? styles.inputBox
                  : [styles.inputBox, {paddingBottom: 0}],
              ]}
              onChangeText={e => handleChangeText(e)}
              value={props.value}
              secureTextEntry={!showPassword}
              placeholder={placeholder}
              placeholderTextColor={placeholdercolor}
              keyboardType={props.keyboardType}
            />
            <TouchableOpacity
              onPress={() => {
                setShowPassword(!showPassword);
              }}
              style={{
                paddingHorizontal: R.unit.width(0.04),
                position: 'absolute',
                right: 0,
                height:
                  Platform.OS === 'android'
                    ? R.unit.height(0.0725)
                    : R.unit.height(0.0525),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off-sharp'}
                type={'Ionicons'}
                style={{
                  color: eyeColor,
                  fontSize: R.unit.scale(18, 0.6),
                }}
              />
            </TouchableOpacity>
          </>
        ) : (
          <TextInputc
            style={[
              {
                color: color,
              },
              Platform.OS === 'android'
                ? styles.inputBox
                : [styles.inputBox, {paddingBottom: 0}],
              props.numberOfLines > 1 && {
                textAlignVertical: 'top',
              },
              props.inputHeight && {
                height: inputHeight,
              },
              props.disable && {
                color: R.color.gray,
              },
              multiline && {
                paddingTop: R.unit.scale(10, 0.5),
              },
              fontSize && {
                fontSize: R.unit.scale(fontSize, 0.5),
              },
            ]}
            onChangeText={e => handleChangeText(e)}
            value={props.value || props.defaultValue}
            placeholder={placeholder}
            placeholderTextColor={placeholdercolor}
            keyboardType={props.keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines || 1}
            editable={props.disable ? false : true}
            keyboardShouldPersistTaps="always"
            textAlignVertical={numberOfLines > 1 ? 'top' : 'center'}
            returnKeyType={returnKeyType}
          />
        )}
      </View>
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
const styles = StyleSheet.create({
  fieldSet: {
    paddingVertical: R.unit.inputContainerVerticalPadding(12, 1),
    backgroundColor: R.color.black,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputBox: {
    flex: 1,
    paddingHorizontal: R.unit.scale(8, 0.6),
    paddingRight: R.unit.scale(36, 0.6),
    fontSize: R.unit.scale(14, 0.3),
    fontFamily: 'Poppins-Regular',
  },
});
export default TextInput;
