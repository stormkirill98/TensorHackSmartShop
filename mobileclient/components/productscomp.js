import React from 'react';
import {View, Text, TextInput, FlatList, StyleSheet, TouchableHighlight} from 'react-native';
// import foundDataProducts from '../data/foundDataProducts';
// import aboutDataProducts from '../data/aboutDataProducts';
import {categoryRequester, characteristicRequester} from 'data-requester'

class Products extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      //строка для поиска продуктов
      str: '',
      //строка для вставки информации об продуктов
      strForAbout: '',

      //список для нахождения продуктов по поиску
      dataFoundProducts: [],
      //список для вывода критерий об продукте (например жирность и т.д.)
      dataInputAboutProducts: [],

      //переменная для перехода
      mode: 1,
    }
  }


  async componentWillMount(){
    //запрос через либу для вывода категорий по дефолту
    const dataCategoryRequester = await categoryRequester.getCategories();
    // console.log('dataCategoryRequester = ',dataCategoryRequester)
    this.setState({
      dataFoundProducts: dataCategoryRequester
    })
  }
  
  onPress = async (id) => {
    this.setState({
      mode: 0
    })
    //ЗАПРОС ДЛЯ ВЫВОДА (ЖИРНОСТЬ, ОБЬЕМ и т.д.) БУДЕТ ТУТ
    const datacharacteristic = await characteristicRequester.getCharacteristicsByCategoryId(id);
    this.setState({
      dataInputAboutProducts: datacharacteristic
    })
  }

  itemRender = ({item}) =>{
    return(
        <TouchableHighlight
        onPress={() => this.onPress(item._id)}>
          <View style={styles.item}><Text>{item.name}</Text></View>
        </TouchableHighlight>
    )
  }

  onChangeTextSearchAboutProdct = (value, item) =>{
    const index = this.state.dataInputAboutProducts.indexOf(item);
    const newList = [...this.state.dataInputAboutProducts];
    newList[index].value = value;
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

  //Поиск в инпуте продукта
  onChangeTextSearchProducts = async (value) => {
    this.setState({
      str: value
    })
    //запрос через либу для вовода категорий по поиску
    const data = await categoryRequester.getCategories(value);
    this.setState({
      dataFoundProducts: data
    })
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
              <Text>задать тип продукта</Text>
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