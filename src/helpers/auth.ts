import { AUTH_TOKEN_NAME } from "@/constants/auth";
import { getCookie } from "./cookie";

export const authorizationTokenConfig = {
    Authorization: `Bearer ${getCookie(AUTH_TOKEN_NAME)}`,
};
