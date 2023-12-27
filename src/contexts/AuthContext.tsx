import { AUTH_TOKEN_NAME } from "@/constants/auth";
import { getCookie } from "@/helpers/cookie";
import { IUser } from "@/interfaces/entities/Users";
import { IBaseResponse } from "@/interfaces/responses/base";
import { useGetUser } from "@/services/query/Auth";
import React from "react";

interface IAuthContextData {
    user: IUser;
    isAuthenticate: boolean;
    isLoading: boolean;
    isError: boolean;
    error: IBaseResponse<unknown>;
    afterLoginRegister: (user: IUser) => void;
    afterLogout: () => void;
}

const AuthContext = React.createContext<IAuthContextData>({
    user: null,
    isAuthenticate: false,
    isLoading: false,
    isError: false,
    error: null,
    afterLoginRegister: () => {},
    afterLogout: () => {},
});

interface IProps {
    children: React.ReactNode;
}

export const AuthContextProvider: React.FC<IProps> = ({ children }) => {
    const [user, setUser] = React.useState<IUser>(null);
    const queryUser = useGetUser();

    const afterLoginRegister = (user: IUser) => {
        setUser(user);
    };

    const afterLogout = () => {
        setUser(null);
    };

    const authState: IAuthContextData = {
        isLoading: queryUser.isLoading,
        user: user ?? queryUser.data,
        error: queryUser.error,
        isError: !!queryUser.error,
        isAuthenticate: !!getCookie(AUTH_TOKEN_NAME),
        afterLoginRegister,
        afterLogout,
    };

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => React.useContext(AuthContext);
