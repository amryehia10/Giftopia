export class GeneralMethods {
    static CastCategories = (param: any) =>
        (param["data"] as CategoryModel[]);

    static CastProducts = (param: any) =>
        (param["data"] as ProductModel[]);

    static CastProduct = (param: any) =>
        (param["data"] as ProductModel);
    // static CastCartItems = (param: any) =>
    //     (param["data"] as CartItemModel[]);
}