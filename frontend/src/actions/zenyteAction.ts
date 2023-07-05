import { Dispatch } from "redux";
import { ZenyteActionType, ZenyteAction, ZenyteType } from "../types/zenyteType";
import { AnyAction } from "@reduxjs/toolkit";

const getZenyteRequet = (): ZenyteAction => ({
    type: ZenyteActionType.GET_ZENYTE_REQUEST,
    loading: true,
    error: null
})

const getZenyteSuccess = (payload: ZenyteType): ZenyteAction => ({
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

export const fetchZenyte = (username: string, token: string) => {
    console.log('Zenyte request');
    console.log(username);
    console.log(token);
    return async (dispatch: Dispatch<AnyAction>) => {
        console.log('Zenyte request');
        dispatch(getZenyteRequet());
        try {
            const response = await fetch(`http://localhost:8080/api/zenytes/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Zenyte success');
                console.log(data);
                dispatch(getZenyteSuccess(data));
                console.log('Zenyte success');
            } else {
                throw new Error("Failed reading zenyte");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getZenyteFailure(error.message));
            } else {
                dispatch(getZenyteFailure("An unknown error occurred zenyte read."));
            }
        }
    };
};