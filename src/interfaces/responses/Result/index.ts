import { IResult } from "@/interfaces/entities/Results";
import { IBaseResponse } from "../base";

export interface IResultListResponse extends IBaseResponse<IResult[]> {}
export interface IResultDetailResponse extends IBaseResponse<IResult> {}
