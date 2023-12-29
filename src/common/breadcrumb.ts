import { parsingRoute } from "@/helpers/route";
import { Routes } from "@/routes/routes";

export const Breadcrumbs = {
    Dashboard: () => [{ label: "Dashboard", href: Routes.Dashboard }],
    VariableInput: {
        Index: () => [
            { label: "Variable Input", href: Routes.VariableInputIndex },
        ],
        Create: () => [
            { label: "Variable Input", href: Routes.VariableInputIndex },
            {
                label: "Create Variable Input",
                href: Routes.VariableInputCreate,
            },
        ],
        Edit: (id: string) => [
            { label: "Variable Input", href: Routes.VariableInputIndex },
            {
                label: "Edit Variable Input",
                href: parsingRoute(Routes.VariableInputEdit, { id }),
            },
        ],
    },
    VariableOutput: {
        Index: () => [
            { label: "Variable Output", href: Routes.VariableOutputIndex },
        ],
        Create: () => [
            { label: "Variable Output", href: Routes.VariableOutputIndex },
            {
                label: "Create Variable Output",
                href: Routes.VariableOutputCreate,
            },
        ],
        Edit: (id: string) => [
            { label: "Variable Output", href: Routes.VariableOutputIndex },
            {
                label: "Edit Variable Output",
                href: parsingRoute(Routes.VariableOutputEdit, { id }),
            },
        ],
    },
    Result: {
        Index: () => [{ label: "Result Predict", href: Routes.ResultIndex }],
    },
};
