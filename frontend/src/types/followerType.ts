import { Zenyte } from './zenyteType';

export enum FollowerActionType {
    GET_FOLLOWER_REQUEST = "GET_FOLLOWER_REQUEST",
    GET_FOLLOWER_SUCCESS = "GET_FOLLOWER_SUCCESS",
    GET_FOLLOWER_FAILURE = "GET_FOLLOWER_FAILURE",
    POST_FOLLOWER_REQUEST = "POST_FOLLOWER_REQUEST",
    POST_FOLLOWER_SUCCESS = "POST_FOLLOWER_SUCCESS",
    POST_FOLLOWER_FAILURE = "POST_FOLLOWER_FAILURE",
    DELETE_FOLLOWER_REQUEST = "DELETE_FOLLOWER_REQUEST",
    DELETE_FOLLOWER_SUCCESS = "DELETE_FOLLOWER_SUCCESS",
    DELETE_FOLLOWER_FAILURE = "DELETE_FOLLOWER_FAILURE"
}

export interface Follower {
    id?: number,
    follower: Zenyte,
    followed: Zenyte,
    createdAt?: string
}

export interface FollowerAction {
    type: FollowerActionType;
    payload?: boolean;
    loading?: boolean;
    error?: string | null;   
}

export interface FollowerState {
    exists?: boolean;
    loading?: boolean;
    error?: string | null;
}