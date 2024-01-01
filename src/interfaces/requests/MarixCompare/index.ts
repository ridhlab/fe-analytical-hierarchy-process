import { IMatrixCompare } from "@/interfaces/entities/MatrixCompares";

export interface IMatrixComparesUpdateByVariableInputId {
    matrixCompares: Pick<
        IMatrixCompare,
        "compare1VariableOutputId" | "compare2VariableOutputId" | "value"
    >[];
}
