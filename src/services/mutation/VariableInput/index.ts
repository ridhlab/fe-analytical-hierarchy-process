import { IVariableInputStoreUpdateRequest } from "@/interfaces/requests/VariableInput";
import { IBaseResponse } from "@/interfaces/responses/base";
import {
    variableInputStore,
    variableInputUpdate,
} from "@/services/apis/VariableInput";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useVariableInputMutationStore = (
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IVariableInputStoreUpdateRequest
    >
) => {
    return useMutation({
        mutationKey: ["store-variable-input"],
        mutationFn: (payload) => variableInputStore(payload),
        ...options,
    });
};

export const useVariableInputMutationUpdate = (
    id,
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IVariableInputStoreUpdateRequest
    >
) => {
    return useMutation({
        mutationKey: ["update-variable-input", id],
        mutationFn: (payload) => variableInputUpdate(id, payload),
        ...options,
    });
};
