import { ProfileActionType, ProfileAction, Profile } from './../types/profileType';
import { Dispatch } from 'redux';
import { AnyAction } from '@reduxjs/toolkit';


export const getMyProfileRequest = (): ProfileAction => ({
    type: ProfileActionType.GET_MY_PROFILE_REQUEST,
    loading: true
});

export const getMyProfileSuccess = (profile: Profile): ProfileAction => ({
    type: ProfileActionType.GET_MY_PROFILE_SUCCESS,
    payload: profile,
    loading: false
});

export const getMyProfileFailure = (error: string): ProfileAction => ({
    type: ProfileActionType.GET_MY_PROFILE_FAILURE,
    error: error,
    loading: false
});

export const putMyProfileRequest = (): ProfileAction => ({
    type: ProfileActionType.PUT_MY_PROFILE_REQUEST,
    loading: true
});

export const putMyProfileSuccess = (profile: Profile): ProfileAction => ({
    type: ProfileActionType.PUT_MY_PROFILE_SUCCESS,
    payload: profile,
    loading: false
});

export const putMyProfileFailure = (error: string): ProfileAction => ({
    type: ProfileActionType.PUT_MY_PROFILE_FAILURE,
    error: error,
    loading: false
});

export const getSelectedProfileRequest = (): ProfileAction => ({
    type: ProfileActionType.GET_SELECTED_PROFILE_REQUEST,
    loading: true
});

export const getSelectedProfileSuccess = (profile: Profile): ProfileAction => ({
    type: ProfileActionType.GET_SELECTED_PROFILE_SUCCESS,
    payload: profile,
    loading: false
});

export const getSelectedProfileFailure = (error: string): ProfileAction => ({
    type: ProfileActionType.GET_SELECTED_PROFILE_FAILURE,
    error: error,
    loading: false
});

export const fetchMyProfile = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getMyProfileRequest());
        try {
            const response = await fetch(
                `http://localhost:8080/api/profiles/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getMyProfileSuccess(data));
            } else {
                throw new Error("Failed reading my profile");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getMyProfileFailure(error.message));
            } else {
                dispatch(getMyProfileFailure("An unknown error occurred reading my profile."));
            }
        }
    };
};

export const fetchSelectedProfile = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getSelectedProfileRequest());
        try {
            const response = await fetch(
                `http://localhost:8080/api/profiles/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getSelectedProfileSuccess(data));
            } else {
                throw new Error("Failed reading selected profile");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getSelectedProfileFailure(error.message));
            } else {
                dispatch(getSelectedProfileFailure(
                    "An unknown error occurred reading selected profile."));
            }
        }
    };
};