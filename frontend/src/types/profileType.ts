import { Zenyte } from './zenyteType';

export enum ProfileActionType {
    GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST",
    GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS",
    GET_PROFILE_FAILURE = "GET_PROFILE_FAILURE",
    PUT_PROFILE_REQUEST = "PUT_PROFILE_REQUEST",
    PUT_PROFILE_SUCCESS = "PUT_PROFILE_SUCCESS",
    PUT_PROFILE_FAILURE = "PUT_PROFILE_FAILURE"
}

export interface Profile {
    id: number;
    firstname: string;
    middlename?: string;
    lastname: string;
    pronouns?: string;
    bio?: string;
    location?: string;
    avatarImage?: File | null;
    avatarImageURL?: string;
    coverImage?: File | null;
    coverImageURL?: string;
    followers: number;
    followeds: number;
    createdAt: string;
    updatedAt?: string;
    owner: Zenyte;
}

export interface ProfileAction {
    type: ProfileActionType;
    payload?: Profile | null;
    loading?: boolean;
    error?: string | null;
}

export interface ProfileState {
    profile: Profile | null;
    loading: boolean;
    error: string | null;
}
