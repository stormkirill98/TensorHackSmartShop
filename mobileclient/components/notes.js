import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
import { noteRequester } from 'data-requester'
import { Button } from 'react-native-material-ui';


function RemoveButton() {
  return (
    <View style={{display: 'flex', justifyContent: "flex-end"}}>
      <Text style={{ color: "#d04d4d" }}>удалить</Text>
    </View>
  )
}

class Notes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      notes: []
    }
  }

  async componentWillMount() {
    //запрос через либу для вывода категорий по дефолту

    const notes = await noteRequester.getNotes();
    //const purchase = await purchaseRequester.getBestPurchase();
    this.setState({
      notes
    })
  }

  static navigationOptions = {
    title: 'Список заметок',
  };


  async deleteNote(id) {
    await noteRequester.deleteNode(id);
    const notes = this.state.notes.filter(item => item._id !== id)
    this.setState({
      notes
    })
  }

  async addNote(value, user) {
    const [{ _id }] = await noteRequester.addNote(this.state.name, 1)
    const note = { _id, name: this.state.name };
    this.setState({
      notes: [note, ...this.state.notes], edit: false, name: ''
    })
  }

  render() {
    return (
      <View style={styles.notesContainer}>
        {this.state.edit && this.editRender()}
        {!this.state.edit && this.listRender()}
      </View>)
  }


  listRender() {
    return <View style={{}}>
    
      <Button style={styles.but} raised primary text="Добавить запись"
        onPress={() =>
          this.setState({ edit: true })
        }
      />
      <FlatList
        data={this.state.notes}
        renderItem={this.itemRender}
        keyExtractor={item => item._id}
      />
    </View>
  }

  editRender() {
    return <View>
      <View style={{ display: 'flex', flexDirection: 'row'}}>
      <TextInput
        autoFocus
        style={{ flexGrow: 1, borderColor: '#dcdcdc', borderWidth: 1, paddingHorizontal: 12}}
        onChangeText={(name) => this.setState({ name })}
        value={this.state.name}
      />
      <Button style={styles.but} raised primary text="Отмена"
        onPress={() => this.setState({edit: false})}
      />
      <Button style={styles.but} raised primary text="Добавить"
        onPress={() =>
          this.addNote()
        }
      />
      </View>
      <FlatList
        data={this.state.notes}
        renderItem={this.itemRender}
        keyExtractor={item => item._id}
      />
    </View>
  }



  itemRender = ({ item }) => {
    return (

      <TouchableHighlight onPress={() => {
        this.props.navigation.navigate('Purchase', { noteID: item._id })
      }}>
        <View style={styles.item}>
          <View>
            <Text>{item.name}</Text>
          </View>
          <TouchableHighlight onPress={() => {
            this.deleteNote(item._id)
          }}>
            <RemoveButton />
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 20,
    fontSize: 18,
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  notesContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  but: {
    padding: 50,
    height: 30
  }
})


export default Notes