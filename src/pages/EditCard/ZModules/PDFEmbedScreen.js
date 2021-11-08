import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, ScrollView, SafeAreaView, StyleSheet, Dimensions, Platform, Image, TextInput } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Block, Text, Input, Button, Checkbox, Radio } from 'galio-framework';
import DocumentPicker from 'react-native-document-picker';
import { Switch } from 'react-native-switch';
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

const ENTRIES = [
  {
    index: 0,
    title: 'ZModule Title'
  },
  {
    index: 1,
    title: 'PDF Settings'
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
class PDFEmbedScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderActiveSlide: 0,
      saving: false,
      section_title: '',
      tab_color: colors.default_module_tab_color,
      tab_font_color: colors.default_module_tab_font_color,
      embedType: true
    };
  }

  pick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      // this.setState({ pdfFile: Array.isArray(res) ? res[0] : res });
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

  renderScreen0 = (title, index) => {
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Image
          style={styles.avatar}
          source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>PDF Section Title Your title will appear at the top of the Zmodule. It does not have the be the title of the actual PDF itself.</Text>
      </Block>
      <Block style={{ margin: 10 }}>
        <Text
          style={styles.label}
          size={16}>ZModule Title</Text>
        <Input
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='infocirlceo' family='AntDesign' iconSize={18} iconColor={colors.primary}
        />
      </Block>
    </Block>
  }
  renderScreen1 = (title, index) => {
    const { embedType } = this.state;
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Image
          style={styles.avatar}
          source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>A PDF upload is a fantastic way to share resources, major releases, guidebooks, handouts, and more!</Text>
      </Block>
      <Block style={commonStyles.divider} />
      <Block style={{ margin: 10 }}>
        <Text
          style={styles.label}
          size={16}>PDF Title</Text>
        <Input
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='pdffile1' family='AntDesign' iconSize={18} iconColor={colors.primary}
          help="You must enter the PDF Title below that you would like to display to users. This can differ from the actual filename of the PDF or the section title of your PDF Embed Zmodule."
          bottomHelp
        />
      </Block>
      <Block style={{ margin: 10 }}>
        <Block style={commonStyles.divider} />
        <Text italic size={14} color={colors.primaryLight} style={{ flexShrink: 1 }}>You can easily upload a PDF file by either uploading the file from a compatible device, or by copying and pasting the full URL of your existing online PDF. You may only add 1 PDF to this PDF Embed Zmodule. You can click on the greyed out box to switch between the PDF upload and the direct link options depending on your preference.</Text>
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
            style={styles.inputBox} color={colors.primary} fontSize={18}
            icon='clouduploado' family='AntDesign' iconSize={18} iconColor={colors.primary}
            help="Upload a PDF from your device to embed the file in your Zcard."
            bottomHelp
            onPressIn={this.pick}
          />
        </Block>}
        {!embedType && <Block>
          <Text
            style={styles.label}
            size={16}>Input PDF URL</Text>
          <Input
            style={styles.inputBox} color={colors.primary} fontSize={18}
            icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
            help="You can use the field below to use a web URL for a PDF that is already on the internet.
          This is a great way to use our Media Center and share PDF embeds across the web."
            bottomHelp
          />
        </Block>}
      </Block>
    </Block>
  }
  renderScreen2 = (title, index) => {
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Image
          style={styles.avatar}
          source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>Write a description for your PDF to display underneath and let visitors know what they are looking at. A well written caption is a great way to improve your business' online exposure, with search engine optimization to boost your rankings throughout the internet.</Text>
      </Block>
      <Block style={commonStyles.divider} />
      <Block style={{ margin: 10 }}>
        <Text
          style={styles.label}
          size={16}>PDF Description</Text>
        <TextInput
          multiline
          numberOfLines={3}
          placeholder='Input Description...'
          onChangeText={(text_sectionDescription) => console.info(text_sectionDescription)}
          style={styles.description}>
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
    fetchProduct: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PDFEmbedScreen);

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
