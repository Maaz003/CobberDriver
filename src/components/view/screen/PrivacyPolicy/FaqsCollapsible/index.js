import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import R from '@components/utils/R';
import Accordion from 'react-native-collapsible/Accordion';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';

function FaqsCollapsible(props) {
  const {options} = props;
  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = (section, index, isActive, sections) => {
    return (
      <>
        <View style={{...R.styles.rowView, paddingHorizontal: 0}}>
          <View style={{...R.styles.twoItemsRow, paddingHorizontal: 10}}>
            <Icon
              name={isActive ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
              type={'MaterialIcons'}
              color={R.color.black}
              size={20}
              iconStyles={{
                marginRight: R.unit.scale(6),
              }}
            />
            <Text
              variant={'body1'}
              font={'PoppinsSemiBold'}
              color={isActive ? R.color.black : R.color.black}
              align={'right'}
              transform={'none'}>
              {section.question}
            </Text>
          </View>
        </View>
      </>
    );
  };

  const renderContent = (section, index, isActive) => {
    return (
      <>
        <View style={styles.content}>
          <Text
            variant={'body2'}
            font={'PoppinsRegular'}
            color={R.color.black}
            align={'left'}
            transform={'none'}>
            {section?.answer}
          </Text>
        </View>
      </>
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  return (
    <>
      <Accordion
        sections={options}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={_updateSections}
        touchableComponent={TouchableOpacity}
        underlayColor={'none'}
        expandMultiple={true}
        touchableProps={{
          activeOpacity: 0.9,
        }}
        sectionContainerStyle={{
          paddingVertical: R.unit.scale(16),
          backgroundColor: R.color.white,
          marginBottom: R.unit.scale(12),
        }}
      />
    </>
  );
}
export default FaqsCollapsible;

const styles = ScaledSheet.create({
  emptyBox: {
    backgroundColor: 'white',
    height: R.unit.scale(24),
    width: R.unit.scale(24),
    borderRadius: R.unit.scale(6),
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(1),
  },
  content: {
    paddingTop: R.unit.scale(10),
    paddingHorizontal: R.unit.scale(10),
  },
  placeEditView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: R.unit.scale(16),
    width: R.unit.scale(93),
    marginBottom: R.unit.scale(-14),
  },
  editIconView: {
    padding: R.unit.scale(10),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: R.unit.scale(10),
  },
  editSvg: {
    aspectRatio: 1,
    height: R.unit.height(0.02),
  },
});
