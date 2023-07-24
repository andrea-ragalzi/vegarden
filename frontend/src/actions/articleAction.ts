import { ArticleActionType, ArticleAction, Article } from './../types/articleType';
import { Dispatch } from 'redux';
import { AnyAction } from '@reduxjs/toolkit';

const getArticleRequest = (): ArticleAction => ({
    type: ArticleActionType.GET_ARTICLE_REQUEST
});

const getArticleSuccess = (article: Article): ArticleAction => ({
    type: ArticleActionType.GET_ARTICLE_SUCCESS,
    payload: article,
})

const getArticleFailure = (error: string): ArticleAction => ({
    type: ArticleActionType.GET_ARTICLE_FAILURE,
    error: error
})

const postArticleRequest = (): ArticleAction => ({
    type: ArticleActionType.POST_ARTICLE_SUCCESS
})

const postArticleSuccess = (article: Article): ArticleAction => ({
    type: ArticleActionType.POST_ARTICLE_SUCCESS,
    payload: article,
});

const postArticleFailure = (error: string): ArticleAction => ({
    type: ArticleActionType.POST_ARTICLE_FAILURE,
    error: error
});

const putArticleRequest = (): ArticleAction => ({
    type: ArticleActionType.PUT_ARTICLE_SUCCESS
});

const putArticleSuccess = (article: Article): ArticleAction => ({
    type: ArticleActionType.PUT_ARTICLE_SUCCESS,
    payload: article
});

const putArticleFailure = (error: string): ArticleAction => ({
    type: ArticleActionType.PUT_ARTICLE_FAILURE,
    error: error
});

const deleteArticleRequest = (): ArticleAction => ({
    type: ArticleActionType.DELETE_ARTICLE_REQUEST
});

const deleteArticleSuccess = (): ArticleAction => ({
    type: ArticleActionType.DELETE_ARTICLE_SUCCESS,
});

const deleteArticleFailure = (error: string): ArticleAction => ({
    type: ArticleActionType.DELETE_ARTICLE_FAILURE,
    error: error
})

const getSavedArticlesRequest = (): ArticleAction => ({
    type: ArticleActionType.GET_SAVED_ARTICLES_REQUEST
});

const getSavedArticlesSuccess = (articles: Article[]): ArticleAction => ({
    type: ArticleActionType.GET_SAVED_ARTICLES_SUCCESS,
    payload: articles
});

const getSavedArticlesFailure = (error: string): ArticleAction => ({
    type: ArticleActionType.GET_SAVED_ARTICLES_FAILURE,
    error: error
});

const getTrendArticlesRequest = (): ArticleAction => ({
    type: ArticleActionType.GET_TREND_ARTICLES_REQUEST,
});

const getTrendArticlesSuccess = (articles: Article[]): ArticleAction => ({
    type: ArticleActionType.GET_TREND_ARTICLES_SUCCESS,
    payload: articles,
})

const getTrendArticlesFailure = (error: string): ArticleAction => ({
    type: ArticleActionType.GET_TREND_ARTICLES_FAILURE,
    error: error
});

const getFollowedArticlesRequest = (): ArticleAction => ({
    type: ArticleActionType.GET_FOLLOWED_ARTICLES_REQUEST
});

const getFollowedArticlesSuccess = (articles: Article[]): ArticleAction => ({
    type: ArticleActionType.GET_FOLLOWED_ARTICLES_SUCCESS,
    payload: articles
});

const getFollowedArticlesFailure = (error: string): ArticleAction => ({
    type: ArticleActionType.GET_FOLLOWED_ARTICLES_FAILURE,
    error: error
});

export const readArticle = (id: string, token: string) => {
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


export const createArticle = (formData: FormData, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(postArticleRequest());
        try {

            const response = await fetch('http://localhost:8080/api/articles', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
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

export const updateArticle = (article: Article, formData: FormData, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(putArticleRequest());
        try {
            const response = await fetch(`http://localhost:8080/api/articles/${article.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(putArticleSuccess(data));
                return data;
            } else {
                throw new Error("Failed to update article");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(putArticleFailure(error.message));
            } else {
                dispatch(putArticleFailure(
                    "An unknown error occurred while updating the article."));
            }
        }
    }
}

export const deleteArticle = (article: Article, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(deleteArticleRequest());
        try {
            const response = await fetch(`http://localhost:8080/api/articles/${article.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(deleteArticleSuccess());
                return data;
            } else {
                throw new Error("Failed to delete article");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(deleteArticleFailure(error.message));
            } else {
                dispatch(deleteArticleFailure(
                    "An unknown error occurred while deleting the article."));
            }
        }
    };
};

export const setArticle = (article: Article): ArticleAction => ({
    type: ArticleActionType.SET_ARTICLE,
    payload: article
})


export const readTrendArticles = (token: string) => {
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

export const readFollowedArticles = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getFollowedArticlesRequest());
        try {
            const response = await fetch(`http://localhost:8080/api/articles/followed/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getFollowedArticlesSuccess(data));
                return data;
            } else {
                throw new Error("Failed reading the followed articles");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getFollowedArticlesFailure(error.message));
            } else {
                dispatch(getFollowedArticlesFailure(
                    "An unknown error occurred while reading the followed articles."));
            }
        }
    }
}

export const readSavedArticles = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getSavedArticlesRequest());
        try {
            const response = await fetch(`http://localhost:8080/api/articles/saved/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getSavedArticlesSuccess(data));
                return data;
            } else {
                throw new Error("Failed reading saved articles");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getSavedArticlesFailure(error.message));
            } else {
                dispatch(getSavedArticlesFailure(
                    "An unknown error occurred while reading the saved articles."));
            }
        }
    };
};
