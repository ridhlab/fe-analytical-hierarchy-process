import { Breadcrumbs } from "@/common/breadcrumb";
import CellMatrixCompare from "@/components/modules/MatrixCompare/CellMatrixCompare";
import Button from "@/components/shared/Button/Button";
import LoaderCenter from "@/components/shared/Loader/LoaderCenter";
import { MatrixCompareHelper } from "@/helpers/matrix-compares";
import { modalConfirm } from "@/helpers/modal-confirm";
import { prompNotification } from "@/helpers/notification";
import { getDecimalPlace } from "@/helpers/number";
import { IMatrixCompare } from "@/interfaces/entities/MatrixCompares";
import { IVariableOutput } from "@/interfaces/entities/VariableOutput";
import { IMatrixComparesUpdateByVariableInputId } from "@/interfaces/requests/MarixCompare";
import MainLayout from "@/layouts/MainLayout";
import { Routes } from "@/routes/routes";
import { useMatrixCompareByVariableInputIdUpdateQuery } from "@/services/mutation/MatrixCompare";
import { useMatrixCompareByVariableInputIdQuery } from "@/services/query/MatrixCompare";
import { useVariableOutputQueryIndex } from "@/services/query/VariableOutput";
import { Card, Form, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface IFormSchemaMatrixCompares {
    matrixCompares: Pick<
        IMatrixCompare,
        "compare1VariableOutputId" | "compare2VariableOutputId" | "value"
    >[];
}

const EditByInputId: React.FC = () => {
    const { inputId } = useParams();
    const navigate = useNavigate();

    const queryMatrixCompare = useMatrixCompareByVariableInputIdQuery(inputId);
    const queryVariableOutput = useVariableOutputQueryIndex();

    const isFetching =
        queryMatrixCompare.isLoading ||
        queryMatrixCompare.isFetching ||
        queryVariableOutput.isLoading ||
        queryVariableOutput.isFetching;

    const mutationUpdate = useMatrixCompareByVariableInputIdUpdateQuery(
        inputId,
        {
            onSuccess: ({ message }) => {
                prompNotification({ message, method: "success" });
                navigate(Routes.MatrixCompares);
            },
            onError: ({ message }) => {
                prompNotification({ message, method: "error" });
            },
        }
    );

    const [form] = Form.useForm<IFormSchemaMatrixCompares>();

    const idsOutputId = queryVariableOutput?.data?.data?.map(({ id }) => id);

    const matrixComparesValue = Form.useWatch("matrixCompares", form);

    const [totalCompares, setTotalCompares] =
        React.useState<{ outputId: number; total: number }[]>();
    const [normalization, setNormalization] = React.useState<
        {
            output1Id: number;
            output2Id: number;
            value: number;
        }[]
    >();
    const [consistencyMatrix, setConsistencyMatrix] = React.useState<
        {
            outputId: number;
            value: number;
        }[]
    >();
    const [consistencyRatio, setConsistencyRatio] = React.useState<number>(0);

    const columns: ColumnsType<IVariableOutput> = [
        {
            dataIndex: "name",
            key: "column-name-variable-output",
            render: (name, _, indexRow) =>
                indexRow === queryVariableOutput?.data?.data?.length ? (
                    <Typography.Text style={{ color: "white" }}>
                        Total
                    </Typography.Text>
                ) : (
                    name
                ),
        },
        ...(queryVariableOutput.data?.data
            ? // eslint-disable-next-line no-unsafe-optional-chaining
              queryVariableOutput.data?.data?.map(
                  (variableOutput, indexCol) => ({
                      title: variableOutput.name,
                      key: variableOutput.id,
                      dataIndex: "id",
                      render: (outputIdRow, _, indexRow) => {
                          if (
                              indexRow ===
                              queryVariableOutput?.data?.data?.length
                          ) {
                              return (
                                  <Typography.Text style={{ color: "white" }}>
                                      {getDecimalPlace(
                                          totalCompares?.find(
                                              ({ outputId }) =>
                                                  outputId === variableOutput.id
                                          )?.total,
                                          3
                                      )}
                                  </Typography.Text>
                              );
                          }
                          const valueMatrixCompare =
                              matrixComparesValue?.find(
                                  ({
                                      compare1VariableOutputId,
                                      compare2VariableOutputId,
                                  }) =>
                                      compare1VariableOutputId ===
                                          outputIdRow &&
                                      compare2VariableOutputId ===
                                          variableOutput?.id
                              )?.value ?? 1;
                          const valueNormalization = parseFloat(
                              getDecimalPlace(
                                  normalization?.find(
                                      ({ output1Id, output2Id }) =>
                                          output1Id === outputIdRow &&
                                          output2Id === variableOutput?.id
                                  )?.value ?? 0,
                                  3
                              )
                          );
                          return (
                              <CellMatrixCompare
                                  output1Id={outputIdRow}
                                  output2Id={variableOutput?.id}
                                  indexCol={indexCol}
                                  indexRow={indexRow}
                                  valueMatrixCompare={valueMatrixCompare}
                                  valueNormalization={valueNormalization}
                              />
                          );
                      },
                  })
              )
            : []),
        {
            title: "Weights",
            dataIndex: "id",
            render: (idRow) => {
                return getDecimalPlace(
                    (normalization
                        ?.filter(({ output1Id }) => output1Id === idRow)
                        ?.reduce((acc, item) => acc + item.value, 0) ?? 0) /
                        idsOutputId.length,
                    3
                );
            },
        },
        {
            title: "CM",
            dataIndex: "id",
            render: (idRow) => {
                return getDecimalPlace(
                    consistencyMatrix?.find(
                        ({ outputId }) => outputId === idRow
                    )?.value ?? 0,
                    3
                );
            },
        },
        {
            title: "CR",
            dataIndex: "id",
            onCell: (_, index) => {
                return {
                    rowSpan:
                        index === 0 ||
                        index === queryVariableOutput?.data?.data?.length
                            ? idsOutputId?.length
                            : 0,
                };
            },
            render: () => getDecimalPlace(consistencyRatio ?? 0, 3) ?? 0,
        },
    ];

    const getInitialValue = (
        outputIds: number[],
        matrixCompares: IMatrixCompare[]
    ) => {
        const initValues = matrixCompares?.map(
            ({
                compare1VariableOutputId,
                compare2VariableOutputId,
                value,
            }) => ({
                id: `${compare1VariableOutputId}-${compare2VariableOutputId}`,
                compare1VariableOutputId,
                compare2VariableOutputId,
                value,
            })
        );

        for (let i = 0; i < outputIds.length; i++) {
            for (let j = 0; j < outputIds.length; j++) {
                const [idRow, idCol] = [outputIds[i], outputIds[j]];
                const isExist = initValues.some(
                    ({ compare1VariableOutputId, compare2VariableOutputId }) =>
                        compare1VariableOutputId === idRow &&
                        compare2VariableOutputId === idCol
                );
                if (!isExist) {
                    initValues.push({
                        compare1VariableOutputId: idRow,
                        compare2VariableOutputId: idCol,
                        value: 1,
                        id: `${idRow}-${idCol}`,
                    });
                }
            }
        }
        return initValues;
    };

    const resetMatrixCompare = () => {
        const matrixComparesValue = form.getFieldsValue().matrixCompares;
        form.setFieldsValue({
            matrixCompares: matrixComparesValue.map(
                ({ compare1VariableOutputId, compare2VariableOutputId }) => ({
                    compare1VariableOutputId,
                    compare2VariableOutputId,
                    value: 1,
                })
            ),
        });
    };

    const updateMatrixCompare = () => {
        if (consistencyRatio >= 0.1) {
            return prompNotification({
                method: "error",
                message: "CR Must be under 0.1",
            });
        }

        modalConfirm({
            title: "Are you sure to update?",
            onOk: () => {
                const dataSubmitted = form.getFieldsValue();
                const payload: IMatrixComparesUpdateByVariableInputId = {
                    matrixCompares: dataSubmitted.matrixCompares.map(
                        ({
                            compare1VariableOutputId,
                            compare2VariableOutputId,
                            value,
                        }) => ({
                            compare1VariableOutputId,
                            compare2VariableOutputId,
                            value,
                        })
                    ),
                };
                mutationUpdate.mutate(payload);
            },
        });
    };

    React.useEffect(() => {
        const matrixCompareHelper = new MatrixCompareHelper(
            idsOutputId,
            matrixComparesValue?.map(
                ({
                    compare1VariableOutputId,
                    compare2VariableOutputId,
                    value,
                }) => ({
                    idCol: compare2VariableOutputId,
                    idRow: compare1VariableOutputId,
                    value,
                })
            )
        );
        const total = matrixCompareHelper.getTotalMatrixCompares();
        setTotalCompares(total);
        setNormalization(matrixCompareHelper.getNormalization());
        setConsistencyMatrix(matrixCompareHelper.getConsistencyMatrix());
        setConsistencyRatio(matrixCompareHelper.getConsistencyRatio());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matrixComparesValue]);

    return (
        <MainLayout
            title="Detail Matrix Compare"
            breadcrumbs={Breadcrumbs.MatrixCompare.Edit(inputId)}
        >
            {isFetching ? (
                <LoaderCenter />
            ) : (
                <Card
                    title={`Matrix Compare ${queryMatrixCompare?.data?.data?.variableInputName}`}
                    extra={
                        <Space>
                            <Button onClick={resetMatrixCompare}>Reset</Button>
                            <Button
                                type="primary"
                                onClick={updateMatrixCompare}
                            >
                                Update
                            </Button>
                        </Space>
                    }
                >
                    <Form
                        form={form}
                        initialValues={{
                            matrixCompares: getInitialValue(
                                idsOutputId,
                                queryMatrixCompare?.data?.data?.matrixCompares
                            ),
                        }}
                    >
                        <Form.Item name="matrixCompares">
                            <Table
                                bordered
                                pagination={false}
                                columns={columns}
                                dataSource={[
                                    ...(queryVariableOutput?.data?.data ?? []),
                                    {
                                        id: 0,
                                        createdAt: "",
                                        name: "",
                                        updatedAt: "",
                                    },
                                ]}
                                size="small"
                                id="table-matrix-compares"
                                scroll={{
                                    x: "auto",
                                }}
                            />
                        </Form.Item>
                    </Form>
                </Card>
            )}
        </MainLayout>
    );
};

export default EditByInputId;
