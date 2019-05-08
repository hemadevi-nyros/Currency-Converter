import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, Alert, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {Container} from '../components/Container';
import {Logo} from '../components/Logo';
import {InputWithButton} from '../components/TextInput';
import {ClearButton} from '../components/Button';
import {Button} from '../components/SubmitButton';
import {LastConverted} from '../components/Text';
import {Header} from '../components/Header';
import { connectAlert } from '../components/Alert';
import {swapCurrency, changeCurrencyAmount, getInitialConversion} from '../actions/currencies';

const TEMP_CONVERSION_DATE = new Date();
class Home extends Component {
 static propTypes = {
   navigation: PropTypes.object,
   dispatch: PropTypes.func,
   baseCurrency: PropTypes.string,
   quoteCurrency: PropTypes.string,
   amount: PropTypes.number,
   conversionRate: PropTypes.number,
   isFetching: PropTypes.bool,
   lastConvertedDate: PropTypes.object,
   currencyError: PropTypes.string,
   alertWithType: PropTypes.func,
   primaryColor: PropTypes.string,
  };
  componentWillMount(){
   this.props.dispatch(getInitialConversion());
  }
  componentWillReceiveProps(nextProps) {
   const { currencyError, alertWithType } = this.props;
   if (nextProps.currencyError && !currencyError) {
     alertWithType('error', 'Error', nextProps.currencyError);
   }
  }
  handlePressBaseCurrency = () => {
   this.props.navigation.navigate('CurrencyList', {title: 'Base Currency', type: 'base'});
  };
  handlePressQuoteCurrency = () => {
   this.props.navigation.navigate('CurrencyList', {title: 'Quote Currency', type: 'quote'});
  };
  handleTextChange =(amount) =>{
   this.props.dispatch(changeCurrencyAmount(amount));
  };
  handleSwapCurrency =() =>{
   this.props.dispatch(swapCurrency());
  };
  handleSumbitPress =() =>{
   if(!this.props.amount == ''){
     this.props.navigation.navigate('Results', {title: 'Currencies', type: 'currency'});
   }
  };
  handleOptionsPress =() =>{
    this.props.navigation.navigate('Options');
  };
  render(){
    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if(this.props.isFetching){
     quotePrice = '...';
    }
    else if(this.props.baseCurrency === this.props.quoteCurrency){
     quotePrice = (this.props.amount).toFixed(2);
    }
  	return (
  	 <Container backgroundColor= {this.props.primaryColor}>
       <Header onPress={this.handleOptionsPress} />
       <Logo tintColor={this.props.primaryColor} />
  	   <KeyboardAvoidingView behavior= "padding">
  	     <InputWithButton 
  	       buttonText={this.props.baseCurrency}
  	       onPress ={this.handlePressBaseCurrency}
  	       defaultValue={this.props.amount.toString()}
  	       keyboardType ="numeric"
  	       onChangeText = {this.handleTextChange}
           textColor = {this.props.primaryColor}
  	     />
         { this.props.amount == '' ? (
          <Text style={styles.errorMessage}>Please Enter value</Text>
          ) : null  }
  	     <InputWithButton 
  	       buttonText = {this.props.quoteCurrency}
  	       onPress = {this.handlePressQuoteCurrency}
  	       editable = {false} 
  	       defaultValue= {quotePrice}
           textColor = {this.props.primaryColor}
  	      />
          <LastConverted
           base={this.props.baseCurrency}
           quote ={this.props.quoteCurrency}
           date = {this.props.lastConvertedDate}
           conversionRate= { this.props.conversionRate}
          />
          <ClearButton
           text ="Reverse Currencies"
           onPress ={this.handleSwapCurrency}
          />
          <Button
           text ="Submit"
           onPress ={this.handleSumbitPress}
           textColor = {this.props.primaryColor}
          />
        </KeyboardAvoidingView>  
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
   currencyError: state.currencies.error,
   primaryColor: state.theme.primaryColor,
  };
};
const styles = StyleSheet.create({
 errorMessage: {
   fontSize: 15,
   color:"red",
  },
  activityIndicator: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   height: 80
  },
});
export default connect(mapStatetoProps)(connectAlert(Home));
