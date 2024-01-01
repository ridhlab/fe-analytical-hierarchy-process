import { AxiosError } from "axios";
import { axiosAuthInstance } from "..";
import { parsingRoute } from "@/helpers/route";
import { EndpointApi } from "@/routes/routes";
import { IMatrixComparesUpdateByVariableInputId } from "@/interfaces/requests/MarixCompare";

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

export const matrixCompareUpdateByVariableInputId = async (
    inputId,
    payload: IMatrixComparesUpdateByVariableInputId
) => {
    try {
        const response = await axiosAuthInstance.put(
            parsingRoute(EndpointApi.MatrixCompareUpdateByInputId, { inputId }),
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
