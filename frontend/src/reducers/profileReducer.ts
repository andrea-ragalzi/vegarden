import { ProfileActionType, ProfileAction, ProfileState } from './../types/profileType';

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
            return {
                ...state,
                profile: null,
                loading: true,
                error: null,
            };
        case ProfileActionType.GET_PROFILE_SUCCESS:
            return {
                ...state,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                profile: action.payload!,
                loading: false,
                error: null,
            };
        case ProfileActionType.GET_PROFILE_FAILURE:
            return {
                ...state,
                profile: null,
                loading: false,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                error: action.error!,
            };
        default:
            return state;
    }
};

export default profileReducer;
