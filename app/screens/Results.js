import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Container} from '../components/ResultContainer';
import {LastConverted} from '../components/Text';
import {Button} from '../components/HomeButton';
import {Logo} from '../components/Logo';
import {connect} from 'react-redux';

class Results extends Component {
 static propTypes ={
 	 navigation: PropTypes.object,
 	 baseCurrency: PropTypes.string,
   quoteCurrency: PropTypes.string,
   amount: PropTypes.number,
   conversionRate: PropTypes.number,
   isFetching: PropTypes.bool,
   lastConvertedDate: PropTypes.object,
   primaryColor: PropTypes.string,
 };
 handleHomePress =() =>{
   this.props.navigation.navigate('Home');
 };
 render() {
   let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if(this.props.isFetching){
     quotePrice = '...';
    }
    else if(this.props.baseCurrency === this.props.quoteCurrency){
     quotePrice = (this.props.amount).toFixed(2);
    }
   return (
 	   <Container backgroundColor={this.props.primaryColor}>
       <Logo tintColor={this.props.primaryColor} />
       <View style={styles.box}>
         <View style={styles.content}>
           <Text style={styles.text}>{this.props.baseCurrency}</Text>
           <TextInput style={styles.number} value= {this.props.amount.toString()} />
         </View>
         <View style={styles.content}>
           <Text style={styles.text}>{this.props.quoteCurrency}</Text>
           <TextInput style={styles.number} value= {quotePrice} />
         </View>
         <Button
           text ="Go Home"
           onPress ={this.handleHomePress}
           backgroundColor = {this.props.primaryColor}
          />
       </View>
       <LastConverted
         base={this.props.baseCurrency}
         quote ={this.props.quoteCurrency}
         date = {this.props.lastConvertedDate}
         conversionRate= { this.props.conversionRate}
       />
     </Container>
    );
  }
};
const mapStatetoProps = (state) => {
 const baseCurrency = state.currencies.baseCurrency;
 const quoteCurrency = state.currencies.quoteCurrency;
 const conversionSelector = state.currencies.conversions[baseCurrency] || {};
 const rates = conversionSelector.rates || {};
 return{
   baseCurrency,
   quoteCurrency,
   amount: state.currencies.amount,
   conversionRate: rates[quoteCurrency] || 0,
   isFetching: conversionSelector.isFetching,
   lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    primaryColor: state.theme.primaryColor,
  };
};

const styles = StyleSheet.create({
	box:{
	 marginTop: 10,
	 marginBottom: 10,
   width: 300,
   height: 200,
   justifyContent: 'center',
   borderRadius: 15,
	},
	content: {
   flexDirection: 'row',
	},
	number:{
	 color: '#fff',
   fontSize: 20,
   paddingRight: 30,
	},
  text: {
  	color: '#fff',
  	fontSize: 20,
  	paddingRight: 30,
  	marginLeft: 80,
  },
});

export default connect(mapStatetoProps)(Results);
