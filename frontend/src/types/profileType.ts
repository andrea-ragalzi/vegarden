import { Zenyte } from './zenyteType';

export enum ProfileActionType {
    GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST",
    GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS",
    GET_PROFILE_FAILURE = "GET_PROFILE_FAILURE"
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
