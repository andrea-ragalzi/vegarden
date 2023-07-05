import { ProfileActionType, ProfileAction, ProfileType } from './../types/profileType';
import { Dispatch } from 'redux';
import { AnyAction } from '@reduxjs/toolkit';

export const getProfileRequest = (): ProfileAction => ({
    type: ProfileActionType.GET_PROFILE_REQUEST,
    loading: true,
});

export const getProfileSuccess = (profile: ProfileType): ProfileAction => ({
    type: ProfileActionType.GET_PROFILE_SUCCESS,
    payload: profile,
    loading: false,
});

export const getProfileFailure = (error: string): ProfileAction => ({
    type: ProfileActionType.GET_PROFILE_FAILURE,
    error: error,
    loading: false,
});

export const updateProfileRequest = (): ProfileAction => ({
    type: ProfileActionType.UPDATE_PROFILE_REQUEST,
    loading: true,
});

export const updateProfileSuccess = (profile: ProfileType): ProfileAction => ({
    type: ProfileActionType.UPDATE_PROFILE_SUCCESS,
    payload: profile,
    loading: false,
});

export const updateProfileFailure = (error: string): ProfileAction => ({
    type: ProfileActionType.UPDATE_PROFILE_FAILURE,
    error: error,
    loading: false,
});

export const fetchProfile = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getProfileRequest());
        try {
            const response = await fetch(`http://localhost:8080/api/profiles/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getProfileSuccess(data));
            } else {
                throw new Error("Failed reading profile");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getProfileFailure(error.message));
            } else {
                dispatch(getProfileFailure("An unknown error occurred profile read."));
            }
        }
    };
};