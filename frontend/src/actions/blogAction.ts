import { BlogActionType, BlogAction, Blog } from './../types/blogType';
import { Dispatch } from 'redux';
import { AnyAction } from '@reduxjs/toolkit';
import { Article } from '../types/articleType';

export const getBlogRequest = (): BlogAction => ({
    type: BlogActionType.GET_BLOG_REQUEST,
    loading: true,
});

export const getBlogSuccess = (blog: Blog): BlogAction => ({
    type: BlogActionType.GET_BLOG_SUCCESS,
    payload: blog,
    loading: false,
});

export const getBlogFailure = (error: string): BlogAction => ({
    type: BlogActionType.GET_BLOG_FAILURE,
    error: error,
    loading: false,
});

export const putBlogRequest = (): BlogAction => ({
    type: BlogActionType.PUT_BLOG_REQUEST,
});

export const putBlogSuccess = (blog: Blog): BlogAction => ({
    type: BlogActionType.PUT_BLOG_SUCCESS,
    payload: blog,
});

export const putBlogFailure = (error: string): BlogAction => ({
    type: BlogActionType.PUT_BLOG_FAILURE,
    error: error,
});

export const getBlogArticlesRequest = (): BlogAction => ({
    type: BlogActionType.GET_BLOG_ARTICLES_REQUEST
});

export const getBlogArticlesSuccess = (articles: Article[]): BlogAction => ({
    type: BlogActionType.GET_BLOG_ARTICLES_SUCCESS,
    payload: articles
});

export const getBlogArticlesFailure = (error: string): BlogAction => ({
    type: BlogActionType.GET_BLOG_ARTICLES_FAILURE,
    error: error,
});


export const readBlog = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getBlogRequest());
        try {
            const response = await fetch(`http://localhost:8080/api/blogs/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getBlogSuccess(data));
            } else {
                throw new Error("Failed reading blog");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getBlogFailure(error.message));
            } else {
                dispatch(getBlogFailure("An unknown error occurred while reading the blog."));
            }
        }
    };
};

export const updateBlog = (blog: Blog, username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getBlogRequest());
        try {
            const response = await fetch(
                `http://localhost:8080/api/blogs/${username}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blog) // Serializza l'oggetto blog in JSON
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getBlogSuccess(data));
            } else {
                throw new Error("Failed reading blog");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getBlogFailure(error.message));
            } else {
                dispatch(getBlogFailure("An unknown error occurred while reading the blog."));
            }
        }
    };
};

export const readBloghArticles = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getBlogArticlesRequest());
        try {
            const response = await fetch(`http://localhost:8080/api/blogs/${username}/articles`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getBlogArticlesSuccess(data));
            } else {
                throw new Error("Failed reading articles");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getBlogArticlesFailure(error.message));
            } else {
                dispatch(getBlogArticlesFailure("An unknown error occurred while reading the articles."));
            }
        }
    };
};

