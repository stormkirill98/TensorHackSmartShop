import React, {Component} from 'react';

import './styles/App.css';

import {categoryRequester, characteristicRequester, noteRequester, purchaseRequester} from 'data-requester'

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


var data = {
 getPurchases: function() {
   return [
     {
       title:'Пятер_очка',
       goods:[
         {
           img: 'https://irecommend.ru/sites/default/files/product-images/177327/molokorek.jpg',
           id: 1,
           name: 'Молоко Домик в деревне',
           cost: 85.50,
           quantity: 0.9,
           unit:'литр(а)',
           sale: 30,
         },
         {
           id: 2,
           name: 'яйцо столовое Дедушкины яйца',
           cost: 84.90,
           quantity: 10,
           unit:'штук',
           sale: 0
         },
         {
           id: 3,
           name: 'хлеб',
           cost: 15,
           quantity: 1,
           unit:'буханка',
           sale: 20
         },
         {
           id: 2,
           name: 'яйцо столовое Дедушкины яйца',
           cost: 84.90,
           quantity: 10,
           unit:'штук',
           sale: 0
         },
         {
           id: 2,
           name: 'яйцо столовое Дедушкины яйца',
           cost: 84.90,
           quantity: 10,
           unit:'штук',
           sale: 0
         },
         {
           id: 2,
           name: 'яйцо столовое Дедушкины яйца',
           cost: 84.90,
           quantity: 10,
           unit:'штук',
           sale: 0
         },
         {
           id: 2,
           name: 'яйцо столовое Дедушкины яйца',
           cost: 84.90,
           quantity: 10,
           unit:'штук',
           sale: 0
         },
         {
           id: 2,
           name: 'яйцо столовое Дедушкины яйца',
           cost: 84.90,
           quantity: 10,
           unit:'штук',
           sale: 0
         },
         {
           id: 2,
           name: 'яйцо столовое Дедушкины яйца',
           cost: 84.90,
           quantity: 10,
           unit:'штук',
           sale: 0
         },
         {
           id: 2,
           name: 'яйцо столовое Дедушкины яйца',
           cost: 84.90,
           quantity: 10,
           unit:'штук',
           sale: 0
         }

       ]
     },
     {
       title:'Перекрёсток',
       goods:[
         {
           img: 'https://irecommend.ru/sites/default/files/product-images/177327/molokorek.jpg',
           id: 1,
           name: 'Молоко Домик в деревне',
           cost: 102.50,
           quantity: 0.9,
           unit:'литр(а)',
           sale: 30,
         },
         {
           id: 2,
           name: 'Творожок',
           cost: 64.90,
           quantity: 10,
           unit:'штук',
           sale: 5
         },
         {
           id: 3,
           name: 'хлеб',
           cost: 15,
           quantity: 1,
           unit:'буханка',
           sale: 20
         }

       ]
     }
    ]
 },
 Found: function (pro) {



 let prod=pro||"";
 let arr =[
 {
 id: 1,
 name:'Молоко '
 },
 {
 id: 2,

 name: 'яйцо столовое '
 },
 {
 id: 3,
 name: 'хлеб'
 },
 {
 id: 4,
 name : 'чай'

 },
 {
 id: 5,
 name: 'сыр'
 }

 ]
 let mass=[];
 if(prod=="")
 {
 return arr;
 }
 else
 {
 prod= prod.toLowerCase() ;
 for(var i=0;i<arr.length;i++)
 {
 let lowname=arr[i].name;
 lowname= lowname.toLowerCase();

 if(lowname.indexOf(prod) !=-1)
 {
 mass.push(arr[i]);
 }
 }
 return mass;
}
}
}
export default class App extends Component {
  

  constructor() {
    super();
    this.state={
      shop:data.getPurchases(), open: false, 
      categories: [],
      mode: 1,
      characteristics: []
    }
  }
  
handleClickOpen = () => {
  this.setState({open:true});
};

handleClose = () => {
  this.setState({open:false});
  window.location.reload();
};
 componentWillMount() {
categoryRequester.getCategories().then((categories)=>{
   this.setState({categories});
  });


}
async onCategoryClickHandler(id){
  const characteristics = await characteristicRequester.getCharacteristicsByCategoryId(id)
  this.setState({characteristics, mode: 0})
}

render() {

  let list;
  if (this.state.mode == 1) {
    list = <List>
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
        <a>&nbsp;</a><input type='text'/>
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
            <ListItem>
              <input class='input_search' type='text'/>
            </ListItem>
            <Divider/> 
           
              {list}
            <Divider/> 
   
  
  
  
          </List>
        </Dialog>
      </div>
  
  
  
          <List className='root' subheader={<li/>}>
          {this.state.shop.map(item => (
          <li key={`section-${item.title}`} className='ListSection'>
          <ul>
          <ListSubheader>{`${item.title}`}</ListSubheader>
          {item.goods.map(item => (
          <ListItem key={`${item.goods}-${item}`}>
  
  
          <List className=''>
              <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                      <Avatar  src={`${item.img}`} />
                  </ListItemAvatar>
                      <ListItemText
                          primary={`${item.name}`}
                          secondary={
                              <React.Fragment>
                              <Typography
                                component="span"
                                color="textPrimary"
                              >
                          {item.sale != 0 &&
                            <a>{`${item.cost/100*(100-item.sale)}₽`} <s>{`${item.cost}₽`}</s></a>}
                          {item.sale == 0 &&
                              <a>{`${item.cost}₽`}</a>}
                            </Typography>
                          &nbsp;{`${item.quantity} ${item.unit}`}
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
          </List>
  
  
      </div>
  
  
        <div class='footer'>
          2019
        </div>
  
      </div>
  
  
    );
}






}
