import { IMatrixComparesUpdateByVariableInputId } from "@/interfaces/requests/MarixCompare";
import { IBaseResponse } from "@/interfaces/responses/base";
import { matrixCompareUpdateByVariableInputId } from "@/services/apis/MatrixCompare";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useMatrixCompareByVariableInputIdUpdateQuery = (
    inputId,
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IMatrixComparesUpdateByVariableInputId
    >
) => {
    return useMutation({
        mutationKey: ["update-matrix-compares-by-input-id", inputId],
        mutationFn: (payload) =>
            matrixCompareUpdateByVariableInputId(inputId, payload),
        ...options,
    });
};
