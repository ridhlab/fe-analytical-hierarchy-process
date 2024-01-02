import { IVariableInput } from "../VariableInput";
import { IBaseEntity } from "../base";

export interface IInputValue extends IBaseEntity {
    id: number;
    value: number;
    resultId: number;
    variableInputId: number;
    variableInput?: IVariableInput;
}
