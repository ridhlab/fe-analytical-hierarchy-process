import { AUTH_TOKEN_NAME } from "@/constants/auth";
import Cookies from "js-cookie";

export const getCookie = (key: string) => Cookies.get(key);
export const setAuthCookie = (authToken: string) =>
    Cookies.set(AUTH_TOKEN_NAME, authToken, { expires: 1 });
