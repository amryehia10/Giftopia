Packages:
    Bootstrap, 
    Json-server,

===========================================================================
Terminals:
    to run Json File ==> npm run json
    to run Angular Project ==> npm run proj

===========================================================================
                                Giftopia                                         

products - {
	girls {
		makeup,
        perfium,
        games,
        antiques,
        accessories,
        books
	}
    boys {
        games,
        accessories,
        perfiums,
        antiques
    }
}

categories -> products
users -> admin ,user

//DB
users {
    name:required,
    id: required,
    age,
    email:required,
    password:required,
    phone:array,required,
    image,
    gender,
    address: array,required
    cardNumber: array,
    type
}

when user is guest, generate auto id, and when try to check ask for login and search for id in database, items in cart will be saved as cookie

categories {
    name,
    id,
    image: array
}

products {
    name,
    id,
    category: array,
    image: array,
    describtion,
    rate: object,
    price,
    discount
}

Discount (cart) {
    id,
    percentage,
    duration
}

Reviews {
    userId,
    productId,
    ReviewText,
    rate
}

cart {
    productId:array,
    userId,
    CartId
}

wishlist {
    productId:array,
    userId
}

orders {
    id,
    userId,
    state,
    cartId,
    paymentMethod,
    address
}

shipping {
    userId,
    orderId,
}