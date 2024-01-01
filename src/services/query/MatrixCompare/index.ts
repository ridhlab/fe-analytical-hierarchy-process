import { IMatrixCompareGetByVariableInputIdResponse } from "@/interfaces/responses/MatrixCompare";
import { IBaseResponse } from "@/interfaces/responses/base";
import { matrixCompareGetByVariableInputId } from "@/services/apis/MatrixCompare";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useMatrixCompareByVariableInputIdQuery = (
    inputId,
    options?: UseQueryOptions<
        IMatrixCompareGetByVariableInputIdResponse,
        IBaseResponse<unknown>,
        IMatrixCompareGetByVariableInputIdResponse
    >
) => {
    return useQuery({
        queryKey: ["get-matrix-compares-by-variable-input-id", inputId],
        queryFn: () => matrixCompareGetByVariableInputId(inputId),
        enabled: !!inputId,
        ...options,
    });
};
