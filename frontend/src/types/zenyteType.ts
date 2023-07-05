export enum ZenyteActionType {
    GET_ZENYTE_REQUEST = "GET_ZENYTE_REQUEST",
    GET_ZENYTE_SUCCESS = "GET_ZENYTE_SUCCESS",
    GET_ZENYTE_FAILURE = "GET_ZENYTE_FAILURE"
}

export interface RoleType {
    id: number;
    role: string;
}

export interface ZenyteType {
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
    zenyte: ZenyteType;
    loading: boolean;
    error?: string | null;
}

