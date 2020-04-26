import {User} from './User';

export interface UserWrapper {
    found: boolean;
    userFound: boolean;
    operationDone: boolean;
    object: User;
}
