/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyObject, ObjectSchema } from "yup";

export const yupValidator = <T extends AnyObject>(
    schema: ObjectSchema<T>,
    getFieldsValue: () => T
) => ({
    async validator({ field }: any) {
        await schema.validateSyncAt(field, getFieldsValue());
    },
});

export const getRequiredMessage = (fieldName: string) =>
    `${fieldName} is required field.`;

export const getMinCharMessage = (fieldName: string, min: number) =>
    `${fieldName} must be at least ${min} character.`;
