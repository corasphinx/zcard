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
  },
  collapseTitle:{
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.primaryLight,
    padding: 8,
    marginTop:8,
    alignItems:'center'
  },
  listRow: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginVertical: 2,
    padding: 8,
    backgroundColor: colors.background
  },
  listRowBack: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginVertical: 2,
    alignItems: 'flex-end'
  },
});
