import { ZenyteType } from './zenyteType';

export enum ProfileActionType {
    GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST",
    GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS",
    GET_PROFILE_FAILURE = "GET_PROFILE_FAILURE",
    UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST",
    UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS",
    UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE"
}

export interface ProfileType {
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
    owner: ZenyteType;
}

export interface ProfileAction {
    type: ProfileActionType;
    payload?: ProfileType;
    loading: boolean;
    error?: string | null;
}

export interface ProfileState {
    profile?: ProfileType;
    loading: boolean;
    error?: string | null;
}
