import { CategoryModel } from "./models/category.model";
import { ProductModel } from "./models/product.model";

export class GeneralMethods {
    static CastCategories = (param: any) =>
        (param["data"] as CategoryModel[]);

    static CastProducts = (param: any) =>
        (param["data"] as ProductModel[]);

}