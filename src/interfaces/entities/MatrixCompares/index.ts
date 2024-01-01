import { IVariableOutput } from "../VariableOutput";
import { IBaseEntity } from "../base";

export interface IMatrixCompare extends IBaseEntity {
    id: number;
    variableInputId: number;
    compare1VariableOutputId: number;
    compare2VariableOutputId: number;
    value: number;
    compare1VariableOutput?: IVariableOutput;
    compare2VariableOutput?: IVariableOutput;
}
