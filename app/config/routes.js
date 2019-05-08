import { createStackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';
import Options from '../screens/Options';
import Themes from '../screens/Themes';
import Results from '../screens/Results';

const HomeStack =  createStackNavigator({
  Home:{
   screen: Home, 
   navigationOptions:{
    header: () => null,
   },
  },
  Options: {
    screen: Options,
    navigationOptions:{
     headerTitle: 'Options',
    },
  },
  Themes: {
    screen: Themes,
    navigationOptions:{
     headerTitle: 'Themes',
    },

  },
  headerMode: 'screen',
  Results: {
    screen: Results,
  },

},
);

export default createStackNavigator({
  Home: {
    screen: HomeStack, 
    navigationOptions:{
     header: () => null,
    },
    
  },
  CurrencyList: {
    screen: CurrencyList,
    navigationOptions:({navigation}) => ({
      headerTitle: navigation.state.params.title,
    }),
  },
 },
 {
  mode : 'modal',
 },
);
