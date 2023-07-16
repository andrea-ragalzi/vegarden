import { Dispatch } from "react";
import { ArticleReaction, ArticleReactionAction, ArticleReactionType } from "../types/articleReactionType";
import { AnyAction } from "redux";

const getArticleReactionRequest = (): ArticleReactionAction => ({
    type: ArticleReactionType.GET_ARTICLE_REACTION_REQUEST
});

const getArticleReactionSuccess = (exists: boolean): ArticleReactionAction => ({
    type: ArticleReactionType.GET_ARTICLE_REACTION_SUCCESS,
    payload: exists
})

const getArticleReactionFailure = (error: string): ArticleReactionAction => ({
    type: ArticleReactionType.GET_ARTICLE_REACTION_FAILURE,
    error: error
});

const postArticleReactionRequest = (): ArticleReactionAction => ({
    type: ArticleReactionType.POST_ARTICLE_REACTION_REQUEST
});

const postArticleReactionSuccess = (): ArticleReactionAction => ({
    type: ArticleReactionType.POST_ARTICLE_REACTION_SUCCESS,
});

const postArticleReactionFailure = (error: string): ArticleReactionAction => ({
    type: ArticleReactionType.POST_ARTICLE_REACTION_FAILURE,
    error: error
});

const deleteArticleReactionRequest = (): ArticleReactionAction => ({
    type: ArticleReactionType.DELETE_ARTICLE_REACTION_REQUEST
})

const deleteArticleReactionSuccess = (): ArticleReactionAction => ({
    type: ArticleReactionType.DELETE_ARTICLE_REACTION_SUCCESS,
});

const deleteArticleReactionFailure = (error: string): ArticleReactionAction => ({
    type: ArticleReactionType.DELETE_ARTICLE_REACTION_FAILURE,
    error: error
})

export const getArticleReaction = (articleReaction: ArticleReaction, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        const articleId = articleReaction.article.id;
        const authorId = articleReaction.author.id;
        dispatch(getArticleReactionRequest());
        try {
            const response = await fetch(`http://localhost:8080/api/articles-reactions/${articleId}/${authorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getArticleReactionSuccess(data));
                return data;
            } else {
                const error = await response.json();
                dispatch(getArticleReactionFailure(error));
                return error;
            }
        } catch (error) {
            dispatch(getArticleReactionFailure("An unknown error occurred while getting a reaction."));
            return error;
        }
    }
}

export const addArticleReaction = (articleReaction: ArticleReaction, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(postArticleReactionRequest());
        try {
            const response = await fetch("http://localhost:8080/api/articles-reactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(articleReaction)
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(postArticleReactionSuccess());
                return data;
            } else {
                const error = await response.json();
                dispatch(postArticleReactionFailure(error));
                return error;
            }
        } catch (error) {
            dispatch(postArticleReactionFailure("An unknown error occurred while adding a reaction."));
            return error;
        }
    }
}

export const deleteArticleReaction = (articleReaction: ArticleReaction, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(deleteArticleReactionRequest());
        try {
            const response = await fetch("http://localhost:8080/api/articles-reactions", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(articleReaction)
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(deleteArticleReactionSuccess());
                return data;
            } else {
                const error = await response.json();
                dispatch(deleteArticleReactionFailure(error));
                return error;
            }
        } catch (error) {
            dispatch(deleteArticleReactionFailure("An unknown error occurred while deleting a reaction."));
            return error;
        }
    }
}