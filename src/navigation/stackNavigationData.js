import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

// import ViewBusinessScreen from '../pages/setting/ViewBusinessScreen';
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
  // {
  //   name: 'General',
  //   title: 'General',
  //   component: GeneralScreen,
  //   headerLeft: null,
  //   headerBackground: { source: headerBackground },
  //   headerTitleStyle: {
  //     fontFamily: fonts.primaryRegular,
  //     color: colors.white,
  //     fontSize: 18,
  //   },
  // },
]

export default StackNavigationData;
