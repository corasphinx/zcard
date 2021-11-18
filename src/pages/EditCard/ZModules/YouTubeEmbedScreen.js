import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, ScrollView, SafeAreaView, StyleSheet, Dimensions, Platform, Image } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Block, Text, Input, Button, Checkbox, Radio } from 'galio-framework';
import Toast from 'react-native-toast-message';
import { colors, commonStyles } from '../../../styles';
import { hostname } from '../../../constant';
import RadioButton from '../../../components/RadioButton';
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
    title: 'ZModule Title'
  },
  {
    index: 1,
    title: 'YouTube Embed Settings'
  },
  {
    index: 2,
    title: 'Color Settings'
  }
]

const ENTITY_TYPE = [
  {
    key: 'username',
    text: 'Recent Uploads (By UserName)'
  },
  {
    key: 'url',
    text: 'YouTube Video / PlayList'
  },
];

class YouTubeEmbedScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderActiveSlide: 0,
      section_title: '',
      youtube_entity: '',
      youtube_entity_type: 'username',
      saving: false,
      tab_color: colors.default_module_tab_color,
      tab_font_color: colors.default_module_tab_font_color,
    };
  }

  isValidate = () => {
    const { section_title, youtube_entity } = this.state;
    if (section_title == '') return 'You must supply a Zmodule Title to save!';
    if (youtube_entity == '') return 'You must supply a URL to save!';
    return '';
  }

  save = () => {
    this.setState({ saving: true });
    const { selectedZCard } = this.props;
    const { product } = this.props.route.params;
    const { section_title, youtube_entity, youtube_entity_type, tab_color, tab_font_color } = this.state;

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
    this.props.AddZModule(
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
        this.props.saveTitle(
          `/zmodule_files/${identifier}/controllers/${page}.php`,
          {
            section_title,
            zcard,
            section
          },
          (msg) => {
            page++;
            // save URL
            this.props.saveURL(
              `/zmodule_files/${identifier}/controllers/${page}.php`,
              {
                zcard: zcard,
                section: section,
                zmodule_identifier: identifier,
                youtube_entity: youtube_entity,
                youtube_entity_type: youtube_entity_type
              },
              (msg) => {
                page++;
                // save Colors
                this.props.saveColors(
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
                    this.props.completeSave(
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

  renderScreen0 = (title, index) => {
    const { section_title } = this.state;
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Image
          style={styles.avatar}
          source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>A YouTube Zmodule is a fantastic way to demonstrate your brand, personality, business model, or other interests. You can embed a single video, most recent channel uploads, or a playlist. Please choose the title of your Zmodule below!</Text>
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
    const { youtube_entity, youtube_entity_type } = this.state;
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Image
          style={styles.avatar}
          source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>You can embed YouTube videos, playlists, or recent channel uploads. Please supply your YouTube channel's username, a playlist URL, or a direct video URL!</Text>
      </Block>
      <Block style={commonStyles.divider} />
      <Block style={{ margin: 10 }}>
        <Text
          style={styles.label}
          size={16}>YouTube Video or Playlist URL</Text>
        <Input
          value={youtube_entity}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='youtube' family='AntDesign' iconSize={18} iconColor={colors.primary}
          onChangeText={(youtube_entity) => this.setState({ youtube_entity })}
        />
      </Block>

      <RadioButton
        PROP={ENTITY_TYPE}
        initValue={youtube_entity_type}
        onSelect={(youtube_entity_type) => this.setState({ youtube_entity_type })}
      />

      <Text bold size={16} color={colors.primary} style={{ marginTop: 10 }}>Video Example:</Text>
      <Text italic size={14} color={colors.primaryLight} style={{ marginBottom: 10 }}>https://www.youtube.com/watch?v=VIDEO-ID-HERE</Text>
      <Text bold size={16} color={colors.primary}>Playlist Example:</Text>
      <Text italic size={14} color={colors.primaryLight} style={{ marginBottom: 10 }}>https://www.youtube.com/playlist?list=PLAYLIST-ID-HERE</Text>
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
    AddZModule: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    saveTitle: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    saveURL: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    saveColors: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    completeSave: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouTubeEmbedScreen);

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
});
