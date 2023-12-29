import { IBaseResponse } from "../base";
import { IVariableOutput } from "@/interfaces/entities/VariableOutput";

export interface IVariableOutputIndexResponse
    extends IBaseResponse<IVariableOutput[]> {}

export interface IVariableOutputDetailResponse
    extends IBaseResponse<IVariableOutput> {}
