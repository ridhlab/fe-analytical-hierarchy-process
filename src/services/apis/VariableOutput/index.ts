import { AxiosError } from "axios";
import { axiosAuthInstance } from "..";
import { EndpointApi } from "@/routes/routes";
import { parsingRoute } from "@/helpers/route";
import { IVariableOutputStoreUpdateRequest } from "@/interfaces/requests/VariableOutput";

export const getVariableOutputIndex = async () => {
    try {
        const response = await axiosAuthInstance.get(
            EndpointApi.VariableOutputIndex
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const getVariableOutputDetail = async (id) => {
    try {
        const response = await axiosAuthInstance.get(
            parsingRoute(EndpointApi.VariableOutputDetail, { id })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const variableOutputStore = async (
    payload: IVariableOutputStoreUpdateRequest
) => {
    try {
        const response = await axiosAuthInstance.post(
            EndpointApi.VariableOutputStore,
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const variableOutputUpdate = async (
    id,
    payload: IVariableOutputStoreUpdateRequest
) => {
    try {
        const response = await axiosAuthInstance.put(
            parsingRoute(EndpointApi.VariableOutputUpdate, { id }),
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
