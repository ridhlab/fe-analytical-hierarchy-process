/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

export const throwErrorResponse = (error: AxiosError) => {
    return (
        ((error as AxiosError).response?.data as any)?.message ||
        (error as AxiosError).message
    );
};
