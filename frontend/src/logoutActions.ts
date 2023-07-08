import { store } from "./store/store";
import { LogoutAction, LogoutActionType } from "./types/logoutType";



const getLogoutRequest = (): LogoutAction => ({
    type: LogoutActionType.LOGOUT_REQUEST,
    loading: true,
    error: null
});

const getLogoutSuccess = (): LogoutAction => ({
    type: LogoutActionType.LOGOUT_SUCCESS,
    loading: false,
    error: null
});

const getLogoutFailure = (error: string): LogoutAction => ({
    type: LogoutActionType.LOGOUT_FAILURE,
    loading: false,
    error: error
})

export const logoutFetch = () => {
    const dispatch = store.dispatch;
    try {
        dispatch(getLogoutRequest());
        dispatch(getLogoutSuccess());
    } catch (error) {
        dispatch(getLogoutFailure("An unknown error occurred during logout."));
        console.log(error);
    }
}