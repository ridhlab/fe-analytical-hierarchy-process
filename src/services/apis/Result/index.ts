import { AxiosError } from "axios";
import { axiosAuthInstance } from "..";
import { EndpointApi } from "@/routes/routes";
import { IPredictRequest } from "@/interfaces/requests/Result";
import { parsingRoute } from "@/helpers/route";

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

export const resultGetById = async (id) => {
    try {
        const response = await axiosAuthInstance.get(
            parsingRoute(EndpointApi.ResultDetail, { id })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const resultPredictByResultId = async (resultId) => {
    try {
        const response = await axiosAuthInstance.get(
            parsingRoute(EndpointApi.ResultPredictGetByResultID, { resultId })
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
