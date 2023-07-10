import { ProfileActionType, ProfileAction, Profile } from './../types/profileType';
import { Dispatch } from 'redux';
import { AnyAction } from '@reduxjs/toolkit';

export const getProfileRequest = (): ProfileAction => ({
    type: ProfileActionType.GET_PROFILE_REQUEST,  
});

export const getProfileSuccess = (profile: Profile): ProfileAction => ({
    type: ProfileActionType.GET_PROFILE_SUCCESS,
    payload: profile
});

export const getProfileFailure = (error: string): ProfileAction => ({
    type: ProfileActionType.GET_PROFILE_FAILURE,
    error: error
});


export const readProfile = (username: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getProfileRequest());
        try {
            const response = await fetch(
                `http://localhost:8080/api/profiles/${username}`, {
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
                dispatch(getProfileFailure(
                    "An unknown error occurred reading profile."));
            }
        }
    };
};