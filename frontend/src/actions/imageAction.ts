import { Dispatch } from "redux";
import { AnyAction } from "@reduxjs/toolkit";
import { ImageAction, ActionTypes } from "../types/imageType";

const apiKey = process.env.REACT_APP_MY_KEY;

const addImageAvatarRequest = (): ImageAction => ({
    type: ActionTypes.ADD_IMAGE_PROFILE_REQUEST,
    loading: true,
    error: null,
});

const addImageAvatarSuccess = (): ImageAction => ({
    type: ActionTypes.ADD_IMAGE_PROFILE_SUCCESS,
    loading: false,
    error: null,
});

const addImageAvatarFailure = (error: string): ImageAction => ({
    type: ActionTypes.ADD_IMAGE_PROFILE_FAILURE,
    loading: false,
    error: error,
});

const addImageCoverRequest = (): ImageAction => ({
    type: ActionTypes.ADD_IMAGE_POST_REQUEST,
    loading: true,
    error: null,
});

const addImageCoverSuccess = (): ImageAction => ({
    type: ActionTypes.ADD_IMAGE_POST_SUCCESS,
    loading: false,
    error: null,
});

const addImageCoverFailure = (error: string): ImageAction => ({
    type: ActionTypes.ADD_IMAGE_POST_FAILURE,
    loading: false,
    error: error,
});

export const addImageAvatar = (userId: string, image: FormData) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(addImageAvatarRequest());
        try {
            const response = await fetch(
                `https://striveschool-api.herokuapp.com/api/profile/${userId}/avatar`,
                {
                    method: "POST",
                    body: image,
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            dispatch(addImageAvatarSuccess());
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch(addImageAvatarFailure(error.message));
            } else {
                dispatch(addImageAvatarFailure("An unknown error occurred"));
            }
        }
    };
};

export const addImageCover = (articleID: string, image: FormData) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(addImageCoverRequest());

        try {
            const response = await fetch(
                `http://localhost:8080/api/uploads/${articleID}/${image}`,
                {
                    method: "POST",
                    body: image,
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            dispatch(addImageCoverSuccess());
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch(addImageCoverFailure(error.message));
            } else {
                dispatch(addImageCoverFailure("An unknown error occurred while uploading image."));
            }
        }
    };
};