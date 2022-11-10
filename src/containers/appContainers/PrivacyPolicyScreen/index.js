import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import R from '@components/utils/R';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Text from '@components/common/Text';

function PrivacyPolicyScreen(props) {
  const {navigation} = props;
  const headerProps = {
    isSubHeader: true,
    mainHeading: 'Privacy',
  };

  return (
    <ScreenBoiler {...props} headerProps={headerProps}>
      <ScrollView
        style={[R.styles.container, styles.mainLayout]}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <View style={styles.formView}>
          <Text
            variant={'h4'}
            font={'bold'}
            color={R.color.black}
            align={'right'}
            transform={'none'}>
            Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}
export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.lightSilverShade1,
    paddingHorizontal: 0,
    flex: 1,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
    alignItems: 'center',
  },
});
