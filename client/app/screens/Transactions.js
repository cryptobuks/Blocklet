import React, { Component } from 'react';
import { FlatList, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { TransactionItem, Separator } from '../components/ListItem';
import { Container } from '../components/Container';
import { HeaderTop } from '../components/HeaderTop';

import { fetchSent, fetchReceived } from '../data/fetchData';

// REDUX
import { connect } from 'react-redux';

const TEMP_ADDRESS = '2N5wGeBMZZeAVozrK8aPRFNCzFBMxjsfc5p';

class Transactions extends Component {
 constructor(props) {
  super(props);
 }

 static propTypes = {
  onPress: PropTypes.func
 };

 componentDidMount() {
  // get sent trans
  fetchSent(
   this.props.navigation.state.params.coin.ADDRESS,
   this.props.navigation.state.params.coin.API_KEY_TESTNET
  ).then(data => this.props.getSent(data));
  // get received trans
  fetchReceived(
   this.props.navigation.state.params.coin.ADDRESS,
   this.props.navigation.state.params.coin.API_KEY_TESTNET
  ).then(data => this.props.getRec(data));
 }

 addSent = list => {
  let result = list.map(item => {
   let el = Object.assign({}, item);
   el.sentOrRec = 'sent';
   return el;
  });
  return result;
 };

 addRec = list => {
  let result = list.map(item => {
   let el = Object.assign({}, item);
   el.sentOrRec = 'received';
   return el;
  });
  return result;
 };

 sortData = (sentList, recList) => {
  let sent = this.addSent(sentList);
  let rec = this.addRec(recList);
  return sent.concat(rec).sort((a, b) => b.time - a.time);
 };

 handlePress = item => {
  console.log(`transfer to screen: ${item}`);
 };

 pressMenu = () => {
  this.props.navigation.navigate('MenuList', {
   coin: this.props.navigation.state.params.coin
  });
 };

 pressHome = () => {
  this.props.navigation.navigate('Home');
 };

 // RENDER ========================

 render() {
  console.log(
   'COIN PASSED! ===========',
   this.props.navigation.state.params.coin
  );
  return (
   <Container>
    <StatusBar translucent={false} barStyle="light-content" />
    <HeaderTop onPressMenu={this.pressMenu} onPressHome={this.pressHome} />
    <FlatList
     style={{ marginTop: 80 }}
     data={this.sortData(this.props.recTrans, this.props.sentTrans)}
     renderItem={({ item }) => (
      <TransactionItem
       sentOrRec={item.sentOrRec}
       amount={
        item.amounts_received
         ? item.amounts_received[0].amount
         : item.total_amount_sent
       }
       sender={item.senders[0]}
       confidence={item.confidence}
       confirmations={item.confirmations}
       onPress={() => this.handlePress(item)}
      />
     )}
     keyExtractor={item => item.txid}
     ItemSeparatorComponent={Separator}
    />
   </Container>
  );
 }
}

const mapStateToProps = state => {
 return {
  recTrans: state.transactionReducers.recTrans,
  sentTrans: state.transactionReducers.sentTrans
 };
};

const mapDispatchToProps = dispatch => ({
 getRec: data =>
  dispatch({
   type: 'ADD_SENT',
   data
  }),
 getSent: data =>
  dispatch({
   type: 'ADD_REC',
   data
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
