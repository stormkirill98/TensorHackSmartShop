import React from 'react';
import {View, Text, TextInput, FlatList, StyleSheet, TouchableHighlight, Button } from 'react-native';
import {categoryRequester, characteristicRequester, purchaseRequester} from 'data-requester';
import RNPickerSelect from 'react-native-picker-select';

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
    const placeholder = {
      label: "выберите значение..",
      value: null,
      color: '#9EA0A4',
    };
    const items = [];
    for (let i = 0; i < item.enum_values.length; i++) {
      items.push({label: item.enum_values[i], value: item.enum_ids[i]})
    }
    return(
        <View style={styles.item}>
          <Text>{item.name}</Text>
          {/* <TextInput
            style={{ height: 40, borderColor: '#dcdcdc', borderWidth: 1, marginVertical: 8}}
            onChangeText={(value) => this.onChangeTextSearchAboutProdct(value, item)}
            value={item.value}
          /> */}
          <RNPickerSelect
            placeholder={placeholder}
            style={pickerSelectStyles}
            onValueChange={(value) => this.onChangeTextSearchAboutProdct(value, item)}
            items={items}
          />
        </View>
    )
  }

  onPressButtonForAddProduct = async () => {
    const {navigate} =  this.props.navigation;
    console.log(55, this.state.categoryID, this.state.dataInputAboutProducts, this.state.quantity)
    await purchaseRequester.addPurchase(55, this.state.categoryID, this.state.dataInputAboutProducts, this.state.quantity)
    navigate('Purchase', {refresh: 1})  
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
              <Text style={{marginVertical: 8, marginHorizontal: 15}}>Количество:</Text>
              <View style={styles.item}>

                <TextInput
                  style={pickerSelectStyles.inputAndroid}
                  keyboardType = 'numeric'
                  onChangeText={(value)=> { 
                    this.setState({
                      quantity: value
                    })
                  }}
                  value={this.state.quantity}
                />
              </View>

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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Products;