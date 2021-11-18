import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, ScrollView, SafeAreaView, StyleSheet, Dimensions, Platform, Image, TextInput } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Block, Text, Input, Button, Checkbox, Radio } from 'galio-framework';
import DocumentPicker from 'react-native-document-picker';
import { Switch } from 'react-native-switch';
import Toast from 'react-native-toast-message';
import { colors, commonStyles } from '../../../styles';
import { hostname } from '../../../constant';
import {
  CallClassFunction,
  CallController,
  SaveTab
} from '../../../redux/actions';
const { width, height } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * width) / 100;
  return Math.round(value);
}

const ENTRIES = [
  {
    index: 0,
    title: 'ZModule Title'
  },
  {
    index: 1,
    title: 'Image Settings'
  },
  {
    index: 2,
    title: 'Description'
  },
  {
    index: 3,
    title: 'Color Settings'
  }
]
class ImageSectionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderActiveSlide: 0,
      saving: false,
      section_title: '',
      image_label: '',
      image_file_upload: null,
      image_url: '',
      section_content: '',
      tab_color: colors.default_module_tab_color,
      tab_font_color: colors.default_module_tab_font_color,
      embedType: true
    };
  }

  componentDidMount = () => {
    const { section } = this.props.route.params;
    if (section) {
      const { selectedZCard } = this.props;
      this.props.callClassFunction(
        'Zmodule',
        'info',
        [section.general_value],
        (Zmodule_Info) => {

          // fetch Zmodule_Data
          if (Zmodule_Info) {

            this.props.callClassFunction(
              'Zmodule',
              'select_zmodule_data',
              [{
                _permalink: Zmodule_Info[0]._permalink,
                zcard: selectedZCard.id,
                section: section.id
              }],
              (Zmodule_Data) => {
                if (Zmodule_Data) {
                  this.setState({ 
                    embedType : Zmodule_Data[0].image_url == '',
                    image_url:Zmodule_Data[0].image_url,
                    image_label: Zmodule_Data[0].image_label,
                    section_content: Zmodule_Data[0].section_content,
                   })
                }
              },
            );
          }
        }
      );

      this.setState({
        section_title: section.name,
        tab_color: section.tab_color,
        tab_font_color: section.tab_font_color,
      });
    }
  }

  pick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({ image_file_upload: Array.isArray(res) ? res[0] : res });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // alert('Canceled');
      } else {
        console.warn('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  renderScreens = ({ item, index }) => {
    switch (item.index) {
      case 0:
        return this.renderScreen0(item.title, index);
      case 1:
        return this.renderScreen1(item.title, index);
      case 2:
        return this.renderScreen2(item.title, index);
      case 3:
        return this.renderScreen3(item.title, index);
    }
  }

  isValidate = () => {
    const { section_title, image_label, section_content } = this.state;
    if (section_title == '') return 'You must supply a Zmodule Title to save!';
    if (image_label == '') return 'You must supply a Label to save!';
    if (section_content == '') return 'You must supply a Description to save!';
    return '';
  }

  save = () => {
    this.setState({ saving: true });
    const { selectedZCard } = this.props;
    const { product, section } = this.props.route.params;

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

    if(!section){
    // add zmodule
    this.props.callController(
      '/controllers/Zcard/add_zmodule_section.php',
      {
        zcard_id: selectedZCard.id,
        product_id: product.id
      },
      (res) => {
        let url = res.zmodule_wizard_url;
        let params = url.split('/');
        const identifier = params[4]; // string
        const zcard = params[5];  // same as zcard_id
        const section = params[6];
        let page = params[7];

        this.saveSection(identifier, zcard, section, page);
      },
      (msg) => {
        this.setState({ saving: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      },
      true
    );
    }else{
      this.saveSection(section.general_value, selectedZCard.id, section.id, 1);
    }
  }

  saveSection = (identifier, zcard, section, page) => {
    const { section_title, image_label, image_file_upload, image_url, section_content, tab_color, tab_font_color } = this.state;
    // save title
    this.props.callController(
      `/zmodule_files/${identifier}/controllers/${page}.php`,
      {
        section_title,
        zcard,
        section
      },
      (msg) => {
        page++;
        // save label & url
        const fd = new FormData();
        fd.append('zcard', zcard);
        fd.append('section', section);
        fd.append('image_label', image_label);
        fd.append('image_url', image_url);
        if (image_file_upload)
          fd.append('image_file_upload', image_file_upload);

        this.props.saveImage(
          `/zmodule_files/${identifier}/controllers/${page}.php`,
          fd,
          (msg) => {
            page++;

            // save content
            this.props.callController(
              `/zmodule_files/${identifier}/controllers/${page}.php`,
              {
                section_content,
                section,
                zcard
              },
              (msg) => {
                page++;
                // save Colors
                this.props.callController(
                  `/zmodule_files/GLOBAL-ZMODULE-FILES/controllers/section-colors.php`,
                  {
                    zmodule_identifier: identifier,
                    zcard: zcard,
                    section: section,
                    tab_color: tab_color,
                    tab_font_color: tab_font_color
                  },
                  (msg) => {
                    // complete saving
                    this.props.callController(
                      '/zmodule_files/mark_section_complete.php',
                      {
                        section
                      },
                      (msg) => {
                        this.setState({ saving: false });
                        Toast.show({
                          type: 'success',
                          position: 'top',
                          text1: 'Success',
                          text2: msg + ' 🎊'
                        });
                        setTimeout(() => {
                          this.props.navigation.pop(2);
                        }, 2000);
                      },
                      (msg) => {
                        this.setState({ saving: false });
                        Toast.show({
                          type: 'error',
                          position: 'top',
                          text1: 'Error',
                          text2: msg + ' 😥'
                        });
                      },
                    )
                  },
                  (msg) => {
                    this.setState({ saving: false });
                    Toast.show({
                      type: 'error',
                      position: 'top',
                      text1: 'Error',
                      text2: msg + ' 😥'
                    });
                  },
                )
              },
              (msg) => {
                this.setState({ saving: false });
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: 'Error',
                  text2: msg + ' 😥'
                });
              }
            );
          },
          (msg) => {
            this.setState({ saving: false });
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Error',
              text2: msg + ' 😥'
            });
          },
        );
      },
      (msg) => {
        this.setState({ saving: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      },
    )
  }
  renderScreen0 = (title, index) => {
    const { section_title } = this.state;
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Image
          style={styles.avatar}
          source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>A Zcard Image Section is a perfect way to display a photo on your Zcard!</Text>
      </Block>
      <Block style={{ margin: 10 }}>
        <Text
          style={styles.label}
          size={16}>ZModule Title</Text>
        <Input
          value={section_title}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='infocirlceo' family='AntDesign' iconSize={18} iconColor={colors.primary}
          onChangeText={(section_title) => this.setState({ section_title })}
        />
      </Block>
    </Block>
  }
  renderScreen1 = (title, index) => {
    const { embedType, image_label, image_file_upload, image_url } = this.state;
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Image
          style={styles.avatar}
          source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>A short label for your image is a very great way to quickly let search engines, screen readers, and handicap accessible tools relay information to your visitors.</Text>
      </Block>
      <Block style={commonStyles.divider} />
      <Block style={{ margin: 10 }}>
        <Text
          style={styles.label}
          size={16}>Image Label</Text>
        <Input
          value={image_label}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='image' family='Entypo' iconSize={18} iconColor={colors.primary}
          onChangeText={(image_label) => this.setState({ image_label })}
        />
      </Block>
      <Block style={{ margin: 10 }}>
        <Block style={commonStyles.divider} />
        <Text italic size={14} color={colors.primaryLight} style={{ flexShrink: 1 }}>You can easily add an image by either uploading your photo from a compatible device, or by copying and pasting the full URL of your existing online photo. You may only add 1 photo to this Image Zmodule. Click on the greyed out box to toggle between either option! Your settings will be saved for next time.</Text>
        <Block row style={{ alignItems: 'center' }}>
          <Text size={16} color={colors.primary}>Choose type :</Text>
          <Switch
            value={embedType}
            onValueChange={(embedType) => this.setState({ embedType })}
            disabled={false}
            activeText={'File'}
            inActiveText={'URL'}
            backgroundActive={'green'}
            backgroundInactive={'gray'}
            circleActiveColor={'#30a566'}
            circleInActiveColor={'#000000'}
            switchWidthMultiplier={3}
            containerStyle={{ margin: 10 }}
          />
        </Block>
        {embedType && <Block>
          <Text
            style={styles.label}
            size={16}>Choose a PDF from your device</Text>
          <Input
            value={image_file_upload ? image_file_upload.uri : ''}
            style={styles.inputBox} color={colors.primary} fontSize={18}
            icon='clouduploado' family='AntDesign' iconSize={18} iconColor={colors.primary}
            help="Upload an image from your computer to attach any photo to your Zcard."
            bottomHelp
            onPressIn={this.pick}
          />
        </Block>}
        {!embedType && <Block>
          <Text
            style={styles.label}
            size={16}>Input PDF URL</Text>
          <Input
            value={image_url}
            style={styles.inputBox} color={colors.primary} fontSize={18}
            icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
            help="You can use the field below to use a web URL for a photo already on the internet. This is a great way to use our Media Center and share images across the web."
            bottomHelp
            onChangeText={(image_url) => this.setState({ image_url })}
          />
        </Block>}
      </Block>
    </Block>
  }
  renderScreen2 = (title, index) => {
    const { section_content } = this.state;
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Image
          style={styles.avatar}
          source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>Write a caption for your photo to display underneath and let visitors know what they are looking at. A well written caption is a great way to improve your business' online exposure, with search engine optimization to boost your rankings throughout the internet.</Text>
      </Block>
      <Block style={commonStyles.divider} />
      <Block style={{ margin: 10 }}>
        <Text
          style={styles.label}
          size={16}>Image Caption</Text>
        <TextInput
          multiline
          numberOfLines={3}
          placeholder='Input caption...'
          onChangeText={(section_content) => this.setState({ section_content })}
          style={styles.description}>{section_content}
        </TextInput>
      </Block>
    </Block>
  }
  renderScreen3 = (title, index) => {
    const { saving, tab_color, tab_font_color } = this.state;
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Image
          style={styles.avatar}
          source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
      </Block>
      <Text italic size={16} color={colors.primaryLight} style={{ marginBottom: 10 }}>Your Zmodule can be styled however you wish. Please choose a background color and font color!</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Text
          style={styles.label}
          size={16}>Section's Background color</Text>
        <Input
          value={tab_color}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
          onPressIn={() => this.props.navigation.navigate('ColorPicker', {
            pickColor: (tab_color) => this.setState({ tab_color })
          })}
        />
      </Block>
      <Block>
        <Text
          style={styles.label}
          size={16}>Section's Font Color</Text>
        <Input
          value={tab_font_color}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
          onPressIn={() => this.props.navigation.navigate('ColorPicker', {
            pickColor: (tab_font_color) => this.setState({ tab_font_color })
          })}
        />
      </Block>
      <Block style={[commonStyles.card, { height: 100, backgroundColor: tab_color }]}>
        <Text size={22} color={tab_font_color} style={{ alignSelf: 'center', marginTop: 30 }}>Preview Section</Text>
      </Block>
      <Block style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 20 }}>
        <Button
          color={colors.green}
          icon='save' iconFamily='AntDesign' iconSize={18}
          textStyle={{ fontSize: 18 }}
          loading={saving}
          onPress={this.save}
        > FINISH</Button>
      </Block>
    </Block>
  }

  render() {
    const { sliderActiveSlide } = this.state;
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
              <Carousel
                ref={c => this._slider1Ref = c}
                data={ENTRIES}
                renderItem={this.renderScreens}
                sliderWidth={width}
                itemWidth={wp(85) + wp(1)}
                firstItem={0}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.7}
                containerCustomStyle={commonStyles.slider}
                contentContainerCustomStyle={commonStyles.sliderContentContainer}
                // layout='tinder'
                onSnapToItem={(index) => this.setState({ sliderActiveSlide: index })}
              />
            </ScrollView>
            {/* <Block style={commonStyles.BottomBar}> */}
            <Pagination
              dotsLength={ENTRIES.length}
              activeDotIndex={sliderActiveSlide}
              containerStyle={commonStyles.paginationContainer}
              dotStyle={commonStyles.paginationDot}
              dotColor={colors.primary}
              inactiveDotColor='#1a1917'
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this._slider1Ref}
              tappableDots={!!this._slider1Ref}
            />
            {/* </Block> */}
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
    callController: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    saveImage: (controller, req, successcb, errorcb) => SaveTab(controller, req, successcb, errorcb),
    callClassFunction: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageSectionScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  avatar: {
    resizeMode: 'stretch',
    width: wp(10),
    height: wp(10),
    borderRadius: 8,
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
});
