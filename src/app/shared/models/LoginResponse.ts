import {UserWrapper} from './UserWrapper';

export interface LoginResponse {
    response: number;
    wrapper: UserWrapper;
    msg: string;
}
