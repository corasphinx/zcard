import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import TemplateSettingsScreen from '../pages/EditCard/TemplateSettingsScreen';
import CardSettingsScreen from '../pages/EditCard/CardSettingsScreen';
import CustomURLSScreen from '../pages/EditCard/CustomURLSScreen';
import MainImagesScreen from '../pages/EditCard/MainImagesScreen';
import PickerScreen from '../pages/EditCard/PickerScreen';
import NewsletterScreen from '../pages/EditCard/NewsletterScreen';
import SectionEditScreen from '../pages/EditCard/SectionEditScreen';
import CreateSectionScreen from '../pages/EditCard/CreateSectionScreen';
import ZModuleScreen from '../pages/EditCard/ZModuleScreen';
import LeadFormScreen from '../pages/EditCard/ZModules/LeadFormScreen';
import YouTubeEmbedScreen from '../pages/EditCard/ZModules/YouTubeEmbedScreen';
import ZLiveSectionScreen from '../pages/EditCard/ZModules/ZLiveSectionScreen';
import ZMarketSectionScreen from '../pages/EditCard/ZModules/ZMarketSectionScreen';
import BusinessSearchModuleScreen from '../pages/EditCard/ZModules/BusinessSearchModuleScreen';
import ShortURLScreen from '../pages/EditCard/ZModules/ShortURLScreen';
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
  {
    name: 'ColorPicker',
    title: 'Pick Color',
    component: PickerScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Newsletter',
    title: 'Push Notifications',
    component: NewsletterScreen,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'SectionEdit',
    title: 'Edit Section',
    component: SectionEditScreen,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'CreateSection',
    title: 'Create Section',
    component: CreateSectionScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'ZModule',
    title: 'Add ZModule',
    component: ZModuleScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  // ZModules Start ------------------------------
  {
    name: 'LeadForm',
    title: 'Lead Form',
    component: LeadFormScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'YouTubeEmbed',
    title: 'YouTube Embed',
    component: YouTubeEmbedScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'ZLiveSection',
    title: 'ZLive Section',
    component: ZLiveSectionScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'ZMarketSection',
    title: 'ZMarket Section',
    component: ZMarketSectionScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'BusinessSearchModule',
    title: 'Business Search',
    component: BusinessSearchModuleScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'ShortURL',
    title: 'Short URL',
    component: ShortURLScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  // ZModules End ---------------------------------
]

export default StackNavigationData;
