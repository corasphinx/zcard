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
import ScrollTabBar from './ScrollTabBar';
import HTMLView from 'react-native-htmlview';
import { Dropdown } from 'react-native-material-dropdown';
import { colors, commonStyles } from '../../styles';

import {
  GetAllSectionEditHTML,
  CallController,
} from '../../redux/actions';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

const { width, height } = Dimensions.get('screen');

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
    const { selectedZCard } = this.props;
    const {
      text_sectionTitle,
      text_sectionDescription,
      text_originTabColor,
      text_originTabFontColor
    } = this.state;
    this.setState({ creatingTextSection: true });
    this.props.updateSection(
      `/controllers/edit-zcard/update_any_section.php?z=${selectedZCard.id}&s=0&t=text`,
      {
        section_name: text_sectionTitle,
        section_html: text_sectionDescription,
        tab_color: text_originTabColor,
        tab_font_color: text_originTabFontColor
      },
      (msg) => {
        this.setState({ creatingTextSection: false });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Saved successfully 🎊'
        });
        this.fetchSections();
      },
      (msg) => {
        this.setState({ creatingTextSection: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Failed to save 😥'
        });
      }
    );
  }
  saveVideoSection = () => {
    this.setState({ creatingVideoSection: true });
    const { selectedZCard } = this.props;
    const {
      video_sectionTitle,
      video_url,
      video_sectionDescription,
      video_originTabColor,
      video_originTabFontColor
    } = this.state;
    this.props.updateSection(
      `/controllers/edit-zcard/update_any_section.php?z=${selectedZCard.id}&s=0&t=video`,
      {
        section_name: video_sectionTitle,
        video_url: video_url,
        section_html: video_sectionDescription,
        tab_color: video_originTabColor,
        tab_font_color: video_originTabFontColor
      },
      (msg) => {
        this.setState({ creatingVideoSection: false });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Saved successfully 🎊'
        });
        this.fetchSections();
      },
      (msg) => {
        this.setState({ creatingVideoSection: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Failed to save 😥'
        });
      }
    );
  }
  saveImageSection = () => {
    this.setState({ creatingImageSection: true });
    const { selectedZCard } = this.props;
    const {
      image_sectionTitle,
      image_url,
      image_sectionDescription,
      image_originTabColor,
      image_originTabFontColor
    } = this.state;
    this.props.updateSection(
      `/controllers/edit-zcard/update_any_section.php?z=${selectedZCard.id}&s=0&t=image`,
      {
        image_name: image_sectionTitle,
        image_url: image_url,
        section_html: image_sectionDescription,
        tab_color: image_originTabColor,
        tab_font_color: image_originTabFontColor
      },
      (msg) => {
        this.setState({ creatingImageSection: false });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Saved successfully 🎊'
        });
        this.fetchSections();
      },
      (msg) => {
        this.setState({ creatingImageSection: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Failed to save 😥'
        });
      }
    );
  }
  savePDFSection = () => {
    this.setState({ creatingPDFSection: true });
    const { selectedZCard } = this.props;
    const {
      pdf_sectionTitle,
      pdf_url,
      pdf_originTabColor,
      pdf_originTabFontColor
    } = this.state;
    this.props.updateSection(
      `/controllers/edit-zcard/update_any_section.php?z=${selectedZCard.id}&s=0&t=pdf`,
      {
        section_name: pdf_sectionTitle,
        pdf_url: pdf_url,
        tab_color: pdf_originTabColor,
        tab_font_color: pdf_originTabFontColor
      },
      (msg) => {
        this.setState({ creatingPDFSection: false });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Saved successfully 🎊'
        });
        this.fetchSections();
      },
      (msg) => {
        this.setState({ creatingPDFSection: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Failed to save 😥'
        });
      }
    );
  }
  saveHTMLSection = () => {
    this.setState({ creatingHTMLSection: true });
    const { selectedZCard } = this.props;
    const {
      html_sectionTitle,
      html_sectionDescription,
      html_originTabColor,
      html_originTabFontColor
    } = this.state;
    this.props.updateSection(
      `/controllers/edit-zcard/update_any_section.php?z=${selectedZCard.id}&s=0&t=default`,
      {
        section_name: html_sectionTitle,
        section_html: html_sectionDescription,
        tab_color: html_originTabColor,
        tab_font_color: html_originTabFontColor
      },
      (msg) => {
        this.setState({ creatingHTMLSection: false });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Saved successfully 🎊'
        });
        this.fetchSections();
      },
      (msg) => {
        this.setState({ creatingHTMLSection: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Failed to save 😥'
        });
      }
    );
  }
  saveFacebookSection = () => {
    this.setState({ creatingFacebookSection: true });
    const { selectedZCard } = this.props;
    const {
      facebook_sectionTitle,
      facebook_url,
      facebook_originTabColor,
      facebook_originTabFontColor
    } = this.state;
    this.props.updateSection(
      `/controllers/edit-zcard/update_any_section.php?z=${selectedZCard.id}&s=0&t=facebook_embed`,
      {
        section_name: facebook_sectionTitle,
        general_value: facebook_url,
        tab_color: facebook_originTabColor,
        tab_font_color: facebook_originTabFontColor
      },
      (msg) => {
        this.setState({ creatingFacebookSection: false });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Saved successfully 🎊'
        });
        this.fetchSections();
      },
      (msg) => {
        this.setState({ creatingFacebookSection: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Failed to save 😥'
        });
      }
    );
  }

  fetchSections = () => {
    const { selectedZCard } = this.props;

    this.props.getAllSectionEditHTML(
      selectedZCard.id,
      'getAllSectionEditHTML',
      [true],
      () => {
        this.props.navigation.goBack();
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
    const { creatingHTMLSection, html_sectionTitle, html_sectionDescription, html_originTabColor, html_originTabFontColor, isPreviewHTML } = this.state;
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
      {!isPreviewHTML && <TextInput
        multiline
        numberOfLines={3}
        placeholder='Input your data for this section in the editor. Use the code editor </> to utilize writing raw html code. Leave the editor </> before saving this section'
        onChangeText={(html_sectionDescription) => this.setState({ html_sectionDescription })}
        style={styles.description}>
      </TextInput>}
      {isPreviewHTML && <HTMLView
        style={{ padding: 10, borderWidth: 1, borderRadius: 8, borderColor: colors.border, backgroundColor: colors.backgroundLight }}
        value={html_sectionDescription == undefined ? '' : html_sectionDescription}
        stylesheet={tagStyles}
      />}
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
            renderTabBar={() => <ScrollTabBar />}
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
    getAllSectionEditHTML: (id, funcName, reqArray, successcb, errorcb) => GetAllSectionEditHTML(dispatch, id, funcName, reqArray, successcb, errorcb),
    updateSection: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSectionScreen);

const tagStyles = StyleSheet.create({
  p: {
    fontSize: 16,
  },
  li: {
    fontSize: 16,
  },
})

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
