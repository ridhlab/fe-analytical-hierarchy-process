import { IPermission } from "../Permissions";
import { IBaseEntity } from "../base";

interface IPivotModelToRole {
    modelType: string;
    modelId: string;
    roleId: number;
}

export interface IRole extends IBaseEntity {
    id: number;
    name: string;
    guardName: string;
    pivot?: IPivotModelToRole;
    permissions?: IPermission[];
}
