import React from 'react';

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Login: {
    backgroundColor: '#9370DB',
    flex: 1,
  },

  LoginForm: {
    justifyContent: 'space-between',
  },

  LoginContent: {
    justifyContent: 'space-between',
    flex: 1,
  },

  LoginIcon: {
    color: '#7B68EE',
  },

  LoginText: {
    color: '#343F4B',
  },

  LoginContentCard: {
    backgroundColor: '#F8F8FF',
    justifyContent: 'space-between',
    flex: 1,
  },

  LoginContentCardItem: {
    backgroundColor: '#F8F8FF',
    justifyContent: 'space-between',
  },

  LoginHeaderCardIconsBorder: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },

  LoginHeaderCardIcons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  LoginFooterCard: {
    alignItems: 'center',
  },

  LoginButtonColor: {
    backgroundColor: '#7B68EE',
    marginTop: 50,
  },
  LoginFooterCardButton: {
    width: 130,
    borderRadius: 8,
    backgroundColor: '#7B68EE',
  },
});
