import { CategoryAction, CategoryActionType, Category } from "../types/categoryType";

export const getCategory = (categories: Category[]): CategoryAction => ({
    type: CategoryActionType.GET_CATEGORY,
    payload: categories
});

export const postCategory = (categories: Category[]): CategoryAction => ({
    type: CategoryActionType.POST_CATEGORY,
    payload: categories
})
