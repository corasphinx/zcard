import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import TemplateSettingsScreen from '../pages/EditCard/TemplateSettingsScreen';
import CardSettingsScreen from '../pages/EditCard/CardSettingsScreen';
import CustomURLSScreen from '../pages/EditCard/CustomURLSScreen';
import MainImagesScreen from '../pages/EditCard/MainImagesScreen';
import { colors, fonts } from '../styles';

const headerLeftComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Image
        source={require('../assets/images/arrow-back.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
        tintColor={colors.white}
      />
    </TouchableOpacity>
  )
}

const headerBackground = require('../assets/images/topBarBg.jpg');

const StackNavigationData = [
  {
    name: 'TemplateSettings',
    title: 'Template Settings',
    component: TemplateSettingsScreen,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'CardSettings',
    title: 'Card Settings',
    component: CardSettingsScreen,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'CustomURLS',
    title: 'Custom URLS & Icons',
    component: CustomURLSScreen,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'MainImages',
    title: 'Main Images & Photos',
    component: MainImagesScreen,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
]

export default StackNavigationData;
