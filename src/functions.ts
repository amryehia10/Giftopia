export class GeneralMethods {
    static CastCategories = (param: any) =>
        (param["data"] as CategoryModel[]);

    static CastProducts = (param: any) =>
        (param["data"] as ProductModel[]);
}