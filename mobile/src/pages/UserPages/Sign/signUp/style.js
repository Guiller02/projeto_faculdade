import React from 'react';

import {StyleSheet} from 'react-native';

import {Container, Label, Input, Item, Content, Button} from 'native-base';

import styled from 'styled-components';

export const styles = StyleSheet.create({
  SignUp: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',
    flex: 1,
  },

  SignUpForm: {
    flex: 1,
    alignItems: 'center',
  },
  SignUpItemMargin: {
    marginBottom: 20,
  },
});
