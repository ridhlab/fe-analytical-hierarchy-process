import { MATRIX_COMPARES_VALUE } from "@/constants/matrix-compare";

export const matrixCompareOptions = MATRIX_COMPARES_VALUE.map((value) => ({
    label: value < 1 ? `1/${1 / value}` : `${value}`,
    value,
}));
