import React from 'react';
import { View, Button, FlatList, Text, StyleSheet, Image } from 'react-native';
import { purchaseRequester } from 'data-requester';


class Purchase extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        data: []
      }
    }

    async componentWillMount (){
      
      this.props.navigation.addListener('didFocus',
        () => {        
          if (this.props.navigation.getParam('refresh')) {
            this.refresh();
          }
        }
      )
      if (!this.props.navigation.getParam('refresh')) {
        await this.refresh()
      }          
    }

    async refresh (){
      console.log('id -----> ',this.props.navigation.getParam('noteID'))
      this.setState({
        data: await purchaseRequester.getBestPurchase(this.props.navigation.getParam('noteID'))
      })
    }

    static navigationOptions = {
      title: 'Корзина',
    };
    deleteProduct = async (id) => {
      await purchaseRequester.deletePurchase(id)
      console.log('delete--->', id)
      await this.refresh()
    }
    itemRenderProducts = ({item}) => {
      return(
        <View style={styles.item}>
          <View style={{marginVertical: 25}}>
            <Image
            style={{width: 50, height: 50}}
            source={{uri: item.logo}}
            />
          </View>
          <View style={{marginHorizontal: 25}}>
            <Text style={{marginVertical: 8, fontSize: 20}}> {item.name} </Text>
            <Text style={{marginVertical: 8, fontSize: 15}}> {item.characteristics}</Text>
            <View style={{marginVertical: 8, flex: 1, flexDirection: 'row', alignItems: 'baseline'}}>
              <Text style={{ fontSize: 20, fontWeight: 'bold'}}> {item.stock_price}₽</Text>
              <Text style={{ fontSize: 16, textDecorationLine: 'line-through'}}> {item.price}₽</Text>
            </View>
          </View>
          <View style={{position: "absolute", right: 10, top: 10}}>
            <Text style={{ fontSize: 10, fontWeight: 'bold'}}> {item.count}шт</Text>
          </View>
          <View style={{position: "absolute", right: 10, bottom: 10}}>
            <Button 
              title="удалить"
              onPress={() => this.deleteProduct(item.purchase_id)}
              color="#d04d4d"
            />
          </View>
        </View>
      )
    }

    itemRender = ({item}) =>{
      return(
        <View style={styles.container}>
          <View style={styles.namestore}>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.products}>
            <FlatList
              data={item.products}
              renderItem={ this.itemRenderProducts }
              keyExtractor={item => item.name}
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
          onPress={() => navigate('Products', {noteID: this.props.navigation.getParam('noteID')})}
        />
        
          <FlatList
            data={this.state.data}
            renderItem={ this.itemRender }
            keyExtractor={item => item.name}
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
      paddingBottom: 40,
      marginVertical: 8,
      marginHorizontal: 16
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
    }
  });

  export default Purchase