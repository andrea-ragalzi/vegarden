import { BlogActionType, BlogAction, BlogState } from './../types/blogType';

const initialState: BlogState = {
    myBlog: {
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
    selectedBlog: {
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
        case BlogActionType.UPDATE_BLOG_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case BlogActionType.GET_BLOG_SUCCESS:
        case BlogActionType.UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                myBlog: action.payload,
                loading: false,
                error: null,
            };
        case BlogActionType.GET_BLOG_FAILURE:
        case BlogActionType.UPDATE_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default blogReducer;
