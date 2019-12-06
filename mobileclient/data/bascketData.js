const basketData = { 
    getPurchases: function() { 
        return [
            {id: 1, name: 'Пятерочка', products: [{ 
                id: 1, 
                name: 'Молоко Домик в деревне', 
                cost: 85.50, 
                count: 0.9,
                procent: 3, 
                unit:'литр', 
                sale: 30 
                }, 
                { 
                id: 2, 
                name: 'яйцо столовое Дедушкины яйца', 
                cost: 84.90, 
                count: 10, 
                procent: 20,
                unit:'штук', 
                sale: 0 
                }, 
                { 
                id: 3, 
                name: 'хлеб', 
                cost: 15, 
                count: 1, 
                procent: 10,
                unit:'штук', 
                sale: 20 
                }] },
            
            {id: 2, name: 'Магнит', products: [{
                id: 1, 
                name: 'Ахмад чай', 
                cost: 60.50, 
                count: 2,
                procent: 2, 
                unit:'штук', 
                sale: 30 
                }, 
                { 
                id: 2, 
                name: 'Нескафе', 
                cost: 120.90, 
                count: 10, 
                procent: 2,
                unit:'штук', 
                sale: 0 
                },
            ]} 
        
        ] 
        } 
}

export default basketData


//    getPurchases: function() { 
//     return [ 
//     { 
//     id: 1, 
//     name: 'Молоко Домик в деревне', 
//     cost: 85.50, 
//     weigth: 0.9, 
//     unit:'литр', 
//     sale: 30 
//     }, 
//     { 
//     id: 2, 
//     name: 'яйцо столовое Дедушкины яйца', 
//     cost: 84.90, 
//     count: 10, 
//     unit:'штук', 
//     sale: 0 
//     }, 
//     { 
//     id: 3, 
//     name: 'хлеб', 
//     cost: 15, 
//     count: 1, 
//     unit:'буханка', 
//     sale: 20 
//     } 
//     ] 
//     },