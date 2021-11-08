import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../styles';

export default class RadioButton extends Component {
    state = {
        value: null,
    };
    componentDidMount() {
        this.setState({ value: this.props.initValue });
    }
    render() {
        const { PROP } = this.props;
        const { value } = this.state;

        return (
            <View>
                {PROP.map(res => {
                    return (
                        <View key={res.key} >
                            <TouchableOpacity
                                style={styles.container}
                                onPress={() => {
                                    this.setState({
                                        value: res.key,
                                    });
                                    this.props.onSelect(res.key);
                                }}>
                                {value !== res.key && <View style={styles.radioCircle} />}
                                {value === res.key && <View style={styles.radioCircle}><View style={styles.selectedRb} /></View>}
                                <Text style={styles.radioText}>{res.text}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
                {/* <Text> Selected: {this.state.value} </Text> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    radioText: {
        marginLeft: 10,
        fontSize: 16,
        color: colors.primary,
        // fontWeight: '700'
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: colors.primary,
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});