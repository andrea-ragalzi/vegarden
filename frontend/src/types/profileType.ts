import { Zenyte } from './zenyteType';

export enum ProfileActionType {
    GET_MY_PROFILE_REQUEST = "GET_MY_PROFILE_REQUEST",
    GET_MY_PROFILE_SUCCESS = "GET_MY_PROFILE_SUCCESS",
    GET_MY_PROFILE_FAILURE = "GET_MY_PROFILE_FAILURE",
    PUT_MY_PROFILE_REQUEST = "PUT_MY_PROFILE_REQUEST",
    PUT_MY_PROFILE_SUCCESS = "PUT_MY_PROFILE_SUCCESS",
    PUT_MY_PROFILE_FAILURE = "PUT_MY_PROFILE_FAILURE",
    GET_SELECTED_PROFILE_REQUEST = "GET_SELECTED_PROFILE_REQUEST",
    GET_SELECTED_PROFILE_SUCCESS = "GET_SELECTED_PROFILE_SUCCESS",
    GET_SELECTED_PROFILE_FAILURE = "GET_SELECTED_PROFILE_FAILURE"
}

export interface Profile {
    id: number;
    firstname: string;
    middlename?: string;
    lastname: string;
    pronouns?: string;
    bio?: string;
    location?: string;
    avatarImage?: string;
    coverImage?: string;
    createdAt: string;
    updatedAt?: string | null;
    owner: Zenyte;
}

export interface ProfileAction {
    type: ProfileActionType;
    payload?: Profile;
    loading: boolean;
    error?: string | null;
}

export interface ProfileState {
    myProfile?: Profile;
    selectedProfile?: Profile;
    loading: boolean;
    error?: string | null;
}
