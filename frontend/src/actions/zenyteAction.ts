import { Dispatch } from "redux";
import { ZenyteActionType, ZenyteAction, Zenyte } from "../types/zenyteType";
import { AnyAction } from "@reduxjs/toolkit";

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

const getAllZenytesRequet = (): ZenyteAction => ({
    type: ZenyteActionType.GET_ALL_ZENYTES_REQUEST,
    loading: true,
    error: null
});

const getAllZenytesSuccess = (payload: Zenyte[]): ZenyteAction => ({
    type: ZenyteActionType.GET_ALL_ZENYTES_SUCCESS,
    payload: payload,
    loading: false,
    error: null
});

const getAllZenytesFailure = (error: string): ZenyteAction => ({
    type: ZenyteActionType.GET_ALL_ZENYTES_FAILURE,
    loading: false,
    error: error
});

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

export const readAllZenytes = (token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getAllZenytesRequet());
        try {
            const response = await fetch(`http://localhost:8080/api/zenytes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getAllZenytesSuccess(data));
            } else {
                throw new Error("Failed reading zenyte");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getAllZenytesFailure(error.message));
            } else {
                dispatch(getAllZenytesFailure("An unknown error occurred reading zenyte."));
            }
        }
    };
};