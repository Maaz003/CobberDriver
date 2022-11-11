import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import R from '@components/utils/R';
import FaqsCollapsible from '@components/view/screen/PrivacyPolicy/FaqsCollapsible';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import {faqsData} from '@components/constants';

function FAQScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();

  const common = useSelector(state => state.common);

  const headerProps = {
    isSubHeader: true,
    mainHeading: 'Help',
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
          {faqsData?.length > 0 && (
            <>
              <FaqsCollapsible options={faqsData} />
            </>
          )}
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}
export default FAQScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.lightSilverShade1,
    paddingHorizontal: 0,
    flex: 1,
  },
  formView: {
    paddingHorizontal: R.unit.scale(10),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
});
