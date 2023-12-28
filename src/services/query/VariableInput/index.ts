import { IVariableInputIndexResponse } from "@/interfaces/responses/VariableInput";
import { IBaseResponse } from "@/interfaces/responses/base";
import { getVariableInputIndex } from "@/services/apis/VariableInput";
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
