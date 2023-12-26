import { IBaseEntity } from "../base";

export interface IUser extends IBaseEntity {
    id: string;
    name: string;
    email: string;
    emailVerifiedAt: string;
    permissions?: unknown[];
}
