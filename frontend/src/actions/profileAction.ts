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

export const putProfileRequest = (): ProfileAction => ({
    type: ProfileActionType.PUT_PROFILE_REQUEST
})

export const putProfileSuccess = (profile: Profile): ProfileAction => ({
    type: ProfileActionType.PUT_PROFILE_SUCCESS,
    payload: profile
});

export const putProfileFailure = (error: string): ProfileAction => ({
    type: ProfileActionType.PUT_PROFILE_FAILURE,
    error: error
})

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

export const updateProfile = (formData: FormData, username: string, token: string) => async (dispatch: Dispatch<AnyAction>) => {
    dispatch(putProfileRequest());
    try {
        const response = await fetch(
            `http://localhost:8080/api/profiles/${username}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(putProfileSuccess(data));
        } else {
            throw new Error("Failed updating profile");
        }
    } catch (error: unknown | Error) {
        if (error instanceof Error) {
            dispatch(putProfileFailure(error.message));
        } else {
            dispatch(putProfileFailure(
                "An unknown error occurred updating profile."));
        }
    }
};
