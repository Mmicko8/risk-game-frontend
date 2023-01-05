import {createContext} from "react";

export interface IUserContext {
    accessToken: string | null;
    username: string | null;
    resetPasswordToken: string | null;
    setAccessToken: (token: string) => void;
    setUsername: (username: string) => void;
    setResetPasswordToken: (resetToken: string) => void;
    removeUsername: () => void;
    removeAccessToken: () => void;
    removeResetPasswordToken: () => void;
}

export default createContext<IUserContext>(
    {
        accessToken: null,
        username: null,
        resetPasswordToken: null,
        setAccessToken: () => {},
        setUsername: () => {},
        setResetPasswordToken: () => {},
        removeUsername: () => {},
        removeAccessToken: () => {},
        removeResetPasswordToken: () => {}
    });
