import { ZenyteActionType, ZenyteAction, ZenyteState } from "../types/zenyteType";

const initialState: ZenyteState = {
    zenyte: {
        id: 0,
        username: '',
        email: '',
        password: '',
        roles: [],
        createdAt: '',
        updatedAt: null
    },
    loading: false,
    error: null,
}

const zenyteReducer = (state: ZenyteState = initialState, action: ZenyteAction): ZenyteState => {
    switch (action.type) {
        case ZenyteActionType.GET_ZENYTE_REQUEST:
        case ZenyteActionType.GET_ALL_ZENYTES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case ZenyteActionType.GET_ZENYTE_SUCCESS:
            return {
                ...state,
                zenyte: action.payload,
                loading: false,
                error: null,
            }
        case ZenyteActionType.GET_ALL_ZENYTES_SUCCESS:
            return {
                ...state,
                allZenytes: action.payload,
                loading: false,
                error: null,
            }
        case ZenyteActionType.GET_ZENYTE_FAILURE:
        case ZenyteActionType.GET_ALL_ZENYTES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default zenyteReducer;