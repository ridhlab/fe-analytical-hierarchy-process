import { IUser } from "@/interfaces/entities/Users";
import { IBaseResponse } from "@/interfaces/responses/base";
import { getUser } from "@/services/apis/User";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetUser = (
    options?: UseQueryOptions<IUser, IBaseResponse<unknown>, IUser>
) => {
    return useQuery({
        queryKey: ["get-user"],
        queryFn: () => getUser(),
        ...options,
    });
};
