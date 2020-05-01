import {Votes} from './votes';

export interface VotesWrapper {
    found: boolean;
    lastTimestamp: string;
    named: boolean;
    operationDone: boolean;
    userFound: boolean;
    votes: Votes;
}
