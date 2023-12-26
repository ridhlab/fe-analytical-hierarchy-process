/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoginRequest, IRegisterRequest } from "@/interfaces/requests/Auth";
import { login, register } from "@/services/apis/Auth";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useRegisterMutation = (
    options?: UseMutationOptions<any, unknown, IRegisterRequest, unknown>
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
    options?: UseMutationOptions<any, unknown, ILoginRequest, unknown>
) => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: (payload: ILoginRequest) => {
            return login(payload);
        },
        ...options,
    });
};
