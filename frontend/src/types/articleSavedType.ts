import { Article } from "./articleType";
import { Zenyte } from "./zenyteType";

export enum ArticleSavedType {
    GET_ARTICLE_SAVED_REQUEST = "GET_ARTICLE_SAVED_REQUEST",
    GET_ARTICLE_SAVED_SUCCESS = "GET_ARTICLE_SAVED_SUCCESS",
    GET_ARTICLE_SAVED_FAILURE = "GET_ARTICLE_SAVED_FAILURE",
    POST_ARTICLE_SAVED_REQUEST = "POST_ARTICLE_SAVED_REQUEST",
    POST_ARTICLE_SAVED_SUCCESS = "POST_ARTICLE_SAVED_SUCCESS",
    POST_ARTICLE_SAVED_FAILURE = "POST_ARTICLE_SAVED_FAILURE",
    DELETE_ARTICLE_SAVED_REQUEST = "DELETE_ARTICLE_SAVED_REQUEST",
    DELETE_ARTICLE_SAVED_SUCCESS = "DELETE_ARTICLE_SAVED_SUCCESS",
    DELETE_ARTICLE_SAVED_FAILURE = "DELETE_ARTICLE_SAVED_FAILURE"
}

export interface ArticleSaved {
    id?: number;
    article: Article;
    author: Zenyte;
    createdAt?: string;
}

export interface ArticleSavedAction {
    type: ArticleSavedType;
    payload?: boolean,
    loading?: boolean;
    error?: string | null;
}

export interface ArticleSavedState {
    exists?: boolean;
    loading?: boolean;
    error?: string | null;
}