import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
import { noteRequester, purchaseRequester } from 'data-requester'
import { ListItem, Button } from 'react-native-material-ui';
import { SwipeListView } from 'react-native-swipe-list-view';



function RemoveButton() {
    return (
        <View style={{ height: "100%", padding: 8 }}>
            <Text style={{ color: "#e4e4e4" }}>x</Text>
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
        title: 'HomePage',
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
        return <>
            <Button style={styles.but} raised primary text="Добавить"
                onPress={() =>
                    this.setState({ edit: true })
                }
            />
            <FlatList
                data={this.state.notes}
                renderItem={this.itemRender}
                keyExtractor={item => item._id}
            />
        </>
    }

    editRender() {
        return <View style={styles.item}>
            <TextInput
                style={{ flexGrow: 1 }}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
            />
            <Button style={styles.but} raised primary text="Добавить"
                onPress={() =>
                    this.addNote()
                }
            />
        </View>
    }

    itemRender = ({ item }) => {
        return (
            <View style={styles.item}>
                <View><Text>{item.name}</Text></View>
                <TouchableHighlight onPress={() => {
                    this.deleteNote(item._id)
                }}>

                    <RemoveButton />
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    notesContainer: {
        display: "flex",
        flexDirection: "column"
    },
    but: {
        height: 30
    }
})


export default Notes