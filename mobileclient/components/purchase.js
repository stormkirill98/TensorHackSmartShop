import React from 'react';
import { View, Button, FlatList, Text, StyleSheet } from 'react-native';
import basketData from '../data/bascketData';
import Constants from 'expo-constants';

console.log(JSON.stringify(basketData))

class Purchase extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          data: []
        }
    }

    componentWillMount(){
      this.setState({
        data: basketData.getPurchases()
      })
    }

    static navigationOptions = {
      title: 'HomePage',
    };
    itemRenderProducts = ({item}) => {
      return(
        <View style={styles.item}>
          <Text>{item.name}</Text>
          <Text>{item.count}{item.unit} • {item.procent}%</Text>
          <Text>{item.cost}₽ </Text>
        </View>
      )
    }

    itemRender = ({item}) =>{
      return(
        <View style={styles.con}>
          <View>
            <Text>{item.name}</Text>
          </View>
          <FlatList
          data={item.products}
          renderItem={ this.itemRenderProducts }
          keyExtractor={item => item.id}
        />
        </View>
      )
    }

    render() {
      const {navigate} = this.props.navigation;
      return (
      <View>
        <Button
          title="Добавить продукт"
          onPress={() => navigate('Products')}
        />
        <FlatList
          data={this.state.data}
          renderItem={ this.itemRender }
          keyExtractor={item => item.id}
        />
      </View>
      )
      
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#a9a9a9',
    },
    con: {
      padding: 20
      // backgroundColor: '',
    },
    item: {
      backgroundColor: '#c0c0c0',
      padding: 20,  
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

  export default Purchase