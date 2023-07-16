import { Blog } from "./blogType";
import { Zenyte } from "./zenyteType";

export enum ArticleActionType {
    GET_ARTICLE_REQUEST = "GET_ARTICLE_REQUEST",
    GET_ARTICLE_SUCCESS = "GET_ARTICLE_SUCCESS",
    GET_ARTICLE_FAILURE = "GET_ARTICLE_FAILURE",
    POST_ARTICLE_REQUEST = "POST_ARTICLE_REQUEST",
    POST_ARTICLE_SUCCESS = "POST_ARTICLE_SUCCESS",
    POST_ARTICLE_FAILURE = "POST_ARTICLE_FAILURE",
    PUT_ARTICLE_REQUEST = "UPDATE_ARTICLE_REQUEST",
    PUT_ARTICLE_SUCCESS = "UPDATE_ARTICLE_SUCCESS",
    PUT_ARTICLE_FAILURE = "UPDATE_ARTICLE_FAILURE",
    DELETE_ARTICLE_REQUEST = "DELETE_ARTICLE_REQUEST",
    DELETE_ARTICLE_SUCCESS = "DELETE_ARTICLE_SUCCESS",
    DELETE_ARTICLE_FAILURE = "DELETE_ARTICLE_FAILURE",
    SET_ARTICLE = "SET_ARTICLE",
    GET_SAVED_ARTICLES_REQUEST = "GET_SAVED_ARTICLES_REQUEST",
    GET_SAVED_ARTICLES_SUCCESS = "GET_SAVED_ARTICLES_SUCCESS",
    GET_SAVED_ARTICLES_FAILURE = "GET_SAVED_ARTICLES_FAILURE",
    GET_FOLLOWED_ARTICLES_REQUEST = "GET_FOLLOWED_ARTICLES_REQUEST",
    GET_FOLLOWED_ARTICLES_SUCCESS = "GET_FOLLOWED_ARTICLES_SUCCESS",
    GET_FOLLOWED_ARTICLES_FAILURE = "GET_FOLLOWED_ARTICLES_FAILURE",
    GET_TREND_ARTICLES_REQUEST = "GET_TREND_ARTICLES_REQUEST",
    GET_TREND_ARTICLES_SUCCESS = "GET_TREND_ARTICLES_SUCCESS",
    GET_TREND_ARTICLES_FAILURE = "GET_TREND_ARTICLES_FAILURE",
    GET_ALL_ARTICLES_REQUEST = "GET_ALL_ARTICLES_REQUEST",
    GET_ALL_ARTICLES_SUCCESS = "GET_ALL_ARTICLES_SUCCESS",
    GET_ALL_ARTICLES_FAILURE = "GET_ALL_ARTICLES_FAILURE"
}

export interface Article {
    id: number;
    title: string;
    coverImage?: File | null;
    coverImageURL?: string | null;
    description?: string;
    body: string;
    bodyHtml?: string;
    createdAt: string;
    updatedAt?: string;
    blog: Blog;
    author: Zenyte;
    collaborators: Zenyte[];
}

export interface ArticleAction {
    type: ArticleActionType;
    payload?: any;
    loading?: boolean;
    error?: string | null;
}

export interface ArticleState {
    selectedArticle: Article | null;
    trendArticles: Article[];
    loading: boolean;
    error?: string | null;
}