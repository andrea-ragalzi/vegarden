import { ProfileActionType, ProfileAction, ProfileType, ProfileState } from './../types/profileType';

const initialState: ProfileState = {
    profile: {
        id: 0,
        firstname: '',
        middlename: '',
        lastname: '',
        pronouns: '',
        bio: '',
        location: '',
        avatarImage: '',
        coverImage: '',
        createdAt: '',
        updatedAt: null,
        owner: {
            id: 0,
            username: '',
            email: '',
            password: '',
            roles: [],
            createdAt: '',
            updatedAt: null
        }
    },
    loading: false,
    error: null,
};

const profileReducer = (state = initialState, action: ProfileAction): ProfileState => {
    switch (action.type) {
        case ProfileActionType.GET_PROFILE_REQUEST:
        case ProfileActionType.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ProfileActionType.GET_PROFILE_SUCCESS:
        case ProfileActionType.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                loading: false,
                error: null,
            };
        case ProfileActionType.GET_PROFILE_FAILURE:
        case ProfileActionType.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default profileReducer;
