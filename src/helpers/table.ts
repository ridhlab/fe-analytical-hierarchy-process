import { ColumnGroupType, ColumnType } from "antd/es/table";

export const numberColumns = <T>(): ColumnGroupType<T> | ColumnType<T> => {
    return {
        title: "No",
        key: "no",
        render: (_, __, index) => index + 1,
    };
};
