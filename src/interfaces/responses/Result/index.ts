import { IResult } from "@/interfaces/entities/Results";
import { IBaseResponse } from "../base";

export interface IResultListResponse extends IBaseResponse<IResult[]> {}
export interface IResultDetailResponse extends IBaseResponse<IResult> {}

export interface IPredict {
    resultId: number;
    name: string;
    predict: {
        variableOutputId: number;
        variableOutputName: string;
        value: number;
    }[];
}
export interface IResultPredictResponse extends IBaseResponse<IPredict> {}
