import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Dots from 'react-native-dots-pagination';
const { width } = Dimensions.get('screen');

export default class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0,
        }
    }

    render() {
        const { length, onScrollTo } = this.props;
        return (
            <Dots
                length={length}
                activeDotWidth={20}
                activeDotHeight={20}
                passiveDotWidth={20}
                passiveDotHeight={20}
                marginHorizontal={10}
                active={this.state.active}
                width={this.props.width ? this.props.width : width}
                onScrollTo={(index, key) => {
                    this.setState({ active: index });
                    onScrollTo(index);
                }}
                onChangePage={(selectedPage) => {
                    this.setState({ active: selectedPage })
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
});