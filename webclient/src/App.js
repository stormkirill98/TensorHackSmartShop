import React from 'react';
import './App.css';
import './FoundDataProducts.js';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


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


export default function App() {
var Shop = data.getPurchases();
return (
	<div className="App">
    <header className="App-header">
        <h3>Smart Shop</h3>
    </header>

    <div class="App-content">
        <button name='OK' onClick='AddProduct()'>Добавить продукт</button>
        <input  type="text" name="name" />
        <List className='root' subheader={<li />}>
        {Shop.map(item => (
        <li key={`section-${Shop.title}`} className='ListSection'>
        <ul>
        <ListSubheader>{`${item.title}`}</ListSubheader>
        {item.goods.map(item => (
        <ListItem key={`${Shop.goods}-${item}`}>


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
