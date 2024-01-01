import { IInputValue } from "../InputValues";
import { IUser } from "../Users";
import { IBaseEntity } from "../base";

export interface IResult extends IBaseEntity {
    id: number;
    name: string;
    userId: string;
    user?: IUser;
    inputValues: IInputValue[];
}
