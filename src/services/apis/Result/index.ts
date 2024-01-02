import { AxiosError } from "axios";
import { axiosAuthInstance } from "..";
import { EndpointApi } from "@/routes/routes";
import { IPredictRequest } from "@/interfaces/requests/Result";

export const resultGetByUserLogin = async () => {
    try {
        const response = await axiosAuthInstance.get(
            EndpointApi.ResultByUserLogin
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const resultPredict = async (payload: IPredictRequest) => {
    try {
        const response = await axiosAuthInstance.post(
            EndpointApi.ResultPredict,
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
