import {
    IVariableOutputDetailResponse,
    IVariableOutputIndexResponse,
} from "@/interfaces/responses/VariableOutput";
import { IBaseResponse } from "@/interfaces/responses/base";
import {
    getVariableOutputDetail,
    getVariableOutputIndex,
} from "@/services/apis/VariableOutput";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useVariableOutputQueryIndex = (
    options?: UseQueryOptions<
        IVariableOutputIndexResponse,
        IBaseResponse<unknown>,
        IVariableOutputIndexResponse
    >
) => {
    return useQuery({
        queryKey: ["variable-output-index"],
        queryFn: () => getVariableOutputIndex(),
        ...options,
    });
};

export const useVariableOutputQueryDetail = (
    id,
    options?: UseQueryOptions<
        IVariableOutputDetailResponse,
        IBaseResponse<unknown>,
        IVariableOutputDetailResponse
    >
) => {
    return useQuery({
        queryKey: ["variable-output-index", id],
        queryFn: () => getVariableOutputDetail(id),
        enabled: !!id,
        refetchOnMount: true,
        ...options,
    });
};
