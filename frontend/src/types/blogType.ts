import { Article } from './articleType';
import { Zenyte } from './zenyteType';

export enum BlogActionType {
    GET_BLOG_REQUEST = "GET_BLOG_REQUEST",
    GET_BLOG_SUCCESS = "GET_BLOG_SUCCESS",
    GET_BLOG_FAILURE = "GET_BLOG_FAILURE",
    PUT_BLOG_REQUEST = "PUT_BLOG_REQUEST",
    PUT_BLOG_SUCCESS = "PUT_BLOG_SUCCESS",
    PUT_BLOG_FAILURE = "PUT_BLOG_FAILURE",
    GET_BLOG_ARTICLES_REQUEST = "GET_BLOG_ARTICLES_REQUEST",
    GET_BLOG_ARTICLES_SUCCESS = "GET_BLOG_ARTICLES_SUCCESS",
    GET_BLOG_ARTICLES_FAILURE = "GET_BLOG_ARTICLES_FAILURE",
    POST_ARTICLE_FAILURE = "POST_ARTICLE_FAILURE",
    POST_ARTICLE_SUCCESS = "POST_ARTICLE_SUCCESS"
}

export interface Blog {
    id: number;
    title: string;
    description?: string;
    createdAt: string;
    updatedAt?: string | null;
    owner: Zenyte;
    articles?: Article[];
}

export interface BlogAction {
    type: BlogActionType;
    payload?: any;
    loading?: boolean;
    error?: string | null;
}

export interface BlogState {
    blog: Blog | null;
    loading: boolean;
    error: string | null;
}
