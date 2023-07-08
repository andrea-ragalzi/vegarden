import { ProfileActionType, ProfileAction, ProfileState } from './../types/profileType';

const initialState: ProfileState = {
    myProfile: {
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
    selectedProfile: {
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
        case ProfileActionType.GET_MY_PROFILE_REQUEST:
        case ProfileActionType.PUT_MY_PROFILE_REQUEST:
        case ProfileActionType.GET_SELECTED_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ProfileActionType.GET_MY_PROFILE_SUCCESS:
        case ProfileActionType.PUT_MY_PROFILE_SUCCESS:
            return {
                ...state,
                myProfile: action.payload,
                loading: false,
                error: null,
            };
        case ProfileActionType.GET_SELECTED_PROFILE_SUCCESS:
            return {
                ...state,
                selectedProfile: action.payload,
                loading: false,
                error: null,
            }
        case ProfileActionType.GET_MY_PROFILE_FAILURE:
        case ProfileActionType.PUT_MY_PROFILE_FAILURE:
        case ProfileActionType.GET_SELECTED_PROFILE_FAILURE:
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
