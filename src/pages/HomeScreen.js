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
  Platform
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
import Toast from 'react-native-toast-message';
import HTMLView from 'react-native-htmlview';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { colors, commonStyles } from '../styles';
import DeleteModal from '../components/DeleteModal';

import {
  SignOut,
  CallClassFunction,
  CallController,
  SetSelectedZCard,
  CallZCardClassFunction,
} from '../redux/actions';

import { hostname } from '../constant';

const { width, height } = Dimensions.get('screen');

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      zcards: [],
      user_partner_profiles: [],
      totalZBucks: 0,
      isExpandedMyCards: false,
      isExpandedEnterpriseCards: false,
      isDeleteModal: false,
      selected_zcard_id: 0,
    }
  }

  gRefresh = false;
  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      if (gRefresh) this.initData();
    })
    this.initData();
    gRefresh = false;
    // Toast.show({
    //   type: 'info',
    //   position: 'top',
    //   text1: 'Information',
    //   text2: 'You have cards that are expiring soon below. Simply click "Renew" on the card you need to renew to either renew your existing card, or upgrade to a different card product 😊'
    // });
  }

  initData = () => {
    const { currentUser } = this.props;
    if (currentUser == null) this.props.signOut();
    this.setState({ zcards: [], loading: true });

    this.props.GetUserZCards(
      'ZCardList',
      'GetUserZCards',
      [currentUser.id],
      (zcardIds) => {
        Toast.show({
          type: 'info',
          position: 'top',
          text1: 'Information',
          text2: 'Please swipe to edit any ZCard. 😊'
        });
        if (zcardIds && zcardIds.length)
          zcardIds.map(zcard_id => {
            this.props.fetchZCardEntry(
              '/controllers/Chatter/App/fetchZCard.php',
              { zcard_id },
              (zcard) => {
                if (zcard.expiration_date != null) {
                  let today = new Date();
                  let expiration_date = new Date(zcard.expiration_date);
                  if (expiration_date - today < 5 * 1000 * 60 * 60 * 24)
                    zcard.expiration_date = 'Renew';
                } else {
                  zcard.expiration_date = 'No expiration date.';
                };
                this.props.fetchProduct(
                  '/controllers/Chatter/App/fetchProduct.php',
                  { id: zcard.product_id },
                  (ProductInfo) => {
                    zcard.ProductInfo = ProductInfo;

                    this.props.zcard_zmodule_total_monthly(
                      zcard.id,
                      'zcard_zmodule_total_monthly',
                      [],
                      (zcard_zmodule_monthly_cost) => {
                        if (ProductInfo.cost_per_term <= 0) {
                          if (zcard_zmodule_monthly_cost > 0) {
                            zcard.ProductInfo.cost_term_text = "$" + zcard_zmodule_monthly_cost + "/ 30 Days";
                          } else {
                            zcard.ProductInfo.cost_term_text = ProductInfo.cost_term_text;
                          }
                        } else {
                          zcard.ProductInfo.cost_term_text = ProductInfo.cost_term_text;
                        }
                        this.setState({ zcards: [...this.state.zcards, zcard] });
                        if (zcardIds.length == this.state.zcards.length) this.setState({ loading: false });
                      },
                      (msg) => { this.setState({ zcards: [...this.state.zcards, zcard] }); }
                    );
                  },
                  (msg) => { this.setState({ zcards: [...this.state.zcards, zcard] }); },
                  true,
                );

              },
              (msg) => {
                this.setState({ loading: false });
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: 'Error',
                  text2: msg + ' 😥'
                });
              },
              true
            );
          });
        else
          this.setState({ loading: false });
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

    this.props.listPartnerProfilesByAccount(
      'Partner',
      'listPartnerProfilesByAccount',
      [currentUser.id],
      (user_partner_profiles) => { this.setState({ user_partner_profiles: user_partner_profiles }); },
      (msg) => {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );

    if (currentUser.share_referral_hash != null)
      this.props.actualTotalZBucks(
        'Account',
        'actualTotalZBucks',
        [],
        (totalZBucks) => {
          this.timerId = setInterval(()=>{
            if(this.state.totalZBucks >= totalZBucks){
              clearInterval(this.timerId);
              this.setState({totalZBucks});
            }else{
              this.setState({totalZBucks : this.state.totalZBucks + 10});
            }
          }, 20);
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
    this.props.getZCardCountExpiringSoon(
      'Account',
      'getZCardCountExpiringSoon',
      [],
      (expiringCount) => {
      },
      (msg) => {
        if (msg != undefined)
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: msg + ' 😥'
          });
      }
    );
  }

  componentWillUnmount = () => {
    this.props.signOut();
  }

  millisecondsToStr = (milliseconds) => {
    var date = new Date(milliseconds * 1000);
    return date.toDateString();
  }

  renderSlogan = () => {
    const { share_referral_hash } = this.props.currentUser;
    const { totalZBucks } = this.state;

    if (share_referral_hash == null)
      return <Block style={[styles.card, commonStyles.shadow]}>
        <Text bold size={20} color={colors.primary}>Afilliates :</Text>
        <Text color={colors.primary}>Refer friends and earn residual income.</Text>
        <Text color={colors.primary}>Join the Zcard pro referral program and earn income from people you refer, and the people THEY refer!</Text>
        <Block style={{ alignItems: 'flex-end' }}>
          <Button
            color={colors.purple}
            icon='handshake-o' iconFamily='Font-Awesome' iconSize={18}
            textStyle={{ fontSize: 18 }}
            onPress={() => this.props.navigation.navigate('CharterPricing')}
          > Join Program</Button>
        </Block>
      </Block>
    else
      return <Block style={[styles.card, commonStyles.shadow]}>
        <Text bold size={20} color={colors.primary}>Need to grab a new card?</Text>
        <Text color={colors.primary}>Create a card for your wedding, birthday party, and so much more. Need to create an RSVP card, maybe an announcement? We got your back.</Text>
        <Block row style={styles.cardline}>
          <Icon size={22} name='money' family='Font-Awesome' color={colors.white} />
          <Text size={16} color={colors.white} > Zbuck Wallet:</Text>
          <Text bold italic size={20} color={colors.pink}> ${totalZBucks}</Text>
        </Block>
        <Block style={{ alignItems: 'flex-end' }}>
          <Button
            color={colors.green}
            icon='plussquareo' iconFamily='AntDesign' iconSize={18}
            textStyle={{ fontSize: 18 }}
            onPress={() => this.props.navigation.navigate('CharterPricing')}
          > Create Free ZCard</Button>
        </Block>
      </Block>
  }

  editZcard = (zcard) => {
    this.props.setSelectedZCard(zcard);
    this.props.navigation.navigate('EditCard', { zcard });
  }

  deleteCard = () => {
    const { selected_zcard_id, zcards } = this.state;
    this.setState({ isDeleteModal: false });

    this.props.deleteCard(
      '/controllers/Zcard/delete-zcard.php',
      {
        zcard_id: selected_zcard_id
      },
      (msg) => {
        let newZCards = zcards.filter(zcard => zcard.id != selected_zcard_id);
        this.setState({ zcards: newZCards });

        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: msg + ' 🎊'
        });
      },
      (msg) => {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    )
  }

  renderMyCards = () => {
    const { zcards, isExpandedMyCards } = this.state;

    return <Collapse
      isExpanded={isExpandedMyCards}
      onToggle={(isExpandedMyCards) => this.setState({ isExpandedMyCards })}
      style={{ marginHorizontal: 10 }}
    >
      <CollapseHeader>
        <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
          <Text size={18} bold color={colors.white}>My ZCards ({zcards ? zcards.length : 0})</Text>
          {isExpandedMyCards && <Icon name='down' family='AntDesign' size={18} color={colors.white} />}
          {!isExpandedMyCards && <Icon name='left' family='AntDesign' size={18} color={colors.white} />}
        </Block>
      </CollapseHeader>
      <CollapseBody>
        <SwipeListView
          disableRightSwipe
          data={zcards}
          renderItem={(data, rowMap) => (
            <TouchableOpacity style={commonStyles.listRow} key={data.item.id}
              activeOpacity={1.0}
              onPress={() => alert('zcard#' + data.item.id)}
            >
              <Block row style={{ width: 100 + '%' }}>
                <Block center>
                  <Text bold size={22} color={colors.primary}>{data.item.id} </Text>
                </Block>
                <Block>
                  <Text bold size={18} color={colors.primary}> {data.item.zc_name}</Text>
                  {data.item.expiration_date == 'Renew' &&
                    <TouchableOpacity onPress={() => alert('upgrade.php page is comming')}>
                      <Text bold italic size={18} color={colors.purple}> {data.item.expiration_date}</Text>
                    </TouchableOpacity>
                  }
                  {data.item.expiration_date != 'Renew' && <Text italic size={16} color={colors.primaryLight}> {data.item.expiration_date}</Text>}
                </Block>
                {(data.item.ProductInfo != null || data.item.ProductInfo != undefined) && <Block flex style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                  <HTMLView
                    value={data.item.ProductInfo.cost_term_text}
                  />
                </Block>}
              </Block>
            </TouchableOpacity>
          )}
          renderHiddenItem={(data, rowMap) => (
            <Block style={commonStyles.listRowBack} flex>
              <Block row>
                <TouchableOpacity onPress={() => this.editZcard(data.item)}>
                  <Block style={{ height: '100%', width: 75, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="edit" family="entypo" color={colors.white} size={15} />
                    <Text size={15} color={colors.white}>Edit</Text>
                  </Block>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ isDeleteModal: true, selected_zcard_id: data.item.id })}>
                  <Block style={{ height: '100%', width: 75, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="delete" family="antdesign" color={colors.white} size={15} />
                    <Text size={15} color={colors.white}>Delete</Text>
                  </Block>
                </TouchableOpacity>
              </Block>
            </Block>
          )}
          leftOpenValue={75}
          rightOpenValue={-155}
        />
      </CollapseBody>
    </Collapse>
  }

  renderEnterpriseCards = () => {
    const { user_partner_profiles, isExpandedEnterpriseCards } = this.state;

    return <Collapse
      isExpanded={isExpandedEnterpriseCards}
      onToggle={(isExpandedEnterpriseCards) => this.setState({ isExpandedEnterpriseCards })}
      style={{ marginHorizontal: 10 }}
    >
      <CollapseHeader>
        <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
          <Text size={18} bold color={colors.white}>My Enterprise ZCards ({user_partner_profiles ? user_partner_profiles.length : 0})</Text>
          {isExpandedEnterpriseCards && <Icon name='down' family='AntDesign' size={18} color={colors.white} />}
          {!isExpandedEnterpriseCards && <Icon name='left' family='AntDesign' size={18} color={colors.white} />}
        </Block>
      </CollapseHeader>
      <CollapseBody>
        <SwipeListView
          disableRightSwipe
          data={user_partner_profiles}
          renderItem={(data, rowMap) => (
            <TouchableOpacity style={commonStyles.listRow} key={data.item.id}
              activeOpacity={1.0}
              onPress={() => alert('zcard#' + data.item.id)}
            >
              <Block row style={{ width: 100 + '%' }}>
                <Block center>
                  <Text bold size={22} color={colors.primary}>{data.item.id} </Text>
                </Block>
                <Block>
                  <Text bold size={18} color={colors.primary}> {data.item._name}</Text>
                  <Text italic size={16} color={colors.primaryLight}> {this.millisecondsToStr(data.item._created_time)}</Text>
                </Block>
                <Block flex style={{ alignItems: 'flex-end' }}>
                  <Text size={16} color={colors.primary} > {data.item.partner_name}</Text>
                  <Text size={16} color={colors.primary} > ${data.item._card_cost} / Year</Text>
                </Block>
              </Block>
            </TouchableOpacity>
          )}
          renderHiddenItem={(data, rowMap) => (
            <Block style={commonStyles.listRowBack} flex>
              <Block row>
                <TouchableOpacity onPress={() => alert('partner-zcards.php page is comming')}>
                  <Block style={{ height: '100%', width: 75, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="trash" family="entypo" color={colors.white} size={15} />
                    <Text size={15} color={colors.white}>Edit</Text>
                  </Block>
                </TouchableOpacity>
              </Block>
            </Block>
          )}
          leftOpenValue={75}
          rightOpenValue={-80}
        />
      </CollapseBody>
    </Collapse>
  }

  renderActiveCard = () => {
    return <Block style={[styles.card, commonStyles.shadow]}>
      <Text bold size={20} color={colors.primary}>Uh-Oh, It looks like you don't have any Zcards in your account right now.</Text>
      <Block style={{ alignItems: 'flex-end' }}>
        <Button
          color={colors.pink}
          textStyle={{ fontSize: 18 }}
          style={{ width: 250 }}
          onPress={() => this.props.navigation.navigate('CharterPricing')}
        > Activate your Zcard Now</Button>
      </Block>
    </Block>
  }

  render = () => {
    const { zcards, user_partner_profiles, loading, isDeleteModal } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Block style={styles.container}>
            <ScrollView nestedScrollEnabled={true}>
              {this.renderSlogan()}
              {loading && <ActivityIndicator size="large" color="green" animating={loading} />}
              {zcards.length == 0 && !loading && this.renderActiveCard()}
              {zcards.length > 0 && !loading && this.renderMyCards()}
              {user_partner_profiles.length > 0 && !loading && this.renderEnterpriseCards()}
              <DeleteModal
                isVisible={isDeleteModal}
                label='Are you sure you want to remove this Zcard? You cannot recover a deleted Zcard or any related media, files, or other content.'
                onBackdropPress={() => this.setState({ isDeleteModal: false })}
                onCancel={() => this.setState({ isDeleteModal: false })}
                onDelete={this.deleteCard}
              />
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
    signOut: () => SignOut(),
    GetUserZCards: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    listPartnerProfilesByAccount: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    fetchZCardEntry: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    fetchProduct: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    actualTotalZBucks: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    getZCardCountExpiringSoon: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    setSelectedZCard: (zcard) => SetSelectedZCard(dispatch, zcard),
    zcard_zmodule_total_monthly: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    deleteCard: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    width,
    height,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    backgroundColor: colors.yellow,
    margin: 10
  },
  cardline: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.darkGray,
    marginTop: 5
  },
});
