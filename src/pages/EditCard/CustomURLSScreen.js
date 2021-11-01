import React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  TextInput
} from 'react-native';

import {
  Block,
  Button,
  Text,
  Icon,
  Input,
  theme,
} from 'galio-framework';
import AwesomeLoading from 'react-native-awesome-loading';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Toast from 'react-native-toast-message';
import { colors, commonStyles } from '../../styles';

import {
  CallClassFunction,
  CallController,
  CallZCardClassFunction,
} from '../../redux/actions';

import { hostname } from '../constant';

const { width, height } = Dimensions.get('screen');
const icon_templates = [
  { value: 'Zcard', label: 'Zcard' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Snapchat', label: 'Snapchat' },
  { value: 'PDF', label: 'PDF' },
  { value: 'Spreadsheet', label: 'Spreadsheet' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Globe', label: 'Globe' },
  { value: 'message icon', label: 'message icon' },
  { value: 'basketball icon', label: 'basketball icon' },
  { value: 'YouTube', label: 'YouTube' },
  { value: 'Paper Plane', label: 'Paper Plane' },
  { value: 'Paypal', label: 'Paypal' },
  { value: 'Playstation', label: 'Playstation' },
  { value: 'Xbox Icon', label: 'Xbox Icon' },
];

class CustomURLSScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      orderData: [],
    }
  }

  componentDidMount = () => {
    const { selectedZCard } = this.props;

    for (let i = 1; i < 5; i++) {
      this.props.getIconData(
        selectedZCard.id,
        'getIconData',
        [i],
        (orderData) => {
          this.setState({ orderData: [...this.state.orderData, orderData] });
        },
        (msg) => {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: msg + ' 😥'
          });
        }
      );
    }
  }

  renderData = () => {
    const { orderData } = this.state;
    if (orderData.length)
      return orderData.map((data, idx) =>
        <Collapse
          style={{ margin: 10 }}
        >
          <CollapseHeader>
            <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
              <Text size={18} bold color={colors.white}>#{idx + 1} - {data[2]}</Text>
            </Block>
          </CollapseHeader>
          <CollapseBody
            style={[commonStyles.shadow, commonStyles.collapseBody]}
          >
            <Dropdown
              label="Icon"
              value={data[0]}
              textColor={colors.primary}
              labelFontSize={16}
              fontSize={18}
              dropdownPosition={0}
              pickerStyle={{ borderRadius: 10, height: 300 }}
              containerStyle={{ width: width - 40 }}
              data={icon_templates}
            // onChangeText={(selectedTemplateID) => this.setState({ selectedTemplateID })}
            />
            <Text
              style={[styles.label, { color: colors.grey }]}
              size={16}>Label</Text>
            <Input
              value={data[2]}
              style={styles.inputBox} color={colors.primary} fontSize={18}
              icon='tag' family='AntDesign' iconSize={18} iconColor={colors.primary}
            // onChangeText={(frontImageName) => this.setState({ frontImageName })}
            />
            <Text
              style={[styles.label, { color: colors.grey }]}
              size={16}>URL</Text>
            <Input
              value={data[1]}
              style={styles.inputBox} color={colors.primary} fontSize={18}
              icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
            // onChangeText={(frontImageName) => this.setState({ frontImageName })}
            />
          </CollapseBody>
        </Collapse>
      )
  }

  render = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <AwesomeLoading indicatorId={7} size={80} isActive={this.state.loading} />
          <Block style={styles.container}>
            <ScrollView nestedScrollEnabled={true}>
              {this.renderData()}
            </ScrollView>
            <Block center row>
              <Button
                color={colors.green}
                icon='save' iconFamily='AntDesign' iconSize={18}
                textStyle={{ fontSize: 18 }}
                // onPress={() => this.pick('front')}
              > Save Icons</Button>
              <Button
                color={colors.pink}
                icon='close' iconFamily='AntDesign' iconSize={18}
                textStyle={{ fontSize: 18 }}
                // onPress={() => this.pick('front')}
              > Remove All</Button>
            </Block>
          </Block>
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
    getIconData: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    getAvailableIconsSelectOptions: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    listPartnerProfilesByAccount: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    fetchZCardEntry: (className, funcName, reqArray, successcb, errorcb, getData) => CallController(className, funcName, reqArray, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomURLSScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    width,
    height,
  },
  label: {
    paddingTop: 10,
    alignSelf: 'flex-start',
  },
  inputBox: {
    borderColor: colors.primaryLight,
    borderRadius: 8,
    // width: width * 0.7,
    alignItems: 'center',
    fontSize: 18,
    paddingLeft: 8
  },
});
