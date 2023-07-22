import { LoginActionType, LoginAction, Session } from "../types/loginType";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

const getLoginRequest = (): LoginAction => ({
    type: LoginActionType.LOGIN_REQUEST,
    loading: true,
});

const getLoginSuccess = (payload: Session): LoginAction => ({
    type: LoginActionType.LOGIN_SUCCESS,
    payload: payload,
    loading: false,
});

const getLoginFailure = (error: string): LoginAction => ({
    type: LoginActionType.LOGIN_FAILURE,
    loading: false,
    error: error,
})


const loginFetch = (username: string, password: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(getLoginRequest());
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(getLoginSuccess(data));
            } else {
                throw new Error("Failed to login");
            }
        } catch (error: unknown | Error) {
            if (error instanceof Error) {
                dispatch(getLoginFailure(error.message));
            } else {
                dispatch(getLoginFailure("An unknown error occurred during login."));
            }
        }
    };
};

export default loginFetch;