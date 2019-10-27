import React from 'react';

import {StyleSheet} from 'react-native';

import {Container, Label, Input, Item, Content, Button} from 'native-base';

import styled from 'styled-components';

export const styles = StyleSheet.create({
  Login: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },

  LoginForm: {
    justifyContent: 'space-between',
  },
  LoginContent: {
    justifyContent: 'space-between',
    flex: 1,
  },
  LoginHeaderCardIconsBorder: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },

  LoginHeaderCardIcons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  LoginFooterCard: {
    alignItems: 'center',
  },
  LoginFooterCardButton: {
    width: 130,
    borderRadius: 8,
  },
});
