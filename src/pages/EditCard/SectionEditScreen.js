import React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Block,
  Button,
  Text,
  Input
} from 'galio-framework';
import AwesomeLoading from 'react-native-awesome-loading';
import Toast from 'react-native-toast-message';
import { DraxProvider, DraxList, DraxViewDragStatus } from 'react-native-drax';
import { colors, commonStyles } from '../../styles';

import {
  CallZCardClassFunction,
} from '../../redux/actions';

const { width, height } = Dimensions.get('screen');

class SectionEditScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      alphaData: [],
    }
  }

  componentDidMount = () => {
    this.setState({ alphaData: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') });
    const { selectedZCard } = this.props;

    this.props.getAllSectionEditHTML(
      selectedZCard.id,
      'getAllSectionEditHTML',
      [true],
      (allSectionEditHTML) => {
        // console.info(allSectionEditHTML)
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

  getBackgroundColor = (alphaIndex) => {
    switch (alphaIndex % 6) {
      case 0:
        return '#ffaaaa';
      case 1:
        return '#aaffaa';
      case 2:
        return '#aaaaff';
      case 3:
        return '#ffffaa';
      case 4:
        return '#ffaaff';
      case 5:
        return '#aaffff';
      default:
        return '#aaaaaa';
    }
  };

  getHeight = (alphaIndex) => {
    let height = 50;
    if (alphaIndex % 2 === 0) {
      height += 10;
    }
    if (alphaIndex % 3 === 0) {
      height += 20;
    }
    return height;
  };

  getItemStyleTweaks = (alphaItem) => {
    const { alphaData } = this.state;
    const alphaIndex = alphaData.indexOf(alphaItem);
    return {
      backgroundColor: this.getBackgroundColor(alphaIndex),
      height: this.getHeight(alphaIndex),
    };
  };

  render = () => {
    const { alphaData } = this.state;
    return (
      <DraxProvider>
        <SafeAreaView
          edges={['top', 'left', 'right']}
          style={styles.container}
        >
          <DraxList
            data={alphaData}
            renderItemContent={({ item }, { viewState, hover }) => (
              <Block
                style={[
                  styles.alphaItem,
                  this.getItemStyleTweaks(item),
                  (viewState?.dragStatus === DraxViewDragStatus.Dragging && hover)
                    ? styles.hover
                    : undefined,
                ]}
              >
                <Text style={styles.alphaText}>{item}</Text>
              </Block>
            )}
            onItemDragStart={({ index, item }) => {
              console.log(`Item #${index} (${item}) drag start`);
            }}
            onItemDragPositionChange={({
              index,
              item,
              toIndex,
              previousIndex,
            }) => {
              console.log(`Item #${index} (${item}) dragged to index ${toIndex} (previous: ${previousIndex})`);
            }}
            onItemDragEnd={({
              index,
              item,
              toIndex,
              toItem,
            }) => {
              console.log(`Item #${index} (${item}) drag ended at index ${toIndex} (${toItem})`);
            }}
            onItemReorder={({
              fromIndex,
              fromItem,
              toIndex,
              toItem,
            }) => {
              console.log(`Item dragged from index ${fromIndex} (${fromItem}) to index ${toIndex} (${toItem})`);
              const newData = alphaData.slice();
              newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
              this.setState({ alphaData: newData });
            }}
            keyExtractor={(item) => item}
            ListHeaderComponent={() => (
              <Block style={styles.header}>
                <Text style={styles.headerText}>
                  Long-press any list item to drag it to a new position.
                  Dragging an item over the top or bottom edge of the container
                  will automatically scroll the list. Swiping up or down
                  without the initial long-press will scroll the list normally.
                </Text>
              </Block>
            )}
          />
        </SafeAreaView>
      </DraxProvider>
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
    getAllSectionEditHTML: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionEditScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  alphaItem: {
    backgroundColor: '#aaaaff',
    borderRadius: 8,
    margin: 4,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alphaText: {
    fontSize: 28,
  },
  hover: {
    borderColor: 'blue',
    borderWidth: 2,
  },
});
