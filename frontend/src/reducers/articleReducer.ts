import { ArticleAction, ArticleState, ArticleActionType } from './../types/articleType';

const initialState: ArticleState = {
    trendArticles: [],
    selectedArticle: null,
    loading: false,
    error: null
};

const articleReducer = (state = initialState, action: ArticleAction): ArticleState => {
    switch (action.type) {
        case ArticleActionType.GET_ARTICLE_REQUEST:
        case ArticleActionType.POST_ARTICLE_REQUEST:
            return {
                ...state,
                selectedArticle: null,
                loading: true,
                error: null
            };
        case ArticleActionType.GET_ARTICLE_SUCCESS:
        case ArticleActionType.POST_ARTICLE_SUCCESS:
            return {
                ...state,
                selectedArticle: action.payload,
                loading: false,
                error: null
            };
        case ArticleActionType.GET_ARTICLE_FAILURE:
        case ArticleActionType.POST_ARTICLE_FAILURE:
            return {
                ...state,
                selectedArticle: null,
                loading: false,
                error: action.error
            };
        case ArticleActionType.GET_TREND_ARTICLES_REQUEST:
            return {
                ...state,
                trendArticles: [],
                loading: true,
                error: null
            }
        case ArticleActionType.GET_TREND_ARTICLES_SUCCESS:
            return {
                ...state,
                trendArticles: action.payload,
                loading: false,
                error: null
            };
        case ArticleActionType.GET_TREND_ARTICLES_FAILURE:
            return {
                ...state,
                trendArticles: [],
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
};

export default articleReducer;
