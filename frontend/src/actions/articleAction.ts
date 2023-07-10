import { ArticleActionType, ArticleAction, Article } from './../types/articleType';
import { Dispatch } from 'redux';
import { AnyAction } from '@reduxjs/toolkit';

const getArticleRequest = (): ArticleAction => ({
    type: ArticleActionType.GET_ARTICLE_REQUEST,
    loading: true,
    error: null
});

const getArticleSuccess = (article: Article): ArticleAction => ({
    type: ArticleActionType.GET_ARTICLE_SUCCESS,
    payload: article,
    loading: false,
    error: null
})

const getArticleFailure = (error: string): ArticleAction => ({
    type: ArticleActionType.GET_ARTICLE_FAILURE,
    loading: false,
    error: error
})

const postArticleRequest = (): ArticleAction => ({
    type: ArticleActionType.POST_ARTICLE_SUCCESS,
    loading: true
})

const postArticleSuccess = (article: Article): ArticleAction => ({
    type: ArticleActionType.POST_ARTICLE_SUCCESS,
    payload: article,
    loading: false
});

const postArticleFailure = (error: string): ArticleAction => ({
    type: ArticleActionType.POST_ARTICLE_FAILURE,
    loading: false,
    error
})

const getTrendArticlesRequest = (): ArticleAction => ({
    type: ArticleActionType.GET_TREND_ARTICLES_REQUEST,
    loading: true
});

const getTrendArticlesSuccess = (articles: Article[]): ArticleAction => ({
    type: ArticleActionType.GET_TREND_ARTICLES_SUCCESS,
    payload: articles,
    loading: false
})

const getTrendArticlesFailure = (error: string): ArticleAction => ({
    type: ArticleActionType.GET_TREND_ARTICLES_FAILURE,
    loading: false,
    error
});

export const getArticle = (id: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getArticleRequest());
        try {
            const response = await fetch(`http://localhost:8080/api/articles/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getArticleSuccess(data));
                return data;
            } else {
                throw new Error("Failed to get article");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getArticleFailure(error.message));
            } else {
                dispatch(getArticleFailure("An unknown error occurred while getting the article."));
            }
        }
    }
}


export const postArticle = (token: string, article: Article) => {

    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(postArticleRequest());
        try {
            const response = await fetch('http://localhost:8080/api/articles', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(article)
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(postArticleSuccess(data));
                return data;
            } else {
                throw new Error("Failed to post article");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(postArticleFailure(error.message));
            } else {
                dispatch(postArticleFailure(
                    "An unknown error occurred while posting the article."));
            }
        }
    }
}


export const fecthTrendArticles = (token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getTrendArticlesRequest());
        try {
            const response = await fetch('http://localhost:8080/api/articles/trend', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getTrendArticlesSuccess(data));
                return data;
            } else {
                throw new Error("Failed reading articles");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getTrendArticlesFailure(error.message));
            } else {
                dispatch(getTrendArticlesFailure(
                    "An unknown error occurred while reading the tren articles."));
            }
        }
    }
}
