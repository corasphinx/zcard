import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, ScrollView, SafeAreaView, StyleSheet, Dimensions, Platform, Image, TextInput, Animated } from 'react-native';

import { Block, Text, Input, Button, Icon, Radio } from 'galio-framework';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { colors, commonStyles } from '../../../styles';
import { hostname } from '../../../constant';
import {
  CallController
} from '../../../redux/actions';
const { width, height } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * width) / 100;
  return Math.round(value);
}

class TextSectionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      section_content: '',
      isSignModal: true,
      phoneNumber: '',
      signing: false,
      errPhoneNumber: '',
    };
    this.shakePhoneNumber = new Animated.Value(0);
  }

  componentDidMount = () => {

  }

  startShakePhoneNumber = () => {
    Animated.sequence([
      Animated.timing(this.shakePhoneNumber, { toValue: 20, duration: 50, useNativeDriver: true }),
      Animated.timing(this.shakePhoneNumber, { toValue: -20, duration: 50, useNativeDriver: true }),
      Animated.timing(this.shakePhoneNumber, { toValue: 20, duration: 50, useNativeDriver: true }),
      Animated.timing(this.shakePhoneNumber, { toValue: -20, duration: 50, useNativeDriver: true }),
      Animated.timing(this.shakePhoneNumber, { toValue: 20, duration: 50, useNativeDriver: true }),
      Animated.timing(this.shakePhoneNumber, { toValue: -20, duration: 50, useNativeDriver: true }),
      Animated.timing(this.shakePhoneNumber, { toValue: 20, duration: 50, useNativeDriver: true }),
      Animated.timing(this.shakePhoneNumber, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  }

  isValidate = () => {
    const { section_content } = this.state;
    if (section_content == '') return 'You must supply a Content to send!';
    return '';
  }

  renderUsers = () => {

  }

  SignIn = () => {
    const { phoneNumber } = this.state;
    if (phoneNumber == '') {
      this.setState({ errPhoneNumber: 'Please input phone number.' });
      this.startShakePhoneNumber();
    }

    this.setState({ signing: true });

  }

  send = () => {
    const { selectedZCard } = this.props;
    const { section_content } = this.state;
    let validation = this.isValidate();
    if (validation != '') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: validation + ' 😥'
      });
      this.setState({ saving: false });
      return;
    }

    this.setState({ sending: true });
    this.props.callController(
      `/controllers/Zcard/submit_push_notification.php?zcard_id=${selectedZCard.id}`,
      {
        content: section_content.replace(/[^a-z0-9 @()-:,?=$.!\/]/gi, "").replace(/[*]/gi, "")
      },
      (msg) => {
        this.setState({ sending: false, section_content: '' });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: msg + ' 😥'
        });
      },
      (msg) => {
        this.setState({ sending: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );
  }

  render() {
    const { sending, section_content, isSignModal, phoneNumber, signing, errPhoneNumber } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Block style={styles.container}>
            <ScrollView
              scrollEventThrottle={200}
              directionalLockEnabled={true}
            >
              <Block>
                <Image
                  style={styles.avatar}
                  source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
              </Block>
              <Text italic size={16} color={colors.primaryLight} style={{ marginBottom: 10 }}>Scheduled Text messages will arrive at 10AM Central Standard Time on the date in which you schedule the notification to be sent.</Text>
              <Block style={commonStyles.divider} />
              <Text
                style={styles.label}
                size={16}>Content:</Text>
              <TextInput
                multiline
                numberOfLines={3}
                onChangeText={(section_content) => this.setState({ section_content })}
                style={styles.description}>{section_content}
              </TextInput>
              <Block style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <Button
                  color={colors.green}
                  icon='paper-plane' iconFamily='Entypo' iconSize={18}
                  textStyle={{ fontSize: 18 }}
                  loading={sending}
                  onPress={this.send}
                > Send</Button>
              </Block>
              {this.renderUsers()}
            </ScrollView>
          </Block>
          <Modal
            isVisible={isSignModal}>
            <Block style={styles.modalContent}>
              <Block row style={{ alignItems: 'center' }}>
                <Icon name="infocirlceo" family="antdesign" color={colors.blue} size={22} />
                <Text bold color={colors.blue} size={22}> Input your phone number</Text>
              </Block>
              <Block style={commonStyles.divider} />
              <Block>
                <Text
                  style={styles.label}
                  size={16}>Phone Number:</Text>
                <Animated.View style={{ transform: [{ translateX: this.shakePhoneNumber }] }}>
                  <Input
                    value={phoneNumber}
                    type='phone-pad'
                    style={styles.inputBox} color={colors.primary} fontSize={18}
                    icon='phone' family='Entypo' iconSize={18} iconColor={colors.primary}
                    onChangeText={(phoneNumber) => this.setState({ phoneNumber: phoneNumber, errPhoneNumber: '' })}
                  />
                </Animated.View>
                <Text size={16} color='red'>{errPhoneNumber}</Text>
              </Block>
              <Block style={commonStyles.divider} />
              <Block row space='evenly'>
                <Button
                  color={colors.gray}
                  icon='close' iconFamily='AntDesign' iconSize={18}
                  textStyle={{ fontSize: 18 }}
                  size='small'
                  onPress={this.props.navigation.goBack}
                > Cancel</Button>
                <Button
                  color={colors.green}
                  icon='login' iconFamily='Entypo' iconSize={18}
                  textStyle={{ fontSize: 18 }}
                  size='small'
                  loading={signing}
                  onPress={this.SignIn}
                > SignIn</Button>
              </Block>
            </Block>
          </Modal>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    selectedZCard: state.selectedZCard,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    callController: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextSectionScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10
  },
  avatar: {
    resizeMode: 'stretch',
    width: wp(10),
    height: wp(10),
    borderRadius: 50,
    alignSelf: 'center'
  },
  label: {
    paddingTop: 10,
    alignSelf: 'flex-start',
    color: colors.grey
  },
  inputBox: {
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
    fontSize: 18,
    paddingLeft: 8
  },
  description: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.border,
    fontSize: 18,
    backgroundColor: colors.backgroundLight,
    color: colors.primary,
  },
  modalContent: {
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    maxHeight: height / 2
  },
});
