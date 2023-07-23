import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Follower, FollowerAction, FollowerActionType } from "../types/followerType";

const getFollowerRequest = (): FollowerAction => ({
    type: FollowerActionType.GET_FOLLOWER_REQUEST
});

const getFollowerSuccess = (exists: boolean): FollowerAction => ({
    type: FollowerActionType.GET_FOLLOWER_SUCCESS,
    payload: exists
});

const getFollowerFailure = (error: string): FollowerAction => ({
    type: FollowerActionType.GET_FOLLOWER_FAILURE,
    error: error
})

const postFollowerRequest = (): FollowerAction => ({
    type: FollowerActionType.POST_FOLLOWER_REQUEST
});

const postFollowerSuccess = (): FollowerAction => ({
    type: FollowerActionType.POST_FOLLOWER_SUCCESS,
});

const postFollowerFailure = (error: string): FollowerAction => ({
    type: FollowerActionType.POST_FOLLOWER_FAILURE,
    error: error
});

const deleteFollowerRequest = (): FollowerAction => ({
    type: FollowerActionType.DELETE_FOLLOWER_REQUEST
});

const deleteFollowerSuccess = (): FollowerAction => ({
    type: FollowerActionType.DELETE_FOLLOWER_SUCCESS
});

const deleteFollowerFailure = (error: string): FollowerAction => ({
    type: FollowerActionType.DELETE_FOLLOWER_FAILURE,
    error: error
});

export const readFollower = (
    usernameFollower: string, usernameZenyted: string, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getFollowerRequest());
        try {
            const response = await fetch(
                `http://localhost:8080/api/followers/${usernameFollower}/${usernameZenyted}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getFollowerSuccess(data));
                return data;
            } else {
                throw new Error("Failed reading follower");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getFollowerFailure(error.message));
            } else {
                dispatch(getFollowerFailure("An unknown error occurred while reading follower."));
            }
        }
    }
};

export const createFollower = (follower: Follower, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(postFollowerRequest());
        try {
            const response = await fetch(
                `http://localhost:8080/api/followers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(follower)
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(postFollowerSuccess());
                return data;
            } else {
                throw new Error("Failed creating follower");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(postFollowerFailure(error.message));
            } else {
                dispatch(postFollowerFailure("An unknown error occurred while creating follower."));
            }
        }
    };
};

export const deleteFollower = (follower: Follower, token: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(deleteFollowerRequest());
        try {
            const response = await fetch(
                `http://localhost:8080/api/followers`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(follower)
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(deleteFollowerSuccess());
                return data;
            } else {
                throw new Error("Failed deleting follower");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(deleteFollowerFailure(error.message));
            } else {
                dispatch(deleteFollowerFailure("An unknown error occurred while deleting follower."));
            }
        }
    };
};
