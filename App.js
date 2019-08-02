/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  StyleSheet,
} from 'react-native';

import { createStackNavigator, createAppContainer } from "react-navigation";

import { MainScreen , SearchScreen } from "./screens";

const AppNavigator = createStackNavigator({
  Main: {
    screen: MainScreen
  },

  Search: {
    screen: SearchScreen
  }
});

export default createAppContainer(AppNavigator);
