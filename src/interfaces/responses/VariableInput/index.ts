import { IVariableInput } from "@/interfaces/entities/VariableInput";
import { IBaseResponse } from "../base";

export interface IVariableInputIndexResponse
    extends IBaseResponse<IVariableInput[]> {}

export interface IVariableInputDetailResponse
    extends IBaseResponse<IVariableInput> {}
