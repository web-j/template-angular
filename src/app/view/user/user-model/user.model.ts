import { AbstractModel } from 'src/app/abstract/abstract-component/abstract-model';

export class User extends AbstractModel {
    public name: string;
    public sirname: string;
    public photo: string;
    public email: string;
    public phoneNumber: string;
    public username: string;
    public password: string;
    public accessRole: string;
}

export const AccessRole = [
    { value: 'ADMIN', name: 'Administrador' }
];
