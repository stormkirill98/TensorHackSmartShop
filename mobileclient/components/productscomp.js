import React from 'react';
import {View, Text, TextInput, FlatList, StyleSheet, TouchableHighlight, Button} from 'react-native';
import {categoryRequester, characteristicRequester, purchaseRequester} from 'data-requester';

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
    // запрос через либу для вывода категорий по дефолту
    const dataCategoryRequester = await categoryRequester.getCategories();
    // console.log('dataCategoryRequester = ',dataCategoryRequester)
    this.setState({
      dataFoundProducts: dataCategoryRequester
    })
  }
  
  onPress = async (id, name) => {
    this.setState({
      mode: 0,
      //Айди категории, которую мы выбрали
      categoryID: id,
    })
    //ЗАПРОС ДЛЯ ВЫВОДА (ЖИРНОСТЬ, ОБЬЕМ и т.д.) БУДЕТ ТУТ
    // console.log('characteristicRequester--->', characteristicRequester)
    const datacharacteristic = await characteristicRequester.getCharacteristicsByCategoryId(id);
    this.setState({
      dataInputAboutProducts: datacharacteristic,
      str: name
    })
  }

  itemRender = ({item}) =>{
    return(
        <TouchableHighlight
          onPress={() => this.onPress(item._id, item.name)}>
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
            style={{ height: 40, borderColor: '#dcdcdc', borderWidth: 1, marginVertical: 8}}
            onChangeText={(value) => this.onChangeTextSearchAboutProdct(value, item)}
            value={item.value}
          />
        </View>
    )
  }

  onPressButtonForAddProduct = () => {
    // let forRequestDataInputAboutProducts;
    // for(let i=0; i<this.state.dataInputAboutProducts.length; i++){
    //   forRequestDataInputAboutProducts = this.state.dataInputAboutProducts
    // }
    // console.log(forRequestDataInputAboutProducts)
    
    purchaseRequester.addPurchase(53, this.state.categoryID, this.state.dataInputAboutProducts)
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
              <Button
                title="Добавить продукт"
                onPress={this.onPressButtonForAddProduct}
              />
              <Text style={{marginVertical: 8, marginHorizontal: 15}}>Заполните поля:</Text>
              <FlatList
                data={this.state.dataInputAboutProducts}
                renderItem={ this.itemRenderAboutProducts }
                keyExtractor={item => item.id}
              />
            </View>
    }
    return (
    <View style={styles.mainblock}>

        <View style={styles.containerSearchCategory}>
          <Text>Найти:</Text>
          <TextInput
            style={{ height: 50, borderColor: '#dcdcdc', backgroundColor: '#fff', borderWidth: 1, marginVertical: 8}}
            onChangeText={this.onChangeTextSearchProducts}
            value={this.state.str}
          />
          </View>
        <View >
          {list}
        </View>
    </View>
    )
  }


    //Поиск в инпуте продукта
    onChangeTextSearchProducts = async (value) => {
      this.setState({
        str: value
      })
      //запрос через либу для вывода категорий по поиску
      const data = await categoryRequester.getCategories(value);
      
      this.setState({
        dataFoundProducts: data,
        mode: 1
      })
    }
}

const styles = StyleSheet.create({
  mainblock: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  containerSearchCategory: {
    padding: 15
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,  
    marginVertical: 8,
    marginHorizontal: 16,
  }
});

export default Products;