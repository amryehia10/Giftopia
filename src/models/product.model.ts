export interface ProductModel {
    _id: string,
    desc: string,
    name: string,
    star: number,
    price: number,
    quantity: number,
    discount: number,
    numberOfSellings: number,
    numberOfRates: number,
    cat: string[]
    images: string[],
}

