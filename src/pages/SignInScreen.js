import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, KeyboardAvoidingView, Linking } from 'react-native';
import {
  Block,
  Button,
  Text,
  Icon,
  Input,
  Checkbox,
  theme,
} from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeLoading from 'react-native-awesome-loading';
import { colors, fonts } from '../styles';
import { hostname } from '../constant';
import { SignIn, SetCurrentUser } from '../redux/actions';

const { width } = Dimensions.get('screen');
const icon = require('../assets/images/icon.png');

class SignInScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false,
      isError: false,
      isRemember: false,
      errText: ''
    }
    global.user = null;
  }

  componentDidMount = async () => {
    const user = await AsyncStorage.getItem('ZCard_User')
    if (user !== null) {
      const jsonUser = JSON.parse(user);
      this.setState({ email: jsonUser.email, password: jsonUser.password});
      this.signIn();
    }
  }

  signIn = () => {
    const { email, password, isRemember } = this.state;
    if (!this.validate()) return;
    this.setState({ loading: true });
    this.props.signIn({
      email: email,
      password: password,
      mobile_device: 1,
      partner_permalink: false,
      cart_info: false
    },
      async (user) => {
        if (isRemember)
          await AsyncStorage.setItem('ZCard_User', JSON.stringify({ email: email, password: password }));

        global.user = user;
        this.setState({ loading: false });
        this.props.navigation.replace('Home');
      },
      (errText) => {
        this.setState({
          loading: false,
          isError: true,
          errText: errText
        })
      }
    )
  }

  validate = () => {
    if (this.state.email == '') {
      this.setState({
        isError: true,
        errText: 'Input email'
      })
      return false;
    }
    if (this.state.password == '') {
      this.setState({
        isError: true,
        errText: 'Input password'
      })
      return false;
    }
    return true;
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <AwesomeLoading indicatorId={10} size={80} isActive={this.state.loading} />
          <Block style={[styles.container, { backgroundColor: colors.backgroundLight }]}>
            <Block center row>
              <Image
                source={icon}
                tintColor={colors.primary}
                style={styles.logoIcon} />
              <Text
                h2
                bold
                style={[styles.label, { color: colors.primary }]}
                color={colors.primary}> Card</Text>
            </Block>
            <Block center>
              <Text
                style={[styles.label, { color: colors.primary }]}
                size={20}> Email </Text>
              <Input
                type='email-address'
                style={styles.inputBox} color={colors.primary} fontSize={20}
                icon="mail" family="antdesign" iconSize={20} iconColor={colors.primary}
                onChangeText={(email) => this.setState({ email: email, isError: false })}
              />
              <Text
                style={[styles.label, { color: colors.primary }]}
                size={20}> Password </Text>
              <Input
                viewPass
                style={styles.inputBox} password color={colors.primary} fontSize={20}
                icon="key" family="antdesign" iconSize={20} iconColor={colors.primary}
                onChangeText={(pwd) => this.setState({ password: pwd, isError: false })}
              />
              {this.state.isError && <Block center row>
                <Icon name="warning" family="entypo" color='red' size={20} />
                <Text size={18} color='red'> {this.state.errText}</Text>
              </Block>}
              <Block style={styles.remember}>
                <Checkbox color={colors.primary} initialValue={this.state.isRemember}
                  label="Remember me" labelStyle={{ color: colors.primary, fontSize: 20 }}
                  onChange={(val) => this.setState({ isRemember: val })} />
              </Block>
              <Block
                style={[styles.divide, { backgroundColor: colors.primary }]} />
              <Button
                style={[styles.button, { backgroundColor: colors.primary }]}
                icon="login" iconFamily="antdesign" iconSize={25}
                textStyle={{ fontSize: 25 }}
                onPress={() => this.signIn()}
              >Sign In</Button>
              <TouchableOpacity
                onPress={() => Linking.openURL(hostname)}
              >
                <Text
                  center
                  style={[styles.label, { color: colors.primary }]}
                  color={colors.primary}
                  size={18}> Register </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </SafeAreaView>
      </KeyboardAvoidingView >
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}
function mapDispatchToProps(dispatch) {
  return {
    signIn: (req, successcb, errorcb) => SignIn(dispatch, req, successcb, errorcb),
    setCurrentUser: (user) => SetCurrentUser(dispatch, user)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: theme.SIZES.BASE * 3,
    paddingVertical: theme.SIZES.BASE * 5,
  },
  logoIcon: {
    width: theme.SIZES.BASE * 8,
    height: theme.SIZES.BASE * 8,
  },
  label: {
    paddingTop: theme.SIZES.BASE * 2,
    fontFamily: fonts.primaryLight,
    alignSelf: 'flex-start',
  },
  inputBox: {
    borderColor: colors.primary,
    borderRadius: theme.SIZES.BORDER_RADIUS * 4,
    width: width * 0.7,
  },
  divide: {
    height: 1,
    margin: theme.SIZES.BASE * 2
  },
  button: {
    borderRadius: theme.SIZES.BORDER_RADIUS * 4,
    borderColor: colors.primary,
    width: width * 0.7,
  },
  remember: {
    marginTop: theme.SIZES.BASE,
  }
});
