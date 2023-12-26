import { yupValidator } from "@/helpers/form";
import { Form } from "antd";
import * as yup from "yup";

type TConfig<T extends yup.AnyObject> = {
    schema: yup.ObjectSchema<T>;
};

export const useFormUtility = <T extends yup.AnyObject>(config: TConfig<T>) => {
    const [form] = Form.useForm<T>();
    const yupSync = yupValidator(config.schema, form.getFieldsValue);

    return { form, yupSync };
};
