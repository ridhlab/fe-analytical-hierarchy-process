import { AxiosError } from "axios";
import { axiosAuthInstance } from "..";
import { EndpointApi } from "@/routes/routes";

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
