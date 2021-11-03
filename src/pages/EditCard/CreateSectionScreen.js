import React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native';

import {
  Block,
  Button,
  Input,
  Text,
} from 'galio-framework';
import AwesomeLoading from 'react-native-awesome-loading';
import Toast from 'react-native-toast-message';
import FacebookTabBar from './FacebookTabBar';
import { Dropdown } from 'react-native-material-dropdown';
import { colors, commonStyles } from '../../styles';

import {
  CallZCardClassFunction,
  CallController,
} from '../../redux/actions';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

const { width, height } = Dimensions.get('screen');
const sectionTypes = [
  { value: 'text_section', label: 'Text' },
  { value: 'custom_video', label: 'Video' },
  { value: 'custom_image', label: 'Image' },
  { value: 'pdf_section', label: 'PDF Viewer' },
  { value: 'default_section', label: 'Custom HTML' },
  { value: 'facebook_embed', label: 'Facebook Embed' },
];
class CreateSectionScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      creatingTextSection: false,
      text_sectionTitle: 'New Text Section',
      text_sectionDescription: '',
      text_originTabColor: '',
      text_originTabFontColor: '',

      creatingVideoSection: false,
      video_sectionTitle: 'New Video Section',
      video_sectionDescription: '',
      video_url: '',
      video_originTabColor: '',
      video_originTabFontColor: '',

      creatingImageSection: false,
      image_sectionTitle: 'New Image Section',
      image_sectionDescription: '',
      image_url: '',
      image_originTabColor: '',
      image_originTabFontColor: '',

      creatingPDFSection: false,
      pdf_sectionTitle: 'New PDF Section',
      pdf_url: '',
      pdf_originTabColor: '',
      pdf_originTabFontColor: '',

      creatingHTMLSection: false,
      html_sectionTitle: 'New HTML Section',
      html_originTabColor: '',
      html_originTabFontColor: '',
      isPreviewHTML: false,

      creatingFacebookSection: false,
      facebook_sectionTitle: 'New Facebook Section',
      facebook_originTabColor: '',
      facebook_originTabFontColor: '',
    }
  }

  componentDidMount = () => {
    const { selectedZCard } = this.props;

    this.setState({
      text_originTabColor: colors.original_tab_color,
      text_originTabFontColor: colors.original_tab_font_color,
      video_originTabColor: colors.original_tab_color,
      video_originTabFontColor: colors.original_tab_font_color,
      image_originTabColor: colors.original_tab_color,
      image_originTabFontColor: colors.original_tab_font_color,
      pdf_originTabColor: colors.original_tab_color,
      pdf_originTabFontColor: colors.original_tab_font_color,
      html_originTabColor: colors.original_tab_color,
      html_originTabFontColor: colors.original_tab_font_color,
      facebook_originTabColor: colors.original_tab_color,
      facebook_originTabFontColor: colors.original_tab_font_color,
    })
  }

  saveTextSection = () => {
    this.setState({ creatingTextSection: true });
  }
  saveVideoSection = () => {
    this.setState({ creatingVideoSection: true });
  }
  saveImageSection = () => {
    this.setState({ creatingImageSection: true });
  }
  savePDFSection = () => {
    this.setState({ creatingPDFSection: true });
  }
  saveHTMLSection = () => {
    this.setState({ creatingHTMLSection: true });
  }
  saveFacebookSection = () => {
    this.setState({ creatingFacebookSection: true });
  }

  renderTextSection = () => {
    const { creatingTextSection, text_sectionTitle, text_originTabColor, text_originTabFontColor } = this.state;
    return <ScrollView tabLabel='Text' style={styles.tabView}>
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Section Title</Text>
      <Input
        value={text_sectionTitle}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='profile' family='AntDesign' iconSize={18} iconColor={colors.primary}
        onChangeText={(text_sectionTitle) => this.setState({ text_sectionTitle })}
      />
      <TextInput
        multiline
        numberOfLines={3}
        placeholder='Input your data for this section in the editor. Use the code editor </> to utilize writing raw html code. Leave the editor </> before saving this section'
        onChangeText={(text_sectionDescription) => this.setState({ text_sectionDescription })}
        style={styles.description}>
      </TextInput>
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Select your tab color</Text>
      <Input
        value={text_originTabColor.toUpperCase()}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
        onPressIn={() => this.props.navigation.navigate('ColorPicker', {
          pickColor: (text_originTabColor) => this.setState({ text_originTabColor })
        })}
      />
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Select your font color</Text>
      <Input
        value={text_originTabFontColor.toUpperCase()}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
        onPressIn={() => this.props.navigation.navigate('ColorPicker', {
          pickColor: (text_originTabFontColor) => this.setState({ text_originTabFontColor })
        })}
      />
      <Block style={commonStyles.divider} />
      <Block center>
        <Button
          color={colors.green}
          icon='save' iconFamily='AntDesign' iconSize={20}
          textStyle={{ fontSize: 18 }}
          size='large'
          loading={creatingTextSection}
          onPress={this.saveTextSection}
        > Create Section</Button>
      </Block>
    </ScrollView>
  }

  renderVideoSection = () => {
    const { creatingVideoSection, video_sectionTitle, video_originTabColor, video_originTabFontColor } = this.state;
    return <ScrollView tabLabel='Video' style={styles.tabView}>
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Section Title</Text>
      <Input
        value={video_sectionTitle}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='profile' family='AntDesign' iconSize={18} iconColor={colors.primary}
        onChangeText={(video_sectionTitle) => this.setState({ video_sectionTitle })}
      />
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Video URL</Text>
      <Input
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
        onChangeText={(video_url) => this.setState({ video_url })}
        help='This Link below will parse full videos for popular video sites, such as youtube, video, etc. Simply put the actual link to the video below, and zcard will do the rest.'
        bottomHelp
      />
      <TextInput
        multiline
        numberOfLines={3}
        placeholder='Input your data for this section in the editor. Use the code editor </> to utilize writing raw html code. Leave the editor </> before saving this section'
        onChangeText={(video_sectionDescription) => this.setState({ video_sectionDescription })}
        style={styles.description}>
      </TextInput>
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Select your tab color</Text>
      <Input
        value={video_originTabColor.toUpperCase()}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
        onPressIn={() => this.props.navigation.navigate('ColorPicker', {
          pickColor: (video_originTabColor) => this.setState({ video_originTabColor })
        })}
      />
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Select your font color</Text>
      <Input
        value={video_originTabFontColor.toUpperCase()}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
        onPressIn={() => this.props.navigation.navigate('ColorPicker', {
          pickColor: (video_originTabFontColor) => this.setState({ video_originTabFontColor })
        })}
      />
      <Block style={commonStyles.divider} />
      <Button
        color={colors.green}
        icon='save' iconFamily='AntDesign' iconSize={20}
        textStyle={{ fontSize: 18 }}
        size='large'
        loading={creatingVideoSection}
        onPress={this.saveVideoSection}
      > Create Section</Button>
    </ScrollView>
  }
  renderImageSection = () => {
    const { creatingImageSection, image_sectionTitle, image_originTabColor, image_originTabFontColor } = this.state;
    return <ScrollView tabLabel='Image' style={styles.tabView}>
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Section Title</Text>
      <Input
        value={image_sectionTitle}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='profile' family='AntDesign' iconSize={18} iconColor={colors.primary}
        onChangeText={(image_sectionTitle) => this.setState({ image_sectionTitle })}
      />
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Image URL</Text>
      <Input
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
        onChangeText={(image_url) => this.setState({ image_url })}
      />
      <TextInput
        multiline
        numberOfLines={3}
        placeholder='Input your data for this section in the editor. Use the code editor </> to utilize writing raw html code. Leave the editor </> before saving this section'
        onChangeText={(image_sectionDescription) => this.setState({ image_sectionDescription })}
        style={styles.description}>
      </TextInput>
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Select your tab color</Text>
      <Input
        value={image_originTabColor.toUpperCase()}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
        onPressIn={() => this.props.navigation.navigate('ColorPicker', {
          pickColor: (image_originTabColor) => this.setState({ image_originTabColor })
        })}
      />
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Select your font color</Text>
      <Input
        value={image_originTabFontColor.toUpperCase()}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
        onPressIn={() => this.props.navigation.navigate('ColorPicker', {
          pickColor: (image_originTabFontColor) => this.setState({ image_originTabFontColor })
        })}
      />
      <Block style={commonStyles.divider} />
      <Button
        color={colors.green}
        icon='save' iconFamily='AntDesign' iconSize={20}
        textStyle={{ fontSize: 18 }}
        size='large'
        loading={creatingImageSection}
        onPress={this.saveImageSection}
      > Create Section</Button>
    </ScrollView>
  }
  renderPDFSection = () => {
    const { creatingPDFSection, pdf_sectionTitle, pdf_originTabColor, pdf_originTabFontColor } = this.state;
    return <ScrollView tabLabel='PDF' style={styles.tabView}>
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Section Title</Text>
      <Input
        value={pdf_sectionTitle}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='profile' family='AntDesign' iconSize={18} iconColor={colors.primary}
        onChangeText={(pdf_sectionTitle) => this.setState({ pdf_sectionTitle })}
      />
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>PDF URL</Text>
      <Input
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
        onChangeText={(pdf_url) => this.setState({ pdf_url })}
      />
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Select your tab color</Text>
      <Input
        value={pdf_originTabColor.toUpperCase()}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
        onPressIn={() => this.props.navigation.navigate('ColorPicker', {
          pickColor: (pdf_originTabColor) => this.setState({ pdf_originTabColor })
        })}
      />
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Select your font color</Text>
      <Input
        value={pdf_originTabFontColor.toUpperCase()}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
        onPressIn={() => this.props.navigation.navigate('ColorPicker', {
          pickColor: (pdf_originTabFontColor) => this.setState({ pdf_originTabFontColor })
        })}
      />
      <Block style={commonStyles.divider} />
      <Button
        color={colors.green}
        icon='save' iconFamily='AntDesign' iconSize={20}
        textStyle={{ fontSize: 18 }}
        size='large'
        loading={creatingPDFSection}
        onPress={this.savePDFSection}
      > Create Section</Button>
    </ScrollView>
  }
  renderHTMLSection = () => {
    const { creatingHTMLSection, html_sectionTitle, html_originTabColor, html_originTabFontColor, isPreviewHTML } = this.state;
    return <ScrollView tabLabel='HTML' style={styles.tabView}>
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Section Title</Text>
      <Input
        value={html_sectionTitle}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='profile' family='AntDesign' iconSize={18} iconColor={colors.primary}
        onChangeText={(html_sectionTitle) => this.setState({ html_sectionTitle })}
      />
      <TextInput
        multiline
        numberOfLines={3}
        placeholder='Input your data for this section in the editor. Use the code editor </> to utilize writing raw html code. Leave the editor </> before saving this section'
        onChangeText={(html_sectionDescription) => this.setState({ html_sectionDescription })}
        style={styles.description}>
      </TextInput>
      <Block style={{ alignItems: 'flex-end' }}>
        <Button
          color={colors.blue}
          icon={isPreviewHTML ? 'eye-with-line' : 'eye'} iconFamily='Entypo' iconSize={20}
          textStyle={{ fontSize: 18 }}
          size='small'
          onPress={() => this.setState({ isPreviewHTML: !isPreviewHTML })}
        > Preview</Button>
      </Block>
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Select your tab color</Text>
      <Input
        value={html_originTabColor.toUpperCase()}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
        onPressIn={() => this.props.navigation.navigate('ColorPicker', {
          pickColor: (html_originTabColor) => this.setState({ html_originTabColor })
        })}
      />
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Select your font color</Text>
      <Input
        value={html_originTabFontColor.toUpperCase()}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
        onPressIn={() => this.props.navigation.navigate('ColorPicker', {
          pickColor: (html_originTabFontColor) => this.setState({ html_originTabFontColor })
        })}
      />
      <Block style={commonStyles.divider} />
      <Button
        color={colors.green}
        icon='save' iconFamily='AntDesign' iconSize={20}
        textStyle={{ fontSize: 18 }}
        size='large'
        loading={creatingHTMLSection}
        onPress={this.saveHTMLSection}
      > Create Section</Button>
    </ScrollView>
  }
  renderFacebookSection = () => {
    const { creatingFacebookSection, facebook_sectionTitle, facebook_originTabColor, facebook_originTabFontColor } = this.state;
    return <ScrollView tabLabel='Facebook' style={styles.tabView}>
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Section Title</Text>
      <Input
        value={facebook_sectionTitle}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='profile' family='AntDesign' iconSize={18} iconColor={colors.primary}
        onChangeText={(facebook_sectionTitle) => this.setState({ facebook_sectionTitle })}
      />
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Facebook URL</Text>
      <Input
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
        onChangeText={(facebook_url) => this.setState({ facebook_url })}
      />
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Select your tab color</Text>
      <Input
        value={facebook_originTabColor.toUpperCase()}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
        onPressIn={() => this.props.navigation.navigate('ColorPicker', {
          pickColor: (facebook_originTabColor) => this.setState({ facebook_originTabColor })
        })}
      />
      <Text
        style={[styles.label, { color: colors.grey }]}
        size={16}>Select your font color</Text>
      <Input
        value={facebook_originTabFontColor.toUpperCase()}
        style={styles.inputBox} color={colors.primary} fontSize={18}
        icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
        onPressIn={() => this.props.navigation.navigate('ColorPicker', {
          pickColor: (facebook_originTabFontColor) => this.setState({ facebook_originTabFontColor })
        })}
      />
      <Block style={commonStyles.divider} />
      <Button
        color={colors.green}
        icon='save' iconFamily='AntDesign' iconSize={20}
        textStyle={{ fontSize: 18 }}
        size='large'
        loading={creatingFacebookSection}
        onPress={this.saveFacebookSection}
      > Create Section</Button>
    </ScrollView>
  }

  render = () => {
    const { creating } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollableTabView
            style={{ marginTop: 20 }}
            initialPage={0}
            renderTabBar={() => <FacebookTabBar />}
          >
            {this.renderTextSection()}
            {this.renderVideoSection()}
            {this.renderImageSection()}
            {this.renderPDFSection()}
            {this.renderHTMLSection()}
            {this.renderFacebookSection()}
          </ScrollableTabView>
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
    fetchNewSectionHTML: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    save_use_template_id: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSectionScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    width,
    height,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
    marginBottom: 10
  },
  label: {
    paddingTop: 10,
    alignSelf: 'flex-start',
  },
  inputBox: {
    borderColor: colors.border,
    borderRadius: 8,
    // width: width * 0.7,
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
});
