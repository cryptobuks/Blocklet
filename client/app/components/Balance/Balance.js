import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import { images } from '../CardItem/icons/CoinIcons';

import styles from './styles';

const Balance = ({ balanceAmount }) => (
 <View style={styles.container}>
  <Text style={styles.balanceTextTitle}>Your Balance</Text>
  <Text h3 style={styles.balanceTextAmount}>
   {balanceAmount.toFixed(7)}
   {/* <Animatable.Image
    animation="rotate"
    iterationCount="infinite"
    easing="linear"
    style={styles.image}
    source={{ uri: images.BTC }}
    resizeMode="contain"
   /> */}
  </Text>
  <Divider style={styles.divider} />
 </View>
);

Balance.propTypes = {
 balanceAmount: PropTypes.number
};

export default Balance;
