import { AxiosError } from "axios";
import { axiosAuthInstance } from "..";
import { parsingRoute } from "@/helpers/route";
import { EndpointApi } from "@/routes/routes";

export const matrixCompareGetByVariableInputId = async (inputId) => {
    try {
        const response = await axiosAuthInstance.get(
            parsingRoute(EndpointApi.MatrixCompareIndexByVariableInputId, {
                inputId,
            })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
