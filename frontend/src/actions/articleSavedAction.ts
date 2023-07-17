
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ArticleSaved, ArticleSavedAction, ArticleSavedType } from "../types/articleSavedType";

const getArticleSavedRequest = (): ArticleSavedAction => ({
    type: ArticleSavedType.GET_ARTICLE_SAVED_REQUEST,
});

const getArticleSavedSuccess = (exists: boolean): ArticleSavedAction => ({
    type: ArticleSavedType.GET_ARTICLE_SAVED_SUCCESS,
    payload: exists
});

const getArticleSavedFailure = (error: string): ArticleSavedAction => ({
    type: ArticleSavedType.GET_ARTICLE_SAVED_FAILURE,
    error: error
})

const postArticleSavedRequest = (): ArticleSavedAction => ({
    type: ArticleSavedType.POST_ARTICLE_SAVED_REQUEST
});

const postArticleSavedSuccess = (): ArticleSavedAction => ({
    type: ArticleSavedType.POST_ARTICLE_SAVED_SUCCESS
});

const postArticleSavedFailure = (error: string): ArticleSavedAction => ({
    type: ArticleSavedType.POST_ARTICLE_SAVED_FAILURE,
    error: error
});

const deleteArticleSavedRequest = (): ArticleSavedAction => ({
    type: ArticleSavedType.DELETE_ARTICLE_SAVED_REQUEST
});

const deleteArticleSavedSuccess = (): ArticleSavedAction => ({
    type: ArticleSavedType.DELETE_ARTICLE_SAVED_SUCCESS
})

const deleteArticleSavedFailure = (error: string): ArticleSavedAction => ({
    type: ArticleSavedType.DELETE_ARTICLE_SAVED_FAILURE,
    error: error
});

export const getArticleSaved = (articleSaved: ArticleSaved, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        const articleId = articleSaved.article.id;
        const authorId = articleSaved.author.id;
        dispatch(getArticleSavedRequest());
        try {
            const response = await fetch(`http://localhost:8080/api/articles-saved/${articleId}/${authorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getArticleSavedSuccess(data));
                return data;
            } else {
                dispatch(getArticleSavedFailure(response.statusText));
                return false;
            }
        } catch (error) {
            dispatch(getArticleSavedFailure("An unknown error occurred while getting a saved article."));
            return false;
        }
    };
};

export const addArticleSaved = (article: ArticleSaved, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(postArticleSavedRequest());
        try {
            const response = await fetch("http://localhost:8080/api/articles-saved", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(article)
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(postArticleSavedSuccess());
                return data;
            } else {
                dispatch(postArticleSavedFailure(response.statusText));
                return false;
            }
        } catch (error) {
            dispatch(postArticleSavedFailure("An unknown error occurred while adding a saved article."));
            return false;
        }
    };
};

export const deleteArticleSaved = (articleSaved: ArticleSaved, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(deleteArticleSavedRequest());
        try {
            const response = await fetch("http://localhost:8080/api/articles-saved", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(articleSaved)
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(deleteArticleSavedSuccess());
                return data;
            } else {
                const error = await response.json();
                dispatch(deleteArticleSavedFailure(error));
                return false;
            }
        } catch (error) {
            dispatch(deleteArticleSavedFailure("An unknown error occurred while deleting a saved article."));
            return false;
        }
    };
};