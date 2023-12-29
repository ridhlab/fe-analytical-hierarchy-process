import { AxiosError } from "axios";
import { axiosAuthInstance } from "..";
import { EndpointApi } from "@/routes/routes";
import { parsingRoute } from "@/helpers/route";
import { IVariableInputStoreUpdateRequest } from "@/interfaces/requests/VariableInput";

export const getVariableInputIndex = async () => {
    try {
        const response = await axiosAuthInstance.get(
            EndpointApi.VariableInputIndex
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const getVariableInputDetail = async (id) => {
    try {
        const response = await axiosAuthInstance.get(
            parsingRoute(EndpointApi.VariableInputDetail, { id })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const variableInputStore = async (
    payload: IVariableInputStoreUpdateRequest
) => {
    try {
        const response = await axiosAuthInstance.post(
            EndpointApi.VariableInputStore,
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const variableInputUpdate = async (
    id,
    payload: IVariableInputStoreUpdateRequest
) => {
    try {
        const response = await axiosAuthInstance.put(
            parsingRoute(EndpointApi.VariableInputUpdate, { id }),
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
