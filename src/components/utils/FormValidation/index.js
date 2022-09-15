import validators from '@components/utils/Validators';
import {PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';

function FormValidation(data) {
  let errorArr = [];

  for (let key in data) {
    if (data[key] === '') {
      errorArr.push(key);
    }
  }
  if (errorArr?.length > 0) {
    let error = {
      errorArr,
      message: 'An error has occured, check your details!',
    };
    return error;
  }

  if (
    data?.email &&
    !validators.emailREX.test(String(data?.email).toLowerCase())
  ) {
    errorArr.push('email');
    let error = {
      errorArr,
      message: 'An error has occured, email not valid',
    };
    return error;
  }

  if (data?.phoneNumber && isNaN(data?.phoneNumber)) {
    errorArr.push('phoneNumber');
    let error = {
      errorArr,
      message: 'An error has occured, number should be in digits',
    };
    return error;
  }
  // if (data?.phoneNumber && data?.phoneNumber?.length <= 8) {
  //   errorArr.push('phoneNumber');
  //   let error = {
  //     errorArr,
  //     message: 'Number should be greater than 9 digits',
  //   };
  //   return error;
  // }

  if (data?.dialCode && data?.phoneNumber) {
    let valid;
    try {
      let countryCode = data?.dialCode;
      const phoneUtil = PhoneNumberUtil.getInstance();
      valid = phoneUtil.isValidNumber(
        phoneUtil.parse(`+${countryCode}${data?.phoneNumber}`),
      );
    } catch (e) {
      valid = false;
    }
    if (!valid) {
      errorArr.push('phoneNumber');
      let error = {
        errorArr,
        message: 'Entered Phone Number is not valid',
      };
      return error;
    }
  }

  if (data?.password && data?.password?.length < 8) {
    errorArr.push('password');
    let error = {
      errorArr,
      message:
        'An error has occured, password should be greater than 8 characters',
    };
    return error;
  }

  if (data?.oldPassword && data?.oldPassword?.length < 8) {
    errorArr.push('oldPassword');
    let error = {
      errorArr,
      message:
        'An error has occured, Old Password should be greater than 8 characters',
    };
    return error;
  }

  if (data?.confirmPassword && data?.confirmPassword?.length < 8) {
    errorArr.push('confirmPassword');
    let error = {
      errorArr,
      message:
        'An error has occured, confirmPassword should be greater than 8 characters',
    };
    return error;
  }

  if (data?.focusTags && data?.focusTags?.length < 8) {
    errorArr.push('focusTags');
    let error = {
      errorArr,
      message: 'An error has occured, focusTags should be selected',
    };
    return error;
  }
}
export default FormValidation;
