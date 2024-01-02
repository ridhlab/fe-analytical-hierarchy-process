export interface IPredictRequest {
    name: string;
    dataInput: { variableInputId: number; value: number }[];
}
