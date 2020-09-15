import { AbstractModel } from 'src/app/abstract/abstract-component/abstract-model';

export class User extends AbstractModel {
    name: string;
    sirname: string;
    photo: string;
    email: string;
    phoneNumber: string;

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
