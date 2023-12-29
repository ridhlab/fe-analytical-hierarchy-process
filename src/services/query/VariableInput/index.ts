import {
    IVariableInputDetailResponse,
    IVariableInputIndexResponse,
} from "@/interfaces/responses/VariableInput";
import { IBaseResponse } from "@/interfaces/responses/base";
import {
    getVariableInputDetail,
    getVariableInputIndex,
} from "@/services/apis/VariableInput";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useVariableInputQueryIndex = (
    options?: UseQueryOptions<
        IVariableInputIndexResponse,
        IBaseResponse<unknown>,
        IVariableInputIndexResponse
    >
) => {
    return useQuery({
        queryKey: ["variable-input-index"],
        queryFn: () => getVariableInputIndex(),
        ...options,
    });
};

export const useVariableInputQueryDetail = (
    id,
    options?: UseQueryOptions<
        IVariableInputDetailResponse,
        IBaseResponse<unknown>,
        IVariableInputDetailResponse
    >
) => {
    return useQuery({
        queryKey: ["variable-input-index", id],
        queryFn: () => getVariableInputDetail(id),
        enabled: !!id,
        refetchOnMount: true,
        ...options,
    });
};
