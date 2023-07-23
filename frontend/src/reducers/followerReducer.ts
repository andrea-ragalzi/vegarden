import { FollowerAction, FollowerActionType, FollowerState } from "../types/followerType";


const initialState: FollowerState = {
    loading: false,
    error: null
};

const followerReducer = (state = initialState, action: FollowerAction): FollowerState => {
    switch (action.type) {
        case FollowerActionType.GET_FOLLOWER_REQUEST:
        case FollowerActionType.POST_FOLLOWER_REQUEST:
        case FollowerActionType.DELETE_FOLLOWER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FollowerActionType.GET_FOLLOWER_SUCCESS:
            return {
                ...state,
                exists: action.payload,
                loading: false
            }
        case FollowerActionType.POST_FOLLOWER_SUCCESS:
        case FollowerActionType.DELETE_FOLLOWER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }
        case FollowerActionType.GET_FOLLOWER_FAILURE:
        case FollowerActionType.POST_FOLLOWER_FAILURE:
        case FollowerActionType.DELETE_FOLLOWER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default followerReducer;