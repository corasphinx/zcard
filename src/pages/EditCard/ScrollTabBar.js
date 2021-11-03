import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {Text, Icon} from 'galio-framework';
// import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles';

class ScrollTabBar extends React.Component {
  icons = [];

  constructor(props) {
    super(props);
    this.icons = [];
  }

  componentDidMount() {
    // this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
  }

//   setAnimationValue({ value, }) {
//     this.icons.forEach((icon, i) => {
//       const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
//       icon.setNativeProps({
//         style: {
//           color: this.iconColor(progress),
//         },
//       });
//     });
//   }

//   //color between rgb(59,89,152) and rgb(204,204,204)
//   iconColor(progress) {
//     const red = 59 + (204 - 59) * progress;
//     const green = 89 + (204 - 89) * progress;
//     const blue = 152 + (204 - 152) * progress;
//     return `rgb(${red}, ${green}, ${blue})`;
//   }

  getIconName = (tab) => {
    switch (tab) {
        case 'Text':
            return 'profile';
        case 'Video':
            return 'playcircleo';
        case 'Image':
            return 'picture';
        case 'PDF':
            return 'pdffile1';
        case 'HTML':
            return 'codesquareo';
        case 'Facebook':
            return 'facebook-square';
    
    }
  }

  render() {
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Icon
            name={this.getIconName(tab)}
            // name='add'
            family='AntDesign'
            size={20}
            color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
            // ref={(icon) => { this.icons[i] = icon; }}
          />
          <Text size={16} color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}>{tab}</Text>
        </TouchableOpacity>;
      })}
    </View>;
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});

export default ScrollTabBar;