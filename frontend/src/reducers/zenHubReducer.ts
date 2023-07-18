import { ZenHubAction, ZenHubState, ZenHubActionType } from "../types/zenHubType";


const initialState: ZenHubState = {
    profile: null,
    blog: null,
    savedArticles: [],
    loading: false,
    error: null
}

const zebHubReducer = (state = initialState, action: ZenHubAction) => {
    switch (action.type) {
        case ZenHubActionType.GET_Z_PROFILE_REQUEST:
        case ZenHubActionType.GET_Z_BLOG_REQUEST:
        case ZenHubActionType.GET_Z_SAVED_ARTICLES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ZenHubActionType.GET_Z_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                loading: false,
                error: null
            }
        case ZenHubActionType.GET_Z_BLOG_SUCCESS:
            return {
                ...state,
                blog: action.payload,
                loading: false,
                error: null
            }
        case ZenHubActionType.GET_Z_SAVED_ARTICLES_SUCCESS:
            return {
                ...state,
                savedArticles: action.payload,
                loading: false,
                error: null
            }
        case ZenHubActionType.GET_Z_PROFILE_FAILURE:
        case ZenHubActionType.GET_Z_BLOG_FAILURE:
        case ZenHubActionType.GET_Z_SAVED_ARTICLES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default zebHubReducer;
