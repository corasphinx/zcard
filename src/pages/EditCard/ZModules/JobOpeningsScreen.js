import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, ScrollView, SafeAreaView, StyleSheet, Dimensions, Platform, Image, TextInput, TouchableOpacity } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Block, Text, Input, Button, Checkbox, Radio } from 'galio-framework';
import Toast from 'react-native-toast-message';
import { colors, commonStyles } from '../../../styles';
import { hostname } from '../../../constant';
import MyPagination from '../../../components/Pagination';
import {
  CallController
} from '../../../redux/actions';
const { width, height } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * width) / 100;
  return Math.round(value);
}
const PAGE_SIZE = 3;
const ENTRIES = [
  {
    index: 0,
    title: 'ZModule Title'
  },
  {
    index: 1,
    title: 'Set Group'
  },
  {
    index: 2,
    title: 'Color Settings'
  }
]
class JobOpeningsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderActiveSlide: 0,
      saving: false,
      section_title: '',
      selectedGroup: null,
      tab_color: colors.default_module_tab_color,
      tab_font_color: colors.default_module_tab_font_color,
      ZGroups: [],
      pageLength: 0,
      searchText: '',
      searching: false,
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
    const { section_title, selectedGroup } = this.state;
    if (section_title == '') return 'You must supply a Zmodule Title to save!';
    if (selectedGroup == null) return 'You must select a ZGroup to save!';
    return '';
  }

  save = () => {
    this.setState({ saving: true });
    const { selectedZCard } = this.props;
    const { product } = this.props.route.params;
    const { section_title, selectedGroup, tab_color, tab_font_color } = this.state;

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
            // save Group
            this.props.callController(
              `/zmodule_files/${identifier}/controllers/${page}.php`,
              {
                zcard: zcard,
                section: section,
                zmodule_identifier: identifier,
                group_id: selectedGroup.id
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

  search_zgroups = (searchText, offset) => {
    this.setState({ searching: true });
    if (searchText == '') {
      this.setState({
        ZGroups: [],
        pageLength: 0,
        searching: false,
        selectedGroup: null
      });
    } else {
      this.props.callController(
        '/controllers/Search/search_zgroups.php',
        {
          search_text: searchText,
          offset: offset,
          limit: 3,
          pagination: true,
        },
        (data) => {
          this.setState({
            ZGroups: data.results,
            pageLength: Math.ceil(data.total_count / PAGE_SIZE),
            searching: false
          });
        },
        (msg) => {
          this.setState({ searching: false });
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'No result 😥'
          });
        },
        true
      );
    }
  }
  renderZGroups = () => {
    const { ZGroups } = this.state;
    if (ZGroups.length == 0) return;
    return ZGroups.map(ZGroup => <TouchableOpacity onPress={() => this.setState({ selectedGroup: ZGroup })} key={ZGroup.id}>
      <Block style={[commonStyles.Card, { marginBottom: 10 }]}>
        <Text bold size={18} color={colors.primary}>{ZGroup.gname}</Text>
        {ZGroup.image_src && <Image
          style={styles.image}
          source={{ uri: hostname + ZGroup.image_src }}
        />}
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>{ZGroup.gdescription}</Text>
      </Block>
    </TouchableOpacity>
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
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>Job Opening ZModule is a fantastic way to find your job positions. Please choose the title of your Zmodule below!</Text>
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
    const { pageLength, searchText, searching, selectedGroup } = this.state;
    return <Block style={[commonStyles.Card, { minHeight: height - 130 }]}>
      <Text h6 color={colors.primary}>{index + 1}. {title}</Text>
      <Block style={commonStyles.divider} />
      <Block>
        <Image
          style={styles.avatar}
          source={{ uri: hostname + '/dashboard/assets/images/zortt-shield-icon-75x75.png' }} />
        <Text italic size={16} color={colors.primaryLight} style={{ flexShrink: 1 }}>You can specify Group for Jobs.</Text>
      </Block>
      <Block style={commonStyles.divider} />
      <Block style={{ margin: 10 }}>
        {selectedGroup == null && <Text
          style={styles.label}
          size={16}>Select Group</Text>}
        {selectedGroup != null && <Text
          style={[styles.label, { color: colors.primary }]}
          size={16}>Selected: {selectedGroup.gname}</Text>}
        <Block row>
          <Input
            placeholder='Search...'
            placeholderTextColor={colors.grey}
            icon='search1'
            family='AntDesign'
            color={colors.primary}
            iconSize={18}
            fontSize={18}
            style={{ width: wp(55) }}
            iconColor={colors.primary}
            onChangeText={(searchText) => this.setState({ searchText })}
          />
          <Button
            color={colors.green}
            textStyle={{ fontSize: 18 }}
            style={{ width: wp(20) }}
            loading={searching}
            onPress={() => this.search_zgroups(searchText, 0)}
          > Search</Button>
        </Block>
        {this.renderZGroups()}
        {pageLength > 0 && <MyPagination
          width={wp(80)}
          length={pageLength}
          onScrollTo={(selectedPage) => { this.search_zgroups(searchText, selectedPage) }}
        />
        }
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
)(JobOpeningsScreen);

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
  image: {
    width: wp(70),
    height: wp(40),
    resizeMode: 'stretch',
    alignSelf: 'center'
  }
});
