import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Article } from "../types/articleType";
import { Blog } from "../types/blogType";
import { Profile } from "../types/profileType";
import { ZenHubAction, ZenHubActionType } from "../types/zenHubType";

const getZProfileRequest = (): ZenHubAction => ({
    type: ZenHubActionType.GET_Z_PROFILE_REQUEST
});

const getZProfileSuccess = (profile: Profile): ZenHubAction => ({
    type: ZenHubActionType.GET_Z_PROFILE_SUCCESS,
    payload: profile
});

const getZProfileFailure = (error: string): ZenHubAction => ({
    type: ZenHubActionType.GET_Z_PROFILE_FAILURE,
    error
});

const getZBlogRequest = (): ZenHubAction => ({
    type: ZenHubActionType.GET_Z_BLOG_REQUEST
});

const getZBlogSuccess = (blog: Blog): ZenHubAction => ({
    type: ZenHubActionType.GET_Z_BLOG_SUCCESS,
    payload: blog
})

const getZBlogFailure = (error: string): ZenHubAction => ({
    type: ZenHubActionType.GET_Z_BLOG_FAILURE,
    error
});

const getZSavedArticlesRequest = (): ZenHubAction => ({
    type: ZenHubActionType.GET_Z_SAVED_ARTICLES_REQUEST
});

const getZSavedArticlesSuccess = (articles: Article[]): ZenHubAction => ({
    type: ZenHubActionType.GET_Z_SAVED_ARTICLES_SUCCESS,
    payload: articles
});

const getZSavedArticlesFailure = (error: string): ZenHubAction => ({
    type: ZenHubActionType.GET_Z_SAVED_ARTICLES_FAILURE,
    error
});

export const readZProfile = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getZProfileRequest());
        try {
            const response = await fetch(
                `http://localhost:8080/api/profiles/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getZProfileSuccess(data));
            } else {
                throw new Error("Failed reading profile");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getZProfileFailure(error.message));
            } else {
                dispatch(getZProfileFailure(
                    "An unknown error occurred reading profile."));
            }
        }
    };
};

export const readZBlog = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getZBlogRequest());
        try {
            const response = await fetch(
                `http://localhost:8080/api/blogs/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getZBlogSuccess(data));
            } else {
                throw new Error("Failed reading profile");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getZBlogFailure(error.message));
            } else {
                dispatch(getZBlogFailure(
                    "An unknown error occurred reading profile."));
            }
        }
    };
};

export const readZSavedArticles = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getZSavedArticlesRequest());
        try {
            const response = await fetch(`http://localhost:8080/api/articles/saved/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getZSavedArticlesSuccess(data));
                return data;
            } else {
                throw new Error("Failed reading saved articles");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getZSavedArticlesFailure(error.message));
            } else {
                dispatch(getZSavedArticlesFailure(
                    "An unknown error occurred while reading the saved articles."));
            }
        }
    };
};