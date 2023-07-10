import { Dispatch } from "redux";
import { ZenyteActionType, ZenyteAction, Zenyte } from "../types/zenyteType";
import { AnyAction } from "@reduxjs/toolkit";

const getMyZenyteRequet = (): ZenyteAction => ({
    type: ZenyteActionType.GET_MY_ZENYTE_REQUEST,
    loading: true,
    error: null
})

const getMyZenyteSuccess = (payload: Zenyte): ZenyteAction => ({
    type: ZenyteActionType.GET_MY_ZENYTE_SUCCESS,
    payload: payload,
    loading: false,
    error: null
})

const getMyZenyteFailure = (error: string): ZenyteAction => ({
    type: ZenyteActionType.GET_MY_ZENYTE_FAILURE,
    loading: false,
    error: error
})

const getZenyteRequet = (): ZenyteAction => ({
    type: ZenyteActionType.GET_ZENYTE_REQUEST,
    loading: true,
    error: null
})

const getZenyteSuccess = (payload: Zenyte): ZenyteAction => ({
    type: ZenyteActionType.GET_ZENYTE_SUCCESS,
    payload: payload,
    loading: false,
    error: null
})

const getZenyteFailure = (error: string): ZenyteAction => ({
    type: ZenyteActionType.GET_ZENYTE_FAILURE,
    loading: false,
    error: error
})

export const readMyZenyte = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getMyZenyteRequet());
        try {
            const response = await fetch(`http://localhost:8080/api/zenytes/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getMyZenyteSuccess(data));
            } else {
                throw new Error("Failed reading my zenyte");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getMyZenyteFailure(error.message));
            } else {
                dispatch(getMyZenyteFailure("An unknown error occurred reading my zenyte."));
            }
        }
    };
};

export const readZenyte = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getZenyteRequet());
        try {
            const response = await fetch(`http://localhost:8080/api/zenytes/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getZenyteSuccess(data));
            } else {
                throw new Error("Failed reading zenyte");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getZenyteFailure(error.message));
            } else {
                dispatch(getZenyteFailure("An unknown error occurred reading zenyte."));
            }
        }
    };
};