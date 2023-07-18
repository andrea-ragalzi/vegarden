import { Article } from "./articleType";
import { Blog } from "./blogType";
import { Profile } from "./profileType";


export enum ZenHubActionType {
    GET_Z_PROFILE_REQUEST = "GET_Z_PROFILE_REQUEST",
    GET_Z_PROFILE_SUCCESS = "GET_Z_PROFILE_SUCCESS",
    GET_Z_PROFILE_FAILURE = "GET_Z_PROFILE_FAILURE",
    GET_Z_BLOG_REQUEST = "GET_Z_BLOG_REQUEST",
    GET_Z_BLOG_SUCCESS = "GET_Z_BLOG_SUCCESS",
    GET_Z_BLOG_FAILURE = "GET_Z_BLOG_FAILURE",
    GET_Z_SAVED_ARTICLES_REQUEST = "GET_Z_SAVED_ARTICLES_REQUEST",
    GET_Z_SAVED_ARTICLES_SUCCESS = "GET_Z_SAVED_ARTICLES_SUCCESS",
    GET_Z_SAVED_ARTICLES_FAILURE = "GET_Z_SAVED_ARTICLES_FAILURE"
}

export interface ZenHubAction {
    type: ZenHubActionType;
    payload?: Profile | Blog | Article[] | null;
    loading?: boolean;
    error?: string | null;
}

export interface ZenHubState {
    profile: Profile | null;
    blog: Blog | null;
    savedArticles: Article[];
    loading: boolean;
    error: string | null;
}