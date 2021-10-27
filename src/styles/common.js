import { StyleSheet } from 'react-native';
import { theme } from 'galio-framework';
import { colors } from '.';

export default StyleSheet.create({
  shadow: {
    // borderWidth:1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  divider: {
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 8,
  },
  underline: {
    textDecorationLine: 'underline'
  },
  badge: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 5
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    borderColor: colors.primary,
  },
  topBar: {
    alignItems: 'center',
    borderBottomColor: 'grey',
    paddingHorizontal: theme.SIZES.BASE * 0.5,
    backgroundColor: colors.header
  },
});
