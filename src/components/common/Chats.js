import React, {useState, useCallback, useEffect} from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';
import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
  Day,
  Composer,
} from 'react-native-gifted-chat';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Loader from '@components/common/Loader';
import Icon from './Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function ChatScreen(props) {
  const {navigation} = props;
  const {data} = props.route.params;
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isLoadMessages, setIsLoadMessages] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const RenderDay = props => {
    return <Day {...props} textStyle={{color: R.color.black, fontSize: 14}} />;
  };

  const RenderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: R.color.white,
          },
          right: {
            color: R.color.black,
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: R.color.black,
            borderRadius: R.unit.scale(15),
            padding: R.unit.scale(5),
            marginBottom: R.unit.scale(15),
          },
          right: {
            backgroundColor: R.color.mainColor, //todo
            padding: R.unit.scale(5),
            borderRadius: R.unit.scale(15),
            // marginBottom: R.unit.scale(10),
          },
        }}
        timeTextStyle={{
          left: {
            color: R.color.gray,
          },
          right: {
            color: R.color.black,
          },
        }}
      />
    );
  };

  const RenderSend = props => {
    return (
      <Send {...props}>
        <View style={styles.sendBtn}>
          <Icon
            name={'send'}
            type={'FontAwesome'}
            size={30}
            color={R.color.black}
          />
        </View>
      </Send>
    );
  };

  const MessengerBarContainer = props => {
    return <InputToolbar {...props} containerStyle={styles.InputToolbar} />;
  };

  const RenderComposer = props => {
    return <Composer {...props} textInputStyle={styles.inputField} />;
  };

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const call = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${data.phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${data.phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

  const back = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        {loader ? (
          <Loader />
        ) : (
          <>
            <View style={[R.styles.rowView, {width: '100%', padding: 0}]}>
              <View style={[R.styles.twoItemsRow, {paddingHorizontal: 0}]}>
                <Icon
                  name={'keyboard-arrow-left'}
                  type={'MaterialIcons'}
                  size={40}
                  onPress={back}
                  iconStyles={{
                    padding: 5,
                  }}
                />
                <Image source={data.picture} style={styles.image} />

                <Text
                  variant={'body2'}
                  font={'bold'}
                  color={R.color.black}
                  align={'left'}
                  style={{marginLeft: R.unit.scale(10)}}
                  numberOfLines={1}
                  transform={'none'}>
                  {data.name}
                </Text>
              </View>
              <TouchableOpacity onPress={call} activeOpacity={0.9}>
                <Icon name={'phone-alt'} type={'FontAwesome5'} size={30} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={[styles.container, {paddingBottom: 20}]}
        showsVerticalScrollIndicator={false}>
        <GiftedChat
          loadEarlier={isLoadMessages}
          messages={messages}
          showUserAvatar={false}
          renderAvatar={() => null}
          keyboardShouldPersistTaps={'always'}
          renderBubble={props => <RenderBubble {...props} />}
          renderInputToolbar={props => <MessengerBarContainer {...props} />}
          renderSend={props => <RenderSend {...props} />}
          renderDay={props => <RenderDay {...props} />}
          renderComposer={props => <RenderComposer {...props} />}
          alwaysShowSend={true}
          renderAvatarOnTop={true}
          onSend={messages => onSend(messages)}
          user={{
            _id: 3,
            name: 'React Native',
            avatar:
              'https://png.pngtree.com/element_our/20190604/ourmid/pngtree-user-avatar-boy-image_1482937.jpg',
          }}
          placeholderTextColor={R.color.black}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#A6BAB3',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: R.unit.scale(15),
  },
  image: {
    width: R.unit.scale(50),
    height: R.unit.scale(50),
    borderRadius: R.unit.scale(100),
  },
  InputToolbar: {
    backgroundColor: R.color.gray3,
    borderRadius: R.unit.scale(20),
    paddingHorizontal: R.unit.scale(15),
    paddingVertical: R.unit.scale(2),
    borderTopWidth: 0,
  },
  inputField: {
    backgroundColor: R.color.gray2,
    borderRadius: R.unit.scale(20),
    paddingLeft: R.unit.scale(15),
    paddingRight: R.unit.scale(15),
    color: R.color.black,
  },
  sendBtn: {
    padding: R.unit.scale(5),
    borderTopWidth: 0,
  },
});
