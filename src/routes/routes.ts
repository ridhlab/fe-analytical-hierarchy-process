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
    ResultIndex = "/result",
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
}
