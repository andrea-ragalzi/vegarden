import { CategoryAction, CategoryActionType, CategoryState } from "../types/categoryType";


const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null
}

const categoryReducer = (state = initialState, action: CategoryAction): CategoryState => {
    switch (action.type) {
        case CategoryActionType.GET_CATEGORY:
        case CategoryActionType.POST_CATEGORY:
            return {
                ...state,
                categories: action.payload!,
                loading: true,
                error: null
            }
        default:
            return state;
    }

}

export default categoryReducer;