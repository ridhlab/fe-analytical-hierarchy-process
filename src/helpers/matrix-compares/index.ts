type TMatrix = { idRow: number; idCol: number; value: number }[];

export class MatrixCompareHelper {
    outputIds: number[];
    matrix: TMatrix;

    constructor(outputIds: number[], matrix: TMatrix) {
        this.outputIds = outputIds;
        this.matrix = matrix;
    }

    getIr() {
        switch (this.outputIds?.length) {
            case 1:
                return 0;
            case 2:
                return 0;
            case 3:
                return 0.58;
            case 4:
                return 0.9;
            case 5:
                return 1.12;
            case 6:
                return 1.24;
            case 7:
                return 1.32;
            case 8:
                return 1.41;
            case 9:
                return 1.45;
            case 10:
                return 1.49;
            case 11:
                return 1.51;
            case 12:
                return 1.48;
            case 13:
                return 1.56;
            case 14:
                return 1.57;
            case 15:
                return 1.59;
            default:
                break;
        }
    }

    getTotalMatrixCompares() {
        return this.outputIds?.map((outputId) => {
            return {
                outputId,
                total: this.matrix
                    ?.filter(({ idCol }) => idCol === outputId)
                    .reduce((acc, matrixItem) => acc + matrixItem.value, 0),
            };
        });
    }

    getNormalization(): {
        output1Id: number;
        output2Id: number;
        value: number;
    }[] {
        const toalCompares = this.getTotalMatrixCompares();
        const matrix = this.matrix;
        return matrix?.map(({ idCol, idRow, value }) => {
            return {
                output1Id: idRow,
                output2Id: idCol,
                value:
                    value /
                    toalCompares?.find(({ outputId }) => outputId === idCol)
                        .total,
            };
        });
    }

    getWeights(): { outputId: number; weight: number }[] {
        const normalization = this.getNormalization();
        return this.outputIds?.map((outputId) => {
            return {
                outputId,
                weight:
                    normalization
                        ?.filter(({ output1Id }) => output1Id === outputId)
                        ?.reduce((acc, item) => acc + item.value, 0) /
                    this.outputIds.length,
            };
        });
    }

    getConsistencyMatrix(): { outputId: number; value: number }[] {
        const weights = this.getWeights();
        return weights?.map(({ outputId, weight }) => {
            const rowMatrixCompare = this.matrix?.filter(
                ({ idRow }) => idRow === outputId
            );
            let sum = 0;
            rowMatrixCompare?.forEach((item) => {
                sum +=
                    item.value *
                    this.getWeights().find(
                        ({ outputId }) => outputId === item.idCol
                    ).weight;
            });
            return {
                outputId,
                value: sum / weight,
            };
        });
    }

    getLambdaMaks() {
        return (
            this.getConsistencyMatrix()?.reduce(
                (acc, item) => acc + item.value,
                0
            ) / this.outputIds?.length
        );
    }

    getConsistencyIndex() {
        const outputLength = this.outputIds?.length;
        return (this.getLambdaMaks() - outputLength) / (outputLength - 1);
    }

    getConsistencyRatio() {
        return this.getConsistencyIndex() / this.getIr();
    }
}
