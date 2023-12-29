import { IVariableOutputStoreUpdateRequest } from "@/interfaces/requests/VariableOutput";
import { IBaseResponse } from "@/interfaces/responses/base";
import {
    variableOutputStore,
    variableOutputUpdate,
} from "@/services/apis/VariableOutput";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useVariableOutputMutationStore = (
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IVariableOutputStoreUpdateRequest
    >
) => {
    return useMutation({
        mutationKey: ["store-variable-output"],
        mutationFn: (payload) => variableOutputStore(payload),
        ...options,
    });
};

export const useVariableOutputMutationUpdate = (
    id,
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IVariableOutputStoreUpdateRequest
    >
) => {
    return useMutation({
        mutationKey: ["update-variable-output", id],
        mutationFn: (payload) => variableOutputUpdate(id, payload),
        ...options,
    });
};
