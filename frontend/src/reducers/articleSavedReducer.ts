import { ArticleSavedAction, ArticleSavedState, ArticleSavedType } from "../types/articleSavedType";


const initialState: ArticleSavedState = {
    exists: false,
    loading: false,
    error: null
};

const articleSavedReducer = (state = initialState, action: ArticleSavedAction): ArticleSavedState => {
    switch (action.type) {
        case ArticleSavedType.GET_ARTICLE_SAVED_REQUEST:
        case ArticleSavedType.POST_ARTICLE_SAVED_REQUEST:
        case ArticleSavedType.DELETE_ARTICLE_SAVED_REQUEST:
            return {
                ...state,
                exists: action.payload,
                loading: false
            }
        case ArticleSavedType.GET_ARTICLE_SAVED_SUCCESS:
            return {
                ...state,
                exists: action.payload,
                loading: false
            }
        case ArticleSavedType.POST_ARTICLE_SAVED_SUCCESS:
        case ArticleSavedType.DELETE_ARTICLE_SAVED_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }
        case ArticleSavedType.GET_ARTICLE_SAVED_FAILURE:
        case ArticleSavedType.POST_ARTICLE_SAVED_FAILURE:
        case ArticleSavedType.DELETE_ARTICLE_SAVED_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default articleSavedReducer;