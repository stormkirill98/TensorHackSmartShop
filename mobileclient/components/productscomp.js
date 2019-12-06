import React from 'react';
import {View, Text, TextInput, FlatList, StyleSheet, TouchableHighlight} from 'react-native';
import foundDataProducts from '../data/foundDataProducts';
import aboutDataProducts from '../data/aboutDataProducts';


class Products extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      str: '',
      strForAbout: '',
      dataFoundProducts: [],
      dataInputAboutProducts: [],
      mode: 1,
    }
  }

  onChangeTextSearchProducts = (value) =>{
    this.setState({
      str: value,
      dataFoundProducts: foundDataProducts.getcategories(value)
    })
  }
  componentWillMount(){
    this.setState({
      dataFoundProducts: foundDataProducts.getcategories(),
      dataInputAboutProducts: aboutDataProducts.getAboutProduct()
    })
  }
  onPress = (id) => {
    this.setState({
      mode: 0
    })
    //ЗАПРОС ДЛЯ ВЫВОДА (ЖИРНОСТЬ, ОБЬЕМ и т.д.) БУДЕТ ТУТ

  }

  itemRender = ({item}) =>{
    return(
        <TouchableHighlight
        onPress={() => this.onPress(item.id)}>
          <View style={styles.item}><Text>{item.name}</Text></View>
        </TouchableHighlight>
    )
  }

  onChangeTextSearchAboutProdct = (value, item) =>{
    const index = this.state.dataInputAboutProducts.indexOf(item);
    const newList = [...this.state.dataInputAboutProducts];
    newList[index].value = value;
    console.log(newList)
    this.setState({
      dataInputAboutProducts: newList
    })
  }

  itemRenderAboutProducts = ({item}) => {
    return(
        <View style={styles.item}>
          <Text>{item.name}</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(value) => this.onChangeTextSearchAboutProdct(value, item)}
            value={item.value}
          />
        </View>
    )
  }

  render() {
    let list ;
    if (this.state.mode == 1) {
      list = <FlatList
                data={this.state.dataFoundProducts}
                renderItem={ this.itemRender }
                keyExtractor={item => item.id}
              />
    } else {
      list = <View>
              <Text>sdfsdf</Text>
              <FlatList
                data={this.state.dataInputAboutProducts}
                renderItem={ this.itemRenderAboutProducts }
                keyExtractor={item => item.id}
              />
            </View>
    }
    return (
    <View>
        <Text>Найти продукты:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={this.onChangeTextSearchProducts}
            value={this.state.str}
          />
        <View >
          {list}
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({

  item: {
    backgroundColor: '#c0c0c0',
    padding: 20,  
    marginVertical: 8,
    marginHorizontal: 16,
  }
});

export default Products;