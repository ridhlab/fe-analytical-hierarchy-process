import { IUser } from "@/interfaces/entities/Users";
import { IBaseResponse } from "../base";

interface IDataRegisterLoginResponse {
    user: IUser;
    token: string;
}

export interface IRegisterResponse
    extends IBaseResponse<IDataRegisterLoginResponse> {}

export interface ILoginResponse
    extends IBaseResponse<IDataRegisterLoginResponse> {}
