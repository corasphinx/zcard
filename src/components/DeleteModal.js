import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Block, Icon, Text, theme } from 'galio-framework';
import Modal from 'react-native-modal';
import { colors, commonStyles } from '../styles';
const { width, height } = Dimensions.get('screen');

export default class DeleteModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal
                isVisible={this.props.isVisible}
                onBackdropPress={() => this.props.onBackdropPress()}>
                <Block center style={styles.modalContent}>
                    <Block row style={{ alignItems: 'center' }}>
                        <Icon name="warning" family="antdesign" color="red" size={22} />
                        <Text bold color="red" size={22}> Warning!</Text>
                    </Block>
                    <Block style={styles.divider} />
                    <Text style={{ flexShrink: 1 }} color={colors.primary} size={18}>
                        {this.props.label ? this.props.label : 'Are you sure?'}
                    </Text>
                    <Block style={styles.divider} />
                    <Block row center style={{ marginTop: 20 }}>
                        <Button
                            size="small"
                            style={{ backgroundColor: "grey" }}
                            icon="close" iconFamily="AntDesign" iconSize={18}
                            textStyle={{ fontSize: 18 }}
                            onPress={() => this.props.onCancel()}
                        > No</Button>
                        <Button
                            size="small"
                            icon="trash" iconFamily="entypo" iconSize={18}
                            textStyle={{ fontSize: 18 }}
                            onPress={() => this.props.onDelete()}
                        > Yes</Button>
                    </Block>
                </Block>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        maxHeight: height / 2
    },
    divider: {
        opacity: 0.2,
        height: 1,
        width: width * 0.7,
        borderBottomWidth: 1,
        margin: 15,
    },
});