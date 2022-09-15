import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {Post} from '@axios/AxiosInterceptorFunction';
import {URL} from '@config/apiUrl';
import Button from '@components/common/Button';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Toast from '@components/utils/Toast';
import TextInput from '@components/common/TextInput';

export default function Contact(props) {
  const {navigation} = props;
  const user = useSelector(state => state.user);
  const headerProps = {
    isHeader: false,
    isSubHeader: true,
    mainHeading: 'How can we help you?',
    subHeading: 'Contact Us',
  };

  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState(user?.user?.email);
  const [comment, setComment] = useState('');
  const [subjectError, setSubjectError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const url = URL('newsletter/');

  const onSubmit = async () => {
    setIsLoading(true);
    const userData = {
      subject,
      email,
      comment,
    };
    if (subject?.length === 0 && email?.length === 0 && comment?.length === 0) {
      setEmailError(true);
      setSubjectError(true);
      setCommentError(true);
      setIsLoading(false);
    } else {
      const response = await Post(url, userData);
      const res = response?.data;
      if (res !== undefined) {
        Toast.show({
          title: 'whoopee!',
          message: 'Request Submitted Successfully',
        });

        setIsLoading(false);
        navigation.navigate('HomeScreen');
      }
      setEmailError(false);
      setSubjectError(false);
      setCommentError(false);
      setIsLoading(false);
    }
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: moderateScale(40, 0.3)}}>
        <View style={styles.formLayout}>
          <TextInput
            secureText={false}
            placeholder={'Subject'}
            placeholdercolor={'#707070'}
            onChangeText={text => {
              setSubject(text);
            }}
            value={subject}
            height={moderateScale(50, 0.3)}
            width={0.9}
            gutterTop={0}
            gutterBottom={moderateScale(10, 0.3)}
            borderColor={'#707070'}
            backgroundColor={'black'}
            color={'white'}
            borderBottomWidth={moderateScale(2, 0.3)}
            formError={subjectError}
            formErrorText={'Empty Field'}
            errorMTop={moderateScale(2, 0.3)}
            errorMBottom={moderateScale(2, 0.3)}
          />

          <TextInput
            secureText={false}
            placeholder={'Email Address'}
            placeholdercolor={'#707070'}
            onChangeText={text => {
              setEmail(text);
            }}
            value={email}
            height={moderateScale(50, 0.3)}
            width={0.9}
            gutterTop={moderateScale(5, 0.3)}
            gutterBottom={moderateScale(5, 0.3)}
            borderColor={'#707070'}
            backgroundColor={'black'}
            color={'white'}
            borderBottomWidth={moderateScale(2, 0.3)}
            formError={emailError}
            formErrorText={'Empty Field'}
            errorMTop={moderateScale(2, 0.3)}
            errorMBottom={moderateScale(2, 0.3)}
          />
          <TextInput
            secureText={false}
            placeholder={'Message'}
            multiline={true}
            placeholdercolor={'#707070'}
            onChangeText={text => {
              setComment(text);
            }}
            value={comment}
            height={moderateScale(120, 0.3)}
            width={0.9}
            gutterTop={5}
            gutterBottom={
              commentError ? moderateScale(1, 0.3) : moderateScale(70, 0.3)
            }
            viewHeight={moderateScale(20, 0.3)}
            inputHeight={moderateScale(90, 0.3)}
            borderColor={'#707070'}
            color={'white'}
            backgroundColor={'black'}
            numberOfLines={moderateScale(10, 0.3)}
            maxLength={moderateScale(250, 0.3)}
            style={{maxWidth: moderateScale(20, 0.3)}}
            borderWidth={0}
            borderBottomWidth={2}
            formError={commentError}
            formErrorText={'Empty Field'}
            errorMTop={2}
            errorMBottom={moderateScale(20, 0.3)}
          />

          <Button
            value="Send Message"
            bgColor={'#888888'}
            width={'100%'}
            size={'xmd'}
            height={moderateScale(50, 0.3)}
            color={'white'}
            borderRadius={moderateScale(100, 0.3)}
            borderColor={'#000000'}
            loader={isLoading}
            loaderColor={'black'}
            onPress={onSubmit}
          />
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: moderateScale(20, 0.3),
  },
  formLayout: {
    marginTop: moderateScale(120, 0.3),
  },
});
