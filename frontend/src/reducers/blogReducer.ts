import { BlogActionType, BlogAction, BlogState } from './../types/blogType';

const initialState: BlogState = {
    blog: {
        id: 0,
        title: '',
        description: '',
        createdAt: '',
        updatedAt: null,
        owner: {
            id: 0,
            username: '',
            email: '',
            password: '',
            roles: [],
            createdAt: '',
            updatedAt: null,
        },
        articles: []
    },
    loading: false,
    error: null,
};

const blogReducer = (state = initialState, action: BlogAction): BlogState => {
    switch (action.type) {
        case BlogActionType.GET_BLOG_REQUEST:
        case BlogActionType.PUT_BLOG_REQUEST:
            return {
                ...state,
                blog: null,
                loading: true,
                error: null,
            };
        case BlogActionType.GET_BLOG_SUCCESS:
        case BlogActionType.PUT_BLOG_SUCCESS:
            return {
                ...state,
                blog: action.payload,
                loading: false,
                error: null,
            };
        case BlogActionType.GET_BLOG_FAILURE:
        case BlogActionType.PUT_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                error: action.error!,
            };
        default:
            return state;
    }
};

export default blogReducer;
