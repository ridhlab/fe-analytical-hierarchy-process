import { IBaseEntity } from "../base";

interface IPivotPermissionToRole {
    roleId: number;
    permissionId: number;
}

export interface IPermission extends IBaseEntity {
    id: number;
    name: string;
    guardName: string;
    pivot: IPivotPermissionToRole;
}
