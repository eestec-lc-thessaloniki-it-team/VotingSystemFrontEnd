import {Poll} from './Poll';

export interface PollWrapper {
    found: boolean;
    object: Poll;
    operationDone: boolean;
    poll_id: string;
    userFound: boolean;
}
