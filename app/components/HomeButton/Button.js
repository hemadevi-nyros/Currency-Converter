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
 backgroundColor,
}) => {
const buttonStyles = [styles.buttonStyle];
if (backgroundColor) {
 buttonStyles.push({ backgroundColor });
}
return (
 <TouchableOpacity onPress={onPress} style= {buttonStyles}>
   <View>
     <Text style={styles.name}>{text}</Text>
   </View>
 </TouchableOpacity>
);
};
Button.propTypes = {
 onPress: PropTypes.func,
 text: PropTypes.string,
 backgroundColor: PropTypes.string,
};

export default Button;