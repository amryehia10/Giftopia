type CartModel = {
    userId: string;
    total: number;
    products: CartProductModel[];
};



// {
//       "total": 0,
//       "userId": "660c71754ae7f2f3338cca19",
//       "products": [
//         {
//           "_id": "660b29b96a460f658ffe0b05",
//           "name": "ACTIV SOCKS PACKAGE",
//           "price": 100,
//           "images": [
//             "https://m.media-amazon.com/images/I/61pgqHzrRmL._AC_SX569_.jpg"
//           ],
//           "quantity": 20,
//           "discount": 20,
//           "soldQuantity": 120
//         },
//         {
//           "_id": "660b280b6a460f658ffe0b02",
//           "name": "L'Azurde Ring",
//           "price": 222160,
//           "images": [
//             "https://cdn11.bigcommerce.com/s-t4k1ukevvr/images/stencil/1280w/products/2446/7947/TW10-973-1__96255.1696950533.jpg"
//           ],
//           "quantity": 10,
//           "discount": 20,
//           "soldQuantity": 12
//         }
//       ]
//     }