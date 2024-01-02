import { IPredictRequest } from "@/interfaces/requests/Result";
import { IResultPredictResponse } from "@/interfaces/responses/Result";
import { IBaseResponse } from "@/interfaces/responses/base";
import { resultPredict } from "@/services/apis/Result";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useResultPredictMutation = (
    options?: UseMutationOptions<
        IResultPredictResponse,
        IBaseResponse<unknown>,
        IPredictRequest
    >
) => {
    return useMutation({
        mutationKey: ["result-predict"],
        mutationFn: (payload) => resultPredict(payload),
        ...options,
    });
};
