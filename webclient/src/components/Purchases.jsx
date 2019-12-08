import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Categories from './Categories';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import {purchaseRequester} from 'data-requester'


export default class Purchases extends Component {
    constructor() {
        super();
        this.state = {
            shops: []
        };
    }

    async componentWillMount() {
        this.refresh();
    }

    refresh = async () => {
        this.setState({shops: await purchaseRequester.getBestPurchase(this.props.note_id)});
    };

    removePurchase = async (id) => {
        await purchaseRequester.deletePurchase(id);
        this.refresh();
    };

    shopRender = (shop) => {
        return <ListItem divider>
            <div className='d-flex flex-column' style={{width: '100%'}}>
                <Typography variant='h5'>{shop.name}</Typography>
                <List>
                    {shop.products.map(item => this.productRender(item))}
                </List>
            </div>
        </ListItem>;
    };

    priceRender = (stock_price, price) => {
        if (stock_price && price) {
            return <>
                <Typography variant='substitle2' className="mr-2">{stock_price} ₽</Typography>
                <Typography variant='caption'><span
                    style={{textDecoration: 'line-through'}}>{price} ₽</span></Typography>
            </>
        } else {
            return <Typography variant='substitle2' className="mr-2">{stock_price || price} ₽</Typography>
        }
    };

    totalPriceRender = () => {
        return <>
            <Typography className='ml-3 mt-4' variant='h5' style={{
                fontWeight: 'bold',
                textDecoration: 'uppercase'
            }}>Итого: {this.state.shops.reduce((sum, item) => sum + item.total_price, 0)} ₽</Typography>
            <Divider/>
        </>
    }

    productRender = (item) => {
        return <>
            <ListItem key={item._id} className='mb-4'>
                <div className='d-flex'>
                    <ListItemAvatar className='mr-4'>
                        <Avatar style={{width: 100, height: 100}} src={item.logo}/>
                    </ListItemAvatar>
                    <div className='d-flex flex-column'>
                        <Typography variant='h6'>{item.name}</Typography>
                        <Typography variant='subtitle1'>{item.characteristics}</Typography>
                        <div>
                            {this.priceRender(item.stock_price, item.price)}
                        </div>
                    </div>
                </div>
                <IconButton style={{position: 'absolute', right: '16px', bottom: '16px'}} aria-label="delete"
                            onClick={() => {
                                this.removePurchase(item.purchase_id)
                            }}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        </>
    };

    dialogRender = () => {
        return <Dialog fullScreen open>
            <AppBar style={{position: 'relative'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => this.setState({isSearching: false})}
                                aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography className="ml-2" variant="h6">
                        Категории
                    </Typography>
                </Toolbar>
            </AppBar>
            <Categories purchaseChoosed={(characteristics, quantity, category_id) => {
                this.addPurchase(category_id, characteristics, quantity)
            }}/>
        </Dialog>
    };

    async addPurchase(category_id, characteristics, quantity) {
        await purchaseRequester.addPurchase(this.props.note_id, category_id, characteristics, quantity);
        this.refresh();
        this.setState({
            isSearching: false
        });
    }

    render() {
        return <Container>
            <div style={{width: '100%'}} className="d-flex justify-content-center p-1 mt-1">
                <Button variant="contained" color="primary" onClick={() => this.setState({isSearching: true})}>Добавить
                    продукт</Button>
            </div>
            {Boolean(this.state.shops.length) && this.totalPriceRender()}
            <List>
                {this.state.shops.map(item => this.shopRender(item))}
            </List>
            {this.state.isSearching && this.dialogRender()}
        </Container>
    }
}