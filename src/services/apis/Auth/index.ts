import { EndpointApi } from "@/routes/routes";
import { axiosInstance } from "..";
import { ILoginRequest, IRegisterRequest } from "@/interfaces/requests/Auth";
import { AxiosError } from "axios";
import { throwErrorResponse } from "@/helpers/api";

export const login = async (payload: ILoginRequest) => {
    try {
        const response = await axiosInstance.post(EndpointApi.Login, payload);
        return response.data;
    } catch (error) {
        throw throwErrorResponse(error as AxiosError);
    }
};

export const register = async (payload: IRegisterRequest) => {
    try {
        const response = await axiosInstance.post(
            EndpointApi.Register,
            payload
        );
        return response.data;
    } catch (error) {
        throw throwErrorResponse(error as AxiosError);
    }
};
