const foundDataProducts = {

    getcategories:function(pro)
    {

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

   export default foundDataProducts
