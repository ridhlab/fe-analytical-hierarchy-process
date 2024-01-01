import { IMatrixCompare } from "@/interfaces/entities/MatrixCompares";
import { IBaseResponse } from "../base";

export interface IMatrixCompareGetByVariableInputIdResponse
    extends IBaseResponse<{
        variableInputId: number;
        variableInputName: string;
        matrixCompares: IMatrixCompare[];
    }> {}
