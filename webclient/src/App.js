import React, {Component} from 'react';

import './styles/App.css';

import {categoryRequester, characteristicRequester, purchaseRequester} from 'data-requester'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default class App extends Component {
  // async GetId(id) {
  //   this.setState({
  //     mode: 0
  //   })
  //   //ЗАПРОС ДЛЯ ВЫВОДА (ЖИРНОСТЬ, ОБЬЕМ и т.д.) БУДЕТ ТУТ
    // const characteristics = await characteristicRequester.getCharacteristicsByCategoryId(id);
    // this.setState({
    //   dataInputAboutProducts: characteristics
    // })
  // };

  constructor() {
    super();
    this.state={
      shop:[], open: false, 
      categories: [],
      mode: 1,
      characteristics: []
    }
  }
  
handleClickOpen = () => {
  this.setState({open:true});
};

handleClose = () => {
  debugger;
  const mode = this.state.mode
  if(mode === 0) {
    this.setState({mode: mode+1});
  } else {
    this.setState({open:false});
  }
};
async componentWillMount() {
  debugger
  const purchase = await purchaseRequester.getBestPurchase(27)
  this.setState({shop:purchase});
  const categories = await categoryRequester.getCategories();
  this.setState({categories});

}
async onCategoryClickHandler(id){
  const characteristics = await characteristicRequester.getCharacteristicsByCategoryId(id)
  this.setState({characteristics, mode: 0})
}

render() {

  let list;
  if (this.state.mode == 1) {
    list = <List>
      
      <ListItem>
              <input class='input_search' type='text' onChange/>
            </ListItem>
    {this.state.categories.map(Category => (    
      <ListItem button  key={Category.name} onClick={(e) => {this.onCategoryClickHandler(Category._id)}}>  
        {`${Category.name}`}
        <Divider/>
        </ListItem>
    ))}
     </List>
  } else {
    list = <List>
      
    {this.state.characteristics.map(Ch_name => (  
      <ListItem button key={Ch_name.name}>   
        {`${Ch_name.name}`}
        <Divider/>
        </ListItem>
    ))}
  </List>
  }

  return (

    <div className="App">
      <header className="App-header">
          <h3>Smart Shop</h3>
      </header>
  
      <div class="contentApp">
  
  
      <div>
        <Button variant="outlined" onClick={this.handleClickOpen}>
          Добавить продукт
        </Button>
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
          <AppBar class='appBar'>
            <Toolbar>
              <Typography variant="h3" class='classes.title'>
                Список товаров
              </Typography>
  
              <Button id='closebutton' edge="start" color="inherit" onClick={this.handleClose} aria-label="close" >
                Закрыть
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <Divider/> 
           
              {list}
            <Divider/> 
   
  
  
  
          </List>
        </Dialog>
      </div>
  
  
  
          <List className='root' subheader={<li/>}>
          {this.state.shop.map(item => (
          <li key={`section-${item.name}`} className='ListSection'>
          <ul>
          <ListSubheader>{`${item.name}`}</ListSubheader>
          {item.products.map(item => (
          <ListItem key={`${item.products}-${item}`}>
  
  
          <List className=''>
              <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                      <Avatar  src={`${item.logo}`} />
                  </ListItemAvatar>
                      <ListItemText
                          primary={`${item.name}`}
                          secondary={
                              <React.Fragment>
                              <Typography
                                component="span"
                                color="textPrimary"
                              >                          
                              {item.stock_price && item.stock_price < item.price &&
                                <a>{`${item.stock_price}₽`} <s>{`${item.price}₽`}</s></a>}
                              {!item.stock_price &&
                                  <a>{`${item.price}₽`}</a>}
                            </Typography>
                          &nbsp;{`Количество: ${item.count}`}
                              </React.Fragment>
                          }
                      />
                      </ListItem>
          </List>
  
  
                      </ListItem>
                    ))}
                  </ul>
                </li>
              ))}
              <ListItemText
                          primary="Total:"
                          secondary={
                              <React.Fragment>
                              <Typography
                                component="span"
                                color="textPrimary"
                              >              
                              {this.state.shop.total_price &&           
                                  <a>{`${this.state.shop.total_price}₽`}</a>}
                                  {!this.state.shop.total_price &&           
                                      <a>{`0 ₽`}</a>}
                            </Typography>
                              </React.Fragment>
                          }
                      />
          </List>
  
  
      </div>
  
  
        <div class='footer'>
          2019
        </div>
  
      </div>
  
  
    );
}






}
