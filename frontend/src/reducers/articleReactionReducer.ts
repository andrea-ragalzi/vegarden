import { ArticleReactionState, ArticleReactionAction, ArticleReactionType } from "../types/articleReactionType";

const initialState: ArticleReactionState = {
    loading: false,
    error: null
};

const articleReactionReducer = (state = initialState, action: ArticleReactionAction): ArticleReactionState => {
    switch (action.type) {
        case ArticleReactionType.GET_ARTICLE_REACTION_REQUEST:
        case ArticleReactionType.POST_ARTICLE_REACTION_REQUEST:
        case ArticleReactionType.DELETE_ARTICLE_REACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ArticleReactionType.GET_ARTICLE_REACTION_SUCCESS:
            return {
                ...state,
                exists: action.payload,
                loading: false
            }
        case ArticleReactionType.POST_ARTICLE_REACTION_SUCCESS:
        case ArticleReactionType.DELETE_ARTICLE_REACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ArticleReactionType.GET_ARTICLE_REACTION_FAILURE:
        case ArticleReactionType.POST_ARTICLE_REACTION_FAILURE:
        case ArticleReactionType.DELETE_ARTICLE_REACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default articleReactionReducer;