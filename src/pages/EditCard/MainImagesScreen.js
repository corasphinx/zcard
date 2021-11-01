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
import Toast from 'react-native-toast-message';
import { colors, commonStyles } from '../../styles';

import {
  CallClassFunction,
  CallController,
} from '../../redux/actions';

import { hostname } from '../constant';

const { width, height } = Dimensions.get('screen');

class MainImagesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      isExpandedFrontPhoto: false,
      isExpandedBackPhoto: false,
      isExpandedLogo: false,
      isExpandedBanner: false,
    }
  }

  componentDidMount = () => {
  }

  renderFrontPhoto = () => {
    const { isExpandedFrontPhoto } = this.state;
    return <Collapse
      isExpanded={isExpandedFrontPhoto}
      onToggle={(isExpandedFrontPhoto) => this.setState({ isExpandedFrontPhoto })}
      style={{ margin: 10 }}
    >
      <CollapseHeader>
        <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
          <Text size={18} bold color={colors.white}>Front Card Photo</Text>
          {isExpandedFrontPhoto && <Icon name='down' family='AntDesign' size={18} color={colors.white} />}
          {!isExpandedFrontPhoto && <Icon name='left' family='AntDesign' size={18} color={colors.white} />}
        </Block>
      </CollapseHeader>
      <CollapseBody
        style={[commonStyles.shadow, commonStyles.collapseBody]}
      >
        <Input
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='picture' family='AntDesign' iconSize={18} iconColor={colors.primary}
        // onChangeText={(zc_name) => this.setState({ zc_name })}
        />
        <Text
          style={[styles.label, { color: colors.grey }]}
          size={16}>Image URL</Text>
        <Input
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
        // onChangeText={(zc_name) => this.setState({ zc_name })}
        />
        <Text
          style={[styles.label, { color: colors.grey }]} italic
          size={14}>This image is going to be your main header image. you need to ensure that the image is rectangle, and NOT square. If it's a square image it will NOT work here. The image here should have a maximum height of 220px.</Text>
        <Image
          style={styles.image}
        // source={{uri:}}
        />
        <Block center>
          <Button
            color={colors.blue}
            icon='folderopen' iconFamily='AntDesign' iconSize={18}
            textStyle={{ fontSize: 18 }}
          // onPress={this.useAccount}
          > Choose File</Button>
        </Block>
      </CollapseBody>
    </Collapse>
  }
  renderBackPhoto = () => {
    const { isExpandedBackPhoto } = this.state;
    return <Collapse
      isExpanded={isExpandedBackPhoto}
      onToggle={(isExpandedBackPhoto) => this.setState({ isExpandedBackPhoto })}
      style={{ margin: 10 }}
    >
      <CollapseHeader>
        <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
          <Text size={18} bold color={colors.white}>Back Card Photo</Text>
          {isExpandedBackPhoto && <Icon name='down' family='AntDesign' size={18} color={colors.white} />}
          {!isExpandedBackPhoto && <Icon name='left' family='AntDesign' size={18} color={colors.white} />}
        </Block>
      </CollapseHeader>
      <CollapseBody
        style={[commonStyles.shadow, commonStyles.collapseBody]}
      >
        <Input
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='picture' family='AntDesign' iconSize={18} iconColor={colors.primary}
        // onChangeText={(zc_name) => this.setState({ zc_name })}
        />
        <Text
          style={[styles.label, { color: colors.grey }]}
          size={16}>Image URL</Text>
        <Input
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
        // onChangeText={(zc_name) => this.setState({ zc_name })}
        />
        <Text
          style={[styles.label, { color: colors.grey }]} italic
          size={14}>This image displays just below your main image. Unless you have an image that flows nicely with your main image ( and is also a rectangle ), we would suggest you not utilize this field.</Text>
        <Image
          style={styles.image}
        // source={{uri:}}
        />
        <Block center>
          <Button
            color={colors.blue}
            icon='folderopen' iconFamily='AntDesign' iconSize={18}
            textStyle={{ fontSize: 18 }}
          // onPress={this.useAccount}
          > Choose File</Button>
        </Block>
      </CollapseBody>
    </Collapse>
  }
  renderLogo = () => {
    const { isExpandedLogo } = this.state;
    return <Collapse
      isExpanded={isExpandedLogo}
      onToggle={(isExpandedLogo) => this.setState({ isExpandedLogo })}
      style={{ margin: 10 }}
    >
      <CollapseHeader>
        <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
          <Text size={18} bold color={colors.white}>Your logo / Favicon</Text>
          {isExpandedLogo && <Icon name='down' family='AntDesign' size={18} color={colors.white} />}
          {!isExpandedLogo && <Icon name='left' family='AntDesign' size={18} color={colors.white} />}
        </Block>
      </CollapseHeader>
      <CollapseBody
        style={[commonStyles.shadow, commonStyles.collapseBody]}
      >
        <Input
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='picture' family='AntDesign' iconSize={18} iconColor={colors.primary}
        // onChangeText={(zc_name) => this.setState({ zc_name })}
        />
        <Text
          style={[styles.label, { color: colors.grey }]}
          size={16}>Image URL</Text>
        <Input
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
        // onChangeText={(zc_name) => this.setState({ zc_name })}
        />
        <Text
          style={[styles.label, { color: colors.grey }]} italic
          size={14}>This is used to display your icon in the browser when someone visits your page, it"s also the icon they will see when they save your card to their phone, or desktop.</Text>
        <Image
          style={styles.image}
        // source={{uri:}}
        />
        <Block center>
          <Button
            color={colors.blue}
            icon='folderopen' iconFamily='AntDesign' iconSize={18}
            textStyle={{ fontSize: 18 }}
          // onPress={this.useAccount}
          > Choose File</Button>
        </Block>
      </CollapseBody>
    </Collapse>
  }
  renderBanner = () => {
    const { isExpandedBanner } = this.state;
    return <Collapse
      isExpanded={isExpandedBanner}
      onToggle={(isExpandedBanner) => this.setState({ isExpandedBanner })}
      style={{ margin: 10 }}
    >
      <CollapseHeader>
        <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
          <Text size={18} bold color={colors.white}>Footer Banner</Text>
          {isExpandedBanner && <Icon name='down' family='AntDesign' size={18} color={colors.white} />}
          {!isExpandedBanner && <Icon name='left' family='AntDesign' size={18} color={colors.white} />}
        </Block>
      </CollapseHeader>
      <CollapseBody
        style={[commonStyles.shadow, commonStyles.collapseBody]}
      >
        <Input
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='picture' family='AntDesign' iconSize={18} iconColor={colors.primary}
        // onChangeText={(zc_name) => this.setState({ zc_name })}
        />
        <Text
          style={[styles.label, { color: colors.grey }]}
          size={16}>Image URL</Text>
        <Input
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
        // onChangeText={(zc_name) => this.setState({ zc_name })}
        />
        <Text
          style={[styles.label, { color: colors.grey }]} italic
          size={14}>This appears at the bottom of your card ( the very bottom ), and also needs to be a rectangle. It will be shown as a leaderboard ad across the bottom of your card below the last tab on your card.</Text>
        <Image
          style={styles.image}
        // source={{uri:}}
        />
        <Block center>
          <Button
            color={colors.blue}
            icon='folderopen' iconFamily='AntDesign' iconSize={18}
            textStyle={{ fontSize: 18 }}
          // onPress={this.useAccount}
          > Choose File</Button>
        </Block>
      </CollapseBody>
    </Collapse>
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
              {this.renderFrontPhoto()}
              {this.renderBackPhoto()}
              {this.renderLogo()}
              {this.renderBanner()}
            </ScrollView>
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
  };
}
function mapDispatchToProps(dispatch) {
  return {
    listPartnerProfilesByAccount: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    fetchZCardEntry: (className, funcName, reqArray, successcb, errorcb, getData) => CallController(className, funcName, reqArray, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainImagesScreen);

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
  image: {
    backgroundColor: colors.grey,
    width: width - 40,
    height: width - 40,
    borderRadius: 8
  }
});
