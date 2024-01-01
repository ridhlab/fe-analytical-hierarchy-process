import { IResultListResponse } from "@/interfaces/responses/Result";
import { IBaseResponse } from "@/interfaces/responses/base";
import { resultGetByUserLogin } from "@/services/apis/Result";
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
