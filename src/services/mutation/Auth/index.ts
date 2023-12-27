/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoginRequest, IRegisterRequest } from "@/interfaces/requests/Auth";
import { ILoginResponse, IRegisterResponse } from "@/interfaces/responses/Auth";
import { IBaseResponse } from "@/interfaces/responses/base";
import { login, register } from "@/services/apis/Auth";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useRegisterMutation = (
    options?: UseMutationOptions<
        IRegisterResponse,
        IBaseResponse<unknown>,
        IRegisterRequest,
        unknown
    >
) => {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: (payload: IRegisterRequest) => {
            return register(payload);
        },
        ...options,
    });
};

export const useLoginMutation = (
    options?: UseMutationOptions<
        ILoginResponse,
        IBaseResponse<unknown>,
        ILoginRequest,
        unknown
    >
) => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: (payload: ILoginRequest) => {
            return login(payload);
        },
        ...options,
    });
};
