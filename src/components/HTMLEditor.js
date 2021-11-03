import React from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { Block, Text } from 'galio-framework';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { EmojiView } from './emoji';
import { XMath } from '@wxik/core';
import { colors } from '../styles';

const phizIcon = require('../assets/images/phiz.png');
const htmlIcon = require('../assets/images/html.png');

const contentStyle = {
    backgroundColor: colors.backgroundLight,
    color: colors.primary,
    caretColor: 'red', // initial valid// initial valid
    placeholderColor: '#a9a9a9',
    // cssText: '#editor {background-color: #f3f3f3}', // initial valid
    contentCSSText: 'font-size: 18px; min-height: 200px;', // initial valid
};

export default class HTMLEditor extends React.Component {

    richText = React.createRef();

    constructor(props) {
        super(props)
        this.state = {
            emojiVisible: false,
        }
    }

    handleEmoji = () => {
        const { emojiVisible } = this.state;
        Keyboard.dismiss();
        this.richText.current?.blurContentEditor();
        this.setState({ emojiVisible: !emojiVisible });
    }

    insertEmoji = (emoji) => {
        this.richText.current?.insertText(emoji);
        this.richText.current?.blurContentEditor();
    }

    fontSize = () => {
        // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
        const size = [1, 2, 3, 4, 5, 6, 7];
        this.richText.current?.setFontSize(size[XMath.random(size.length - 1)]);
    };

    foreColor = () => {
        this.richText.current?.setForeColor('blue');
    };

    hiliteColor = () => {
        this.richText.current?.setHiliteColor('red');
    };

    render() {
        const { initHTML, placeholder } = this.props;
        return (
            <Block>
                <RichToolbar
                    style={styles.richBar}
                    flatContainerStyle={styles.flatStyle}
                    editor={this.richText}
                    disabled={false}
                    selectedIconTint={'#2095F2'}
                    disabledIconTint={'#bfbfbf'}
                    // onPressAddImage={this.onPressAddImage}
                    // onInsertLink={this.onInsertLink}
                    actions={[
                        actions.undo,
                        actions.redo,
                        // actions.insertVideo,
                        // actions.insertImage,
                        actions.setStrikethrough,
                        actions.checkboxList,
                        actions.insertOrderedList,
                        actions.blockquote,
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.code,
                        actions.line,

                        actions.foreColor,
                        actions.hiliteColor,
                        actions.heading1,
                        actions.heading2,
                        actions.heading3,
                        actions.heading4,
                        actions.heading5,
                        'insertEmoji',
                        // 'insertHTML',
                        'fontSize',
                    ]} // default defaultActions
                    iconMap={{
                        insertEmoji: phizIcon,
                        [actions.foreColor]: ({ tintColor }) => <Text style={[styles.tib, { color: 'blue' }]}>FC</Text>,
                        [actions.hiliteColor]: ({ tintColor }) => (
                            <Text style={[styles.tib, { color: tintColor, backgroundColor: 'red' }]}>BC</Text>
                        ),
                        [actions.heading1]: ({ tintColor }) => (
                            <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                        ),
                        [actions.heading2]: ({ tintColor }) => (
                            <Text style={[styles.tib, { color: tintColor }]}>H2</Text>
                        ),
                        [actions.heading3]: ({ tintColor }) => (
                            <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
                        ),
                        [actions.heading4]: ({ tintColor }) => (
                            <Text style={[styles.tib, { color: tintColor }]}>H4</Text>
                        ),
                        [actions.heading5]: ({ tintColor }) => (
                            <Text style={[styles.tib, { color: tintColor }]}>H5</Text>
                        ),
                        insertHTML: htmlIcon,
                    }}
                    insertEmoji={this.handleEmoji}
                    fontSize={this.fontSize}
                    foreColor={this.foreColor}
                    hiliteColor={this.hiliteColor}
                />
                <RichEditor
                    initialFocus={false}
                    disabled={false}
                    editorStyle={contentStyle} // default light style
                    ref={this.richText}
                    style={styles.rich}
                    useContainer={true}
                    initialHeight={200}
                    containerStyle={{borderRadius: 8}}
                    placeholder={placeholder}
                    initialContentHTML={initHTML}
                    // editorInitializedCallback={this.editorInitializedCallback}
                    onChange={(html) => this.props.onEdit(html)}
                // onHeightChange={this.handleHeightChange}
                // onPaste={this.handlePaste}
                // onKeyUp={this.handleKeyUp}
                // onKeyDown={this.handleKeyDown}
                // onInput={this.onInput}
                // onMessage={this.handleMessage}
                // onFocus={this.handleFocus}
                // onBlur={this.handleBlur}
                // onCursorPosition={this.handleCursorPosition}
                // pasteAsPlainText={true}
                />
                {this.state.emojiVisible && <EmojiView onSelect={this.insertEmoji} />}
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    rich: {
        minHeight: 300,
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e3e3e3',
    },
    flatStyle: {
        paddingHorizontal: 12,
    },
    richBar: {
        borderColor: '#efefef',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    richBarDark: {
        backgroundColor: '#191d20',
        borderColor: '#696969',
    },
    tib: {
        textAlign: 'center',
        color: '#515156',
    },
});