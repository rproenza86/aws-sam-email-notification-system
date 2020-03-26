export enum Status {
    Saved = 'Saved' // FIXME: This is on TBD
}

export interface IMessageRecord {
    id: string;
    message_id: string;
    message: string;
    timestamp: string;
    status: Status;
}
