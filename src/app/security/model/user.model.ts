import { AbstractModel } from 'src/app/abstract/abstract-component/abstract-model';

export class UserSecurity extends AbstractModel {
    username: string;
    password: string;
    accessRole: string;
    token: string;
}

export enum Rule {
    Admin = 'ADMIN'
}

export const AccessRole = [
    { value: 'ADMIN', name: 'Administrador' }
];
