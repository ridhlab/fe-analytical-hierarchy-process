import {
    IResultDetailResponse,
    IResultListResponse,
    IResultPredictByResultIdResponse,
} from "@/interfaces/responses/Result";
import { IBaseResponse } from "@/interfaces/responses/base";
import {
    resultGetById,
    resultGetByUserLogin,
    resultPredictByResultId,
} from "@/services/apis/Result";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useResultByUserLoginQuery = (
    options?: UseQueryOptions<IResultListResponse, IBaseResponse<unknown>>
) => {
    return useQuery({
        queryKey: ["get-result-by-user-login"],
        queryFn: () => resultGetByUserLogin(),
        ...options,
    });
};

export const useResultByIdQuery = (
    id,
    options?: UseQueryOptions<IResultDetailResponse, IBaseResponse<unknown>>
) => {
    return useQuery({
        queryKey: ["result-by-id", id],
        queryFn: () => resultGetById(id),
        enabled: !!id,
        ...options,
    });
};

export const useResultPredictByresultId = (
    id,
    options?: UseQueryOptions<
        IResultPredictByResultIdResponse,
        IBaseResponse<unknown>
    >
) => {
    return useQuery({
        queryKey: ["result-predict-by-result-id", id],
        queryFn: () => resultPredictByResultId(id),
        enabled: !!id,
        ...options,
    });
};
