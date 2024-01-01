import { AxiosError } from "axios";
import { axiosAuthInstance } from "..";
import { EndpointApi } from "@/routes/routes";

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
