import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, KeyboardAvoidingView, Linking, Animated, Platform, TextInput } from 'react-native';
import {
  Block,
  Button,
  Text,
  Icon,
  Input,
  Checkbox,
  theme,
} from 'galio-framework';
import AwesomeLoading from 'react-native-awesome-loading';
import Toast from 'react-native-toast-message';
import { colors, commonStyles, fonts } from '../styles';
import { hostname } from '../constant';
import {
  CallZCardClassFunction,
  CallClassFunction,
  CallController,
  GetZCardComments,
  IncreaseVisitor
} from '../redux/actions';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');
function wp(percentage) {
  const value = (percentage * width) / 100;
  return Math.round(value);
}

class ZCardScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      front_card_photo: '',
      back_card_photo: '',
      footer_photo: '',
      visitorsCount: 0,
      ZcardAccount: null,
      comment: '',
      comments: [],
      submitting: false,
    }
  }

  componentDidMount = () => {
    const { ZCard } = this.props.route.params;
    if (ZCard == null || ZCard == undefined) this.props.navigation.goBack();

    // increase Visitor
    this.props.increaseVisitor(ZCard.id);

    // fetch back card photo
    this.props.callZCardClassFunction(
      ZCard.id,
      'getPhotoByFriendlyID',
      ['back_card_photo'],
      (back_card_photo) => {
        this.setState({ loading: false });
        this.setState({ back_card_photo: back_card_photo });
      },
      (msg) => {
        this.setState({ loading: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );

    // fetch front card photo
    this.props.callZCardClassFunction(
      ZCard.id,
      'getPhotoByFriendlyID',
      ['front_card_photo'],
      (front_card_photo) => {
        this.setState({ loading: false });
        this.setState({ front_card_photo: front_card_photo });
      },
      (msg) => {
        this.setState({ loading: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );

    // fetch footer photo
    this.props.callZCardClassFunction(
      ZCard.id,
      'getPhotoByFriendlyID',
      ['footer_photo'],
      (footer_photo) => {
        this.setState({ loading: false });
        this.setState({ footer_photo: footer_photo });
      },
      (msg) => {
        this.setState({ loading: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );

    // fetch visitor's count
    if (ZCard.theme_id != 3)
      this.props.callClassFunction(
        'Log',
        'logsByZcardID',
        [ZCard.id],
        (visitors) => {

          this.timerId = setInterval(() => {
            if (this.state.visitorsCount >= visitors.length) {
              clearInterval(this.timerId);
              this.setState({ visitorsCount: visitors.length });
            } else {
              this.setState({ visitorsCount: this.state.visitorsCount + 5 });
            }
          }, 20);

        },
        (msg) => {
          this.setState({ loading: false });
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: msg + ' 😥'
          });
        }
      );

    // fetch ZcardAccount
    this.props.callZCardClassFunction(
      ZCard.id,
      'getAccount',
      [],
      (ZcardAccount) => { this.setState({ ZcardAccount }) },
      (msg) => {
        this.setState({ loading: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );

    // fetch comments
    this.fetchComments();
  }

  fetchComments = () => {
    const { ZCard } = this.props.route.params;
    this.props.getZCardComments(
      `/controllers/Zcard/get_comments.php?zcard_id=${ZCard.id}`,
      (comments) => {
        this.setState({ comments })
      },
      (msg) => {
        this.setState({ loading: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );
  }

  submitComment = () => {
    const { comment } = this.state;
    const { ZCard } = this.props.route.params;
    if (comment == '') {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: 'Validation',
        text2: 'Please input comment. 😥'
      });
      return;
    }

    this.setState({ submitting: true });
    this.props.callController(
      `/controllers/Zcard/comment_card.php?id=${ZCard.id}`,
      {
        message: comment
      },
      (msg) => {
        this.setState({ submitting: false, comment: '' });
        this.fetchComments();
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: msg + ' 🎊'
        });
      },
      (msg) => {
        this.setState({ submitting: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );
  }

  renderComments = (comments) => {
    if (comments.length) {
      return comments.map(comment =>
        <Block style={[commonStyles.card, { padding: 5 }, comment.replies == undefined ? { backgroundColor: colors.background } : { backgroundColor: colors.backgroundLight }]}>
          <Block row style={{ alignItems: 'center' }}>
            <Image
              style={styles.avatar}
              source={{ uri: comment.avatar_path }} />
            <Block>
              <Block row>
                <Text bold size={16} color={colors.primary}>{comment.acc_name} </Text>
                {comment.is_card_owner == true && <Block style={commonStyles.badge}>
                  <Text size={14} color={colors.white}>Card Owner</Text>
                </Block>}
              </Block>
              <Block row space='around'>
                <Text italic size={14} color={colors.primaryLight} style={{ flexShrink: 1, maxWidth: wp(45) }}>{comment.content}</Text>
                <Button
                  color={colors.primary}
                  icon='reply' iconFamily='Entypo' iconSize={16}
                  textStyle={{ fontSize: 15 }}
                  style={{ width: 90, height: 25 }}
                  onPress={this.replyComment}
                > Reply</Button>
              </Block>
            </Block>
          </Block>
          {comment.replies && comment.replies.length > 0 && this.renderComments(comment.replies)}
        </Block>
      )
    }
  }

  renderCommentSection = () => {
    const { ZCard } = this.props.route.params;
    const { comment, submitting, comments } = this.state;
    if (ZCard.enable_commenting == 1 && ZCard.section_comments == 0) {
      return <Block style={[commonStyles.Card, { margin: 10 }]}>
        <TextInput
          multiline
          numberOfLines={3}
          placeholder='Leave your comment...'
          onChangeText={(comment) => this.setState({ comment })}
          style={styles.description}>{comment}
        </TextInput>
        <Button
          color={colors.primary}
          icon='paper-plane' iconFamily='Entypo' iconSize={18}
          textStyle={{ fontSize: 18 }}
          style={{ alignSelf: 'flex-end' }}
          loading={submitting}
          onPress={this.submitComment}
        > Submit</Button>
        {this.renderComments(comments)}
      </Block>
    }

  }

  render() {
    const { ZCard } = this.props.route.params;
    const { front_card_photo, back_card_photo, footer_photo, visitorsCount, ZcardAccount } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <AwesomeLoading indicatorId={7} size={80} isActive={this.state.loading} />
          <Block style={styles.container}>
            <ScrollView>
              {front_card_photo != '' && <Block style={[commonStyles.Card, { margin: 10, padding: 0 }]}>
                <Image
                  style={styles.image}
                  source={{ uri: front_card_photo }}
                />
              </Block>}
              {back_card_photo != '' && <Block style={[commonStyles.Card, { margin: 10, padding: 0 }]}>
                <Image
                  style={styles.image}
                  source={{ uri: back_card_photo }}
                />
              </Block>}
              {(ZCard.theme_id == 1 || ZCard.theme_id == 2) && <Block style={[commonStyles.Card, { margin: 10 }]}>
                {ZCard.first_name != '' && ZCard.last_name != '' && <Block row>
                  <Text bold size={18} color={colors.primary}>Full Name: </Text>
                  <Text size={18} color={colors.primary}>{ZCard.first_name} {ZCard.last_name}</Text>
                </Block>}
                {ZCard.visible_address_location != '' && <Block row>
                  <Text bold size={18} color={colors.primary}>Location: </Text>
                  <Text size={18} color={colors.primary}>{ZCard.visible_address_location}</Text>
                </Block>}
                {ZCard.zc_email != '' && <Block row>
                  <Text bold size={18} color={colors.primary}>Email: </Text>
                  <TouchableOpacity onPress={() => Linking.openURL(`mailto:${ZCard.zc_email}`)}>
                    <Text size={18} color={colors.blue} style={commonStyles.underline}>{ZCard.zc_email}</Text>
                  </TouchableOpacity>
                </Block>}
                {ZCard.zc_phone != '' && <Block row>
                  <Text bold size={18} color={colors.primary}>Phone: </Text>
                  <TouchableOpacity onPress={() => Linking.openURL(`tel:${ZCard.zc_phone}`)}>
                    <Text size={18} color={colors.blue} style={commonStyles.underline}>{ZCard.zc_phone}</Text>
                  </TouchableOpacity>
                </Block>}
                {ZCard.zc_desc != '' && <Block>
                  <Text bold size={18} color={colors.primary}>Description: </Text>
                  <Text size={18} color={colors.primary} style={{ flexShrink: 1 }}>{ZCard.zc_desc}</Text>
                </Block>}
              </Block>}
              {ZCard.theme_id != 3 && <Block row style={[commonStyles.Card, { margin: 10 }]}>
                <Text bold size={18} color={colors.primary}>Visitors: </Text>
                <Text size={18} color={colors.primary}>{visitorsCount}</Text>
              </Block>}

              <Block style={[commonStyles.Card, { margin: 10 }]}>
                <Text size={18} color={colors.primary}>Share this awesome ZCard: </Text>
                <Block style={commonStyles.divider} />
                <Block row space='around'>
                  <Button
                    onlyIcon
                    color={colors.blue}
                    icon='twitter' iconFamily='AntDesign' iconSize={20}
                    onPress={() => Linking.openURL(`http://twitter.com/share?url=${hostname}/zcard/?id=${ZCard.id}&text=${ZCard.zc_name}&via=zcard.pro`)}
                  />
                  <Button
                    onlyIcon
                    color={colors.blue}
                    icon='wechat' iconFamily='AntDesign' iconSize={20}
                    onPress={() => alert('message modal is comming soon...')}
                  />
                  <Button
                    onlyIcon
                    color={colors.blue}
                    icon='mail' iconFamily='AntDesign' iconSize={20}
                    onPress={() => Linking.openURL(`mailto:?subject=Check out my Zcard pro&body=Check out this awesome zcard at ${hostname}/?id=${ZCard.id} ${ZCard.zc_name}`)}
                  />
                </Block>
              </Block>
              {ZCard.enable_zcard_promo_banner == 1 && <Block row style={[commonStyles.Card, { margin: 10, padding: 0 }]}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(
                    ZcardAccount.share_referral_hash
                      ?
                      `${hostname}/?ref={${ZcardAccount.share_referral_hash}}` :
                      `${hostname}/dashboard/pay.php?products=[1]&new`
                  )}
                >
                  <Image
                    style={styles.image}
                    source={{ uri: `${hostname}/zcard/images/zcard-3.0-banner.png` }}
                  />
                </TouchableOpacity>
              </Block>
              }

              {this.renderCommentSection()}

              {footer_photo != '' && <Block style={[commonStyles.Card, { margin: 10, padding: 0 }]}>
                <Image
                  style={styles.image}
                  source={{ uri: footer_photo }}
                />
              </Block>}
            </ScrollView>
          </Block>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
      </KeyboardAvoidingView >
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
    callZCardClassFunction: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    callClassFunction: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    callController: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    increaseVisitor: (zcard_id) => IncreaseVisitor(zcard_id),
    getZCardComments: (controller, successcb, errorcb) => GetZCardComments(controller, successcb, errorcb),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZCardScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: 10,
    // paddingVertical: 10,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'stretch',
    width: width - 20,
    height: width - 20,
    borderRadius: 8
  },
  description: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.border,
    fontSize: 18,
    backgroundColor: colors.backgroundLight,
    color: colors.primary,
  },
  avatar: {
    resizeMode: 'stretch',
    width: wp(12),
    height: wp(12),
    borderRadius: wp(80),
    alignSelf: 'center',
    marginRight: 10
  },
});
