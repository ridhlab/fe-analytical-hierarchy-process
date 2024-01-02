export enum Routes {
    Login = "/login",
    Register = "/register",
    Dashboard = "/dashboard",
    Profile = "/profile",

    VariableInputIndex = "/variable-input",
    VariableInputDetail = "/variable-input/:id",
    VariableInputCreate = "/variable-input/create",
    VariableInputEdit = "/variable-input/:id/edit",

    VariableOutputIndex = "/variable-output",
    VariableOutputDetail = "/variable-output/:id",
    VariableOutputCreate = "/variable-output/create",
    VariableOutputEdit = "/variable-output/:id/edit",

    MatrixCompares = "/matrix-compares",
    MatrixComparesEdit = "/matrix-compares/edit-by-input/:inputId",

    ResultIndex = "/result",
    ResultCreate = "/result/create",
    ResultDetail = "/result/:id",
}

export enum EndpointApi {
    Login = "/login",
    Register = "/register",
    Logout = "/logout",
    GetUser = "/user",

    VariableInputIndex = "/variable-input",
    VariableInputDetail = "/variable-input/:id",
    VariableInputStore = "/variable-input/store",
    VariableInputUpdate = "/variable-input/:id/update",

    VariableOutputIndex = "/variable-output",
    VariableOutputDetail = "/variable-output/:id",
    VariableOutputStore = "/variable-output/store",
    VariableOutputUpdate = "/variable-output/:id/update",

    MatrixCompareIndexByVariableInputId = "/matrix-compare?variable_input_id=:inputId",
    MatrixCompareUpdateByInputId = "/matrix-compare/edit-by-input-id/:inputId",

    ResultByUserLogin = "/result-by-user-login",
    ResultDetail = "/result/:id",
    ResultPredict = "/predict",

    ResultPredictGetByResultID = "/result-predict/:resultId",
}
