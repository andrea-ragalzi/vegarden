import RoleType from './roleType';

export enum ZenyteActionType {
    GET_MY_ZENYTE_REQUEST = "GET_MY_ZENYTE_REQUEST",
    GET_MY_ZENYTE_SUCCESS = "GET_MY_ZENYTE_SUCCESS",
    GET_MY_ZENYTE_FAILURE = "GET_MY_ZENYTE_FAILURE",
    GET_ZENYTE_REQUEST = "GET_ZENYTE_REQUEST",
    GET_ZENYTE_SUCCESS = "GET_ZENYTE_SUCCESS",
    GET_ZENYTE_FAILURE = "GET_ZENYTE_FAILURE"
}

export interface Zenyte {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: RoleType[];
    createdAt: string;
    updatedAt: string | null;
}

export interface ZenyteAction {
    type: ZenyteActionType;
    payload?: any;
    loading: boolean;
    error?: string | null;
}

export interface ZenyteState {
    my: Zenyte;
    selected: Zenyte;
    loading: boolean;
    error?: string | null;
}

