import React, {Component} from 'react';
import {characteristicRequester, categoryRequester, purchaseRequester} from 'data-requester'
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

class Characteristics extends Component {
    itemRender = (item) => {
        return <ListItem>
            <FormControl variant="filled"
                         style={{width: '300px'}}>
                <InputLabel id="demo-simple-select-outlined-label">
                    {item.name}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={item.value}
                    onChange={(event) => this.props.onCharacteristicsChanged(item, event.target.value)}
                    inputProps={{
                        name: 'age',
                        id: 'outlined-age-native-simple',
                    }}>
                    <MenuItem value=''></MenuItem>
                    {item.enum_values.map(item => (
                        <MenuItem value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </ListItem>
    };

    render() {
        return <>
            <Typography variant='h5' className='mt-4'>Категория: "{this.props.category}"</Typography>
            <Divider className='mb-2 mt-2'/>
            <Typography variant='h5'>Введите количество:</Typography>
            <TextField className='mt-1 mb-2 m-3' value={this.props.quantity} onChange={(event) => {
                this.props.onQuantityChanged(event.target.value)
            }}/>
            <Typography variant='h5'>Выберите характеристики:</Typography>
            <List>
                {this.props.characteristics.map(item => this.itemRender(item))}
            </List>
        </>
    }
}

export default class Categories extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            characteristics: [],
            mode: 'categories',
            quantity: 1
        };
    }

    async componentWillMount() {
        this.searchCategories('');
    }

    searchCategories = async (value) => {
        this.setState({categories: await categoryRequester.getCategories(value)});
    };

    chooseCategories = async (id, category) => {
        this.setState({category_id: id, category});
        this.setState({mode: 'characteristics'});
        this.setState({characteristics: await characteristicRequester.getCharacteristicsByCategoryId(id)})
    };

    itemCategoryRender = (item) => {
        return <ListItem style={{cursor: 'pointer'}} onClick={() => this.chooseCategories(item._id, item.name)}>
            <ListItemText>{item.name}</ListItemText>
        </ListItem>
    };

    characteristicsChangeHandle = (item, value) => {
        const itemIndex = this.state.characteristics.indexOf(item);
        const characteristics = [...this.state.characteristics];
        characteristics[itemIndex].value = value;
        this.setState({characteristics});
    };

    render() {
        return <Container className='mt-1'>
            {this.state.mode === 'categories' && <>
                <TextField className='mt-2'  placeholder='Поиск по категориям' style={{width: '100%'}} value={this.state.searchValue}
                           onChange={(event) => {
                               this.setState({searchValue: event.target.value});
                               this.searchCategories(event.target.value)
                           }}/>
                <List>
                    {this.state.categories.map(item => this.itemCategoryRender(item))}
                </List>
            </>}
            {this.state.mode === 'characteristics' && <>
                <Characteristics onCharacteristicsChanged={this.characteristicsChangeHandle}
                                 onQuantityChanged={(quantity) => this.setState({quantity})}
                                 quantity={this.state.quantity}
                                 category_id={this.state.category_id}
                                 category={this.state.category}
                                 characteristics={this.state.characteristics}/>
                <Button variant="contained" color="primary" onClick={() => this.props.purchaseChoosed(this.state.characteristics, this.state.quantity, this.state.category_id)}>
                    Добавить
                </Button>
            </>}
        </Container>
    }
}