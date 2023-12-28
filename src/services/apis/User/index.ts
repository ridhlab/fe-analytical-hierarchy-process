import { EndpointApi } from "@/routes/routes";
import { axiosAuthInstance } from "..";
import { AxiosError } from "axios";

export const getUser = async () => {
    try {
        const response = await axiosAuthInstance.get(EndpointApi.GetUser);
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
