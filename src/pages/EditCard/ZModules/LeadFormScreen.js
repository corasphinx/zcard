import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, SafeAreaView, StyleSheet, Dimensions, Platform, Image } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Block, Text, Input, Button, Checkbox, Radio } from 'galio-framework';
import { colors, commonStyles } from '../../../styles';
import { hostname } from '../../../constant';
import HTMLEditor from '../../../components/HTMLEditor';
const { width, height } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * width) / 100;
  return Math.round(value);
}

const ENTRIES = [
  {
    index: 0,
    title: 'Form Name'
  },
  {
    index: 1,
    title: 'Main Settings'
  },
  {
    index: 2,
    title: 'Content & Media'
  },
  {
    index: 3,
    title: 'Design'
  },
  {
    index: 4,
    title: 'Leads'
  },
]
export default class example extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderActiveSlide: 0
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
      case 3:
        return this.renderScreen3(item.title, index);
      case 4:
        return this.renderScreen4(item.title, index);
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
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}> A lead form is a perfect way to collect information about your visitors!</Text>
      </Block>
      <Block style={{ margin: 10 }}>
        <Text
          style={styles.label}
          size={16}>Form Name</Text>
        <Input
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='infocirlceo' family='AntDesign' iconSize={18} iconColor={colors.primary}
        />
      </Block>
    </Block>
  }
  renderScreen1 = (title, index) => {
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Image
          style={styles.avatar}
          source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}> Your lead capture form can accept various types of inormation. Please choose what fields you would like to request from the visitor. All fields presented to the user are required to be filled out by default.</Text>
      </Block>
      <Block style={commonStyles.divider} />
      <Text bold size={18} color={colors.primary}>What information would you like to request?</Text>
      <Text italic size={16} color={colors.primaryLight} style={{ marginBottom: 10 }}>Please select which fields should be requested from the user. For example, you can ask for all fields or just 1. You cannot use the lead form without asking for at least one piece of information.</Text>
      <Checkbox color={colors.primary} label='Name' style={{ paddingBottom: 5 }} onChange={(value) => console.info(value)} />
      <Checkbox color={colors.primary} label='Email Address' style={{ paddingBottom: 5 }} onChange={(value) => console.info(value)} />
      <Checkbox color={colors.primary} label='Phone Number' style={{ paddingBottom: 5 }} onChange={(value) => console.info(value)} />
      <Block style={commonStyles.divider} />
      <Text bold size={18} color={colors.primary}>Require Form Submission</Text>
      <Text italic size={16} color={colors.primaryLight} style={{ marginBottom: 10 }}>If you would like, you can require visitors to enter their information in your lead capture form before they can access the rest of your content.</Text>
      <Radio color={colors.primary} radioOuterStyle={{ marginBottom: 5 }} label='Required Form Submission' initialValue={false} />
      <Radio color={colors.primary} label='Optional Form Submission' />
      <Block style={commonStyles.divider} />
      <Text bold size={18} color={colors.primary}>Call to Action</Text>
      <Text italic size={16} color={colors.primaryLight} style={{ marginBottom: 10 }}>Your lead form can pop up in a modal for the visitor to provide their basic information. Alternatively, you can display your lead form as a normal section without the pop up effect.</Text>
      <Radio color={colors.primary} radioOuterStyle={{ marginBottom: 5 }} label='Pop up Lead Form' initialValue={false} />
      <Radio color={colors.primary} label='Default Section Display' />
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
      </Block>
      <Text italic size={16} color={colors.primaryLight} style={{ marginBottom: 10 }}>The lead capture form can be complimented by a text description (formatted how you wish) which is displayed below a video or image.</Text>
      <Block style={commonStyles.divider} />
      <Text bold size={18} color={colors.primary}>Would you like to embed a video or image?</Text>
      <Radio color={colors.primary} radioOuterStyle={{ marginBottom: 5 }} label='Video Embed' initialValue={false} />
      <Radio color={colors.primary} radioOuterStyle={{ marginBottom: 5 }} label='Image Banner' initialValue={false} />
      <Radio color={colors.primary} label='No Media' />
      {/* <HTMLEditor
        // initHTML={initHTML}
        onEdit={(html) => console.info(html)}
      /> */}
    </Block>
  }
  renderScreen3 = (title, index) => {
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
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
          onPressIn={() => this.props.navigation.navigate('ColorPicker', {
            pickColor: (color) => console.info(color)
          })}
        />
      </Block>
      <Block>
        <Text
          style={styles.label}
          size={16}>Section's Font Color</Text>
        <Input
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
          onPressIn={() => this.props.navigation.navigate('ColorPicker', {
            pickColor: (color) => console.info(color)
          })}
        />
      </Block>
      <Block style={[commonStyles.card, { height: 100 }]}>
        <Text size={22} color={colors.primary} style={{ alignSelf: 'center', marginTop: 30 }}>Preview Section</Text>
      </Block>
    </Block>
  }
  renderScreen4 = (title, index) => {
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Text size={18} color={colors.primary}>Your form has generated 0 leads so far.</Text>
      <Block style={{alignItems:'flex-end', justifyContent:'flex-end', height:height-wp(60)}}>
      <Button
        color={colors.green}
        icon='save' iconFamily='AntDesign' iconSize={18}
        textStyle={{ fontSize: 18 }}
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
