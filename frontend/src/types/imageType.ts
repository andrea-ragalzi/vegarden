export enum ActionTypes {
    GET_PROFILE_IMAGE_PROFILE_REQUEST = 'GET_IMAGE_PROFILE_REQUEST',
    GET_PROFILE_IMAGE_PROFILE_SUCCESS = 'GET_IMAGE_PROFILE_SUCCESS',
    GET_PROFILE_IMAGE_PROFILE_FAILURE = 'GET_IMAGE_PROFILE_FAILURE'
}

export interface ImageAction {
    type: ActionTypes;
    loading: boolean;
    error: string | null;
}

export interface ImageState {
    loading: boolean;
    error: string | null;
}