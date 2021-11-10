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
    // borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.pink,
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
    paddingHorizontal: 10,
  },
  collapseTitle:{
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.primaryLight,
    padding: 8,
    marginTop:8,
    alignItems:'center'
  },
  collapseBody:{
    padding:10,
    borderColor:colors.border, 
    backgroundColor:colors.backgroundLight,
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
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
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    margin: 10
  },
  Card: {
    borderWidth: 1,
    borderRadius:8,
    backgroundColor: colors.backgroundLight,
    borderColor: colors.border,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  BottomBar: {
    borderWidth: 1,
    backgroundColor: colors.backgroundLight,
    borderColor: colors.border,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3, },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 6,
  },

  // for Carousel
  slider: {
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8
  },
  // end Carousel
});
