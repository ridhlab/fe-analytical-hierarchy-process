import { EndpointApi, Routes } from "@/routes/routes";

export const parsingRoute = (
    url: Routes | EndpointApi,
    propsParams?: Record<string, string | number>
): string => {
    let newUrl: string = url;
    if (propsParams) {
        Object.keys(propsParams).forEach((param) => {
            newUrl = newUrl.replace(`:${param}`, String(propsParams[param]));
        });
    }
    return newUrl;
};
