import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: '#7B68EE',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  headerCenterIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  listRightElements: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});
