import { EndpointApi } from "@/routes/routes";
import { axiosInstance } from "..";
import { ILoginRequest, IRegisterRequest } from "@/interfaces/requests/Auth";
import { AxiosError } from "axios";

export const login = async (payload: ILoginRequest) => {
    try {
        const response = await axiosInstance.post(EndpointApi.Login, payload);
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
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
        throw (error as AxiosError).response.data;
    }
};
