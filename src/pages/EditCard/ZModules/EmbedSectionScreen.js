import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, ScrollView, SafeAreaView, StyleSheet, Dimensions, Platform, Image, TextInput } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Block, Text, Input, Button, Checkbox, Radio } from 'galio-framework';
import Toast from 'react-native-toast-message';
import { colors, commonStyles } from '../../../styles';
import { hostname } from '../../../constant';
import HTMLEditor from '../../../components/HTMLEditor';
import {
  CallController
} from '../../../redux/actions';
const { width, height } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * width) / 100;
  return Math.round(value);
}

const ENTRIES = [
  {
    index: 0,
    title: 'Section Title'
  },
  {
    index: 1,
    title: 'Embedded Content'
  },
  {
    index: 2,
    title: 'Color Settings'
  }
]
class EmbedSectionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderActiveSlide: 0,
      saving: false,
      section_title: '',
      section_content: '',
      tab_color: colors.default_module_tab_color,
      tab_font_color: colors.default_module_tab_font_color,
    };
  }

  renderScreens = ({ item, index }) => {
    switch (item.index) {
      case 0:
        return this.renderScreen0(item.title, index);
      case 1:
        return this.renderScreen1(item.title, index);
      case 2:
        return this.renderScreen2(item.title, index);
    }
  }

  isValidate = () => {
    const { section_title, section_content } = this.state;
    if (section_title == '') return 'You must supply a Zmodule Title to save!';
    if (section_content == '') return 'You must supply a Content to save!';
    return '';
  }

  save = () => {
    this.setState({ saving: true });
    const { selectedZCard } = this.props;
    const { product } = this.props.route.params;
    const { section_title, section_content, tab_color, tab_font_color } = this.state;

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
            // save Content
            this.props.callController(
              `/zmodule_files/${identifier}/controllers/${page}.php`,
              {
                zcard: zcard,
                section: section,
                zmodule_identifier: identifier,
                section_content: section_content
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
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>An Embed Zmodule is a fantastic way to embed media from other websites. Enjoy the flexibility of controlling your content and displaying it within your Zcard.</Text>
      </Block>
      <Block style={{ margin: 10 }}>
        <Text
          style={styles.label}
          size={16}>Section Title</Text>
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
    const { section_content } = this.state;
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Image
          style={styles.avatar}
          source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>The Embed Zmodule allows you to embed HTML content, videos, and other pages from around the web. Put the code you were given to embed any type of media below.</Text>
      </Block>
      <Block style={commonStyles.divider} />
      <Block style={{ margin: 10 }}>
      <Text
          style={styles.label}
          size={16}>Content:</Text>
        <TextInput
          multiline
          numberOfLines={10}
          onChangeText={(section_content) => this.setState({ section_content })}
          style={styles.description}>{section_content}
        </TextInput>
        {/* <HTMLEditor
          initHTML={section_content}
          onEdit={(section_content) => this.setState({ section_content })}
        /> */}
      </Block>
    </Block>
  }
  renderScreen2 = (title, index) => {
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
      <Block style={[commonStyles.card, { height: 100 }]}>
        <Text size={22} color={colors.primary} style={{ alignSelf: 'center', marginTop: 30 }}>Preview Section</Text>
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
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedSectionScreen);

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
