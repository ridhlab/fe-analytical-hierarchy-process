export interface IBaseResponse<T> {
    status: number;
    message: string;
    data: T;
}
