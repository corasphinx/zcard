import React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import {
  Block,
  Button,
  Input,
  Text,
} from 'galio-framework';
import AwesomeLoading from 'react-native-awesome-loading';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Toast from 'react-native-toast-message';
import { colors, commonStyles } from '../../styles';

import {
  CallController,
  CallClassFunction
} from '../../redux/actions';
import { ScrollView } from 'react-native-gesture-handler';
import { hostname } from '../../constant';

const { width, height } = Dimensions.get('screen');

class ZModuleScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      searchText: '',
      products: [],
    }
  }

  componentDidMount = () => {
    const { selectedZCard } = this.props;
    this.props.fetchActiveCategoryProducts(
      'Products',
      'activeCategoryProducts',
      [8],
      (productIds) => {
        if (productIds)
          productIds.map(id =>
            this.props.fetchProduct(
              '/controllers/Chatter/App/fetchProduct.php',
              { id },
              (product) => {
                if (product.valid)
                  this.setState({
                    products: [...this.state.products, product]
                  })
              },
              (msg) => {
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: 'Error',
                  text2: msg + ' 😥'
                });
              },
              true
            )
          );
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
  }

  renderProducts = () => {
    const { products, searchText } = this.state;
    if (products)
      return products
        .filter(products => searchText == '' || products.product_name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 || products.product_desc.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
        .map((product, idx) =>
          <Collapse
            key={product.id}
            style={{ marginHorizontal: 10, marginVertical: 5 }}
          >
            <CollapseHeader>
              <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
                <Text size={18} bold color={colors.white}>{idx + 1}. {product.product_name}</Text>
                <Button
                  color={colors.blue}
                  icon='plussquareo' iconFamily='AntDesign' iconSize={18}
                  textStyle={{ fontSize: 18 }}
                  style={{ width: 100, height: 30, margin: 0 }}
                  onPress={() => this.props.navigation.navigate(product.product_name.replace(/\s/g, ''), { product })}
                > Add</Button>
                {/* 17 Screens
                  LeadForm // HTML Editor X
                  YouTubeEmbed
                  ZLiveSection
                  ZMarketSection
                  BusinessSearchModule
                  ShortURL  // incompleted  X
                  EmbedSection  // HTML Editor  [-_-]"
                  TwitterEmbed
                  InstagramEmbed
                  Ztext // skipped  X
                  FacebookEmbed
                  VideoEmbed
                  PDFEmbed
                  TextSection
                  ImageSection
                  HTMLSection
                  JobOpenings 
                  */}
              </Block>
            </CollapseHeader>
            <CollapseBody
              style={[commonStyles.shadow, commonStyles.collapseBody]}
            >
              {product.photo_src != null && <Block center>
                <Image
                  style={styles.image}
                  source={{ uri: hostname + product.photo_src }}
                />
              </Block>}
              <Text italic size={18} color={colors.primary}>{product.product_desc}</Text>
            </CollapseBody>
          </Collapse>
        );
  }

  render = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <AwesomeLoading indicatorId={7} size={80} isActive={this.state.loading} />
          <Block style={styles.container}>
            <Block style={[commonStyles.topBar, commonStyles.shadow, { backgroundColor: colors.background }]}>
              <Input
                placeholder='Search...'
                placeholderTextColor={colors.grey}
                icon='search1'
                family='AntDesign'
                color={colors.primary}
                iconSize={18}
                fontSize={18}
                iconColor={colors.primary}
                style={{ width: width - 20 }}
                onChangeText={(searchText) => this.setState({ searchText })}
              />
            </Block>
            <ScrollView style={{ marginBottom: 10 }}>
              {this.renderProducts()}
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
    selectedZCard: state.selectedZCard,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchActiveCategoryProducts: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    fetchProduct: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZModuleScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width,
    height,
  },
  image: {
    resizeMode: 'stretch',
    width: width - 40,
    height: width - 40,
    borderRadius: 8
  }
});
