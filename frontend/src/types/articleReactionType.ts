import { Article } from "./articleType";
import { Zenyte } from "./zenyteType";

export enum ArticleReactionType {
    GET_ARTICLE_REACTION_REQUEST = "GET_ARTICLE_REACTION_REQUEST",
    GET_ARTICLE_REACTION_SUCCESS = "GET_ARTICLE_REACTION_SUCCESS",
    GET_ARTICLE_REACTION_FAILURE = "GET_ARTICLE_REACTION_FAILURE",
    POST_ARTICLE_REACTION_REQUEST = "POST_ARTICLE_REACTION_REQUEST",
    POST_ARTICLE_REACTION_SUCCESS = "POST_ARTICLE_REACTION_SUCCESS",
    POST_ARTICLE_REACTION_FAILURE = "POST_ARTICLE_REACTION_FAILURE",
    DELETE_ARTICLE_REACTION_REQUEST = "DELETE_ARTICLE_REACTION_REQUEST",
    DELETE_ARTICLE_REACTION_SUCCESS = "DELETE_ARTICLE_REACTION_SUCCESS",
    DELETE_ARTICLE_REACTION_FAILURE = "DELETE_ARTICLE_REACTION_FAILURE"
}

export interface ArticleReaction {
    id?: number;
    article: Article;
    author: Zenyte;
    createdAt?: string;
}

export interface ArticleReactionAction {
    type: ArticleReactionType;
    payload?: boolean,
    loading?: boolean;
    error?: string | null;
}

export interface ArticleReactionState {
    exists?: boolean;
    loading?: boolean;
    error?: string | null;
}