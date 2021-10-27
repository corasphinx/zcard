import * as React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { Block, Icon, Text } from 'galio-framework';
import { colors } from '../styles';
import SignInScreen from '../pages/SignInScreen';
import HomeScreen from '../pages/HomeScreen';

const drawerData = [
  {
    name: 'General',
    icon: 'tool',
  },
];

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} style={{ padding: 0 }}>
      {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx + 1}`}
          label={() => (
            <View style={styles.menuLabelFlex}>
              <Icon name={item.icon} family="AntDesign" color={colors.primary} size={20} />
              <Text style={[styles.menuTitle, { color: colors.primary }]}>{item.name}</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate(item.name)}
        />
      ))}

    </DrawerContentScrollView>
  )
};

const SettingStack = (props) => {
  let user = props.route.params ? props.route.params.user : {};
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: colors.backgroundLight,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} user={user} />}
    >
      <Drawer.Screen name="Homes" component={NavigatorView} />
    </Drawer.Navigator>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}
function mapDispatchToProps(dispatch) {
  return {
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 10,
    fontSize: 18
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    fontSize: 18
  },
  divider: {
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10
  },
});
