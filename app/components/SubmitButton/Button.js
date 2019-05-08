import PropTypes from 'prop-types';
import React from 'react';
import {
  View, TouchableOpacity, Text
} from 'react-native';
import color from 'color';
import styles from './styles';

const Button = ({
  onPress,
  text,
  textColor,
}) => {
const buttonTextStyles = [styles.text];
if (textColor) {
 buttonTextStyles.push({ color: textColor });
}
return (
 <TouchableOpacity onPress={onPress} style= {styles.buttonStyle}>
   <View>
	   <Text style={buttonTextStyles}>{text}</Text>
	 </View>
 </TouchableOpacity>
);
};
Button.propTypes = {
 onPress: PropTypes.func,
 text: PropTypes.string,
 textColor: PropTypes.string,
};

export default Button;