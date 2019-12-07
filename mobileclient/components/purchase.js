import React from 'react';
import { View, Button, FlatList, Text, StyleSheet, Image } from 'react-native';
import basketData from '../data/bascketData';
import { SwipeListView } from 'react-native-swipe-list-view';


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
      title: 'Корзина',
    };
    itemRenderProducts = ({item}) => {
      return(
        // <SwipeListView  
        // useFlatList
        // data={this.state.listViewData}
        // renderItem={ (data, rowMap) =>
        //   (
            <View style={styles.item}>

              <View style={{marginVertical: 25}}>
                <Image
                style={{width: 50, height: 50}}
                source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
                />
              </View>

              <View style={{marginHorizontal: 25}}>
              <Text style={styles.itemdata}> {item.name} </Text>
              <Text style={styles.itemdata}> {item.count}{item.unit} • {item.procent}%</Text>
              <Text style={styles.itemdata}> {item.cost}₽ </Text>
              </View>

            </View>
        //   )}
        //     leftOpenValue={75}
        //     rightOpenValue={-75}
        // />
      )
    }

    itemRender = ({item}) =>{
      return(
        <View style={styles.container}>
          <View style={styles.namestore}>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.products}>
              {/* <FlatList
              data={item.products}
              renderItem={ this.itemRenderProducts }
              keyExtractor={item => item.id}
            /> */}
            <SwipeListView
              useFlatList
              data={item.products}
              renderItem={ this.itemRenderProducts }
              renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                    <Text>Left</Text>
                    <Text>Right</Text>
                </View>
              )}
              keyExtractor={item => item.id}
            /> 
          </View>
        </View>
      )
    }

    render() {
      const {navigate} = this.props.navigation;
      return (
      <View style={styles.mainblock}>
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
    mainblock: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    container: {
      padding: 20
    },
    namestore: {
      padding: 20,
    },
    products: {
      backgroundColor: '#fff',
    },
    item: {
      flex: 1,
      flexDirection: 'row',
      padding: 20,  
      marginVertical: 8,
      marginHorizontal: 16,
    },
    itemdata: {
      marginVertical: 8,
    },
    images: {
      marginVertical: 8,
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
    },
  });

  export default Purchase