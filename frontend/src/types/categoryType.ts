export enum CategoryActionType {
    GET_CATEGORY = "GET_CATEGORY",
    POST_CATEGORY = "POST_CATEGORY",
    PUT_CATEGORY = "PUT_CATEGORY",
    DELETE_CATEGORY = "DELETE_CATEGORY",

}

export enum Category {
    HEALTH_WELLNESS = "HEALTH_WELLNESS",
    ENVIRONMENT = "ENVIRONMENT",
    ETHICS = "ETHICS",
    OTHER = "OTHER",
}

export interface CategoryAction {
    type: CategoryActionType;
    payload?: Category[] | null;
    loading?: boolean;
    error?: string | null;
}

export interface CategoryState {
    categories: Category[] | null;
    loading: boolean;
    error: string | null;
}