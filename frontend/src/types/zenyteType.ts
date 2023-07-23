import RoleType from './roleType';

export enum ZenyteActionType {
    GET_ZENYTE_REQUEST = "GET_ZENYTE_REQUEST",
    GET_ZENYTE_SUCCESS = "GET_ZENYTE_SUCCESS",
    GET_ZENYTE_FAILURE = "GET_ZENYTE_FAILURE",
    GET_ALL_ZENYTES_REQUEST = "GET_ALL_ZENYTES_REQUEST",
    GET_ALL_ZENYTES_SUCCESS = "GET_ALL_ZENYTES_SUCCESS",
    GET_ALL_ZENYTES_FAILURE = "GET_ALL_ZENYTES_FAILURE"
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
    zenyte?: Zenyte;
    allZenytes?: Zenyte[];
    loading: boolean;
    error?: string | null;
}

