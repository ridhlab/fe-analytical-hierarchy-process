import { AUTH_TOKEN_NAME } from "@/constants/auth";
import Cookies from "js-cookie";

export const authorizationTokenConfig = {
    Authorization: `Bearer ${Cookies.get(AUTH_TOKEN_NAME)}`,
};
