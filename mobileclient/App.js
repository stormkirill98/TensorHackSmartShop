
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Products from './components/productscomp';
import Purchase from './components/purchase';
import Notes from './components/notes';
import { StatusBar} from 'react-native';


StatusBar.setHidden(true);
console.disableYellowBox = true;

const MainNavigator = createStackNavigator({
  Notes: {screen: Notes},
  Purchase: {screen: Purchase},
  Products: {screen: Products},
});

const App = createAppContainer(MainNavigator);

export default App;
