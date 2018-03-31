export class Task
{
    constructor
    (
        public id?: number,
        public name?: string,
        public priority?: string,
        public expiration?: string,
        public user_id?: number,
        public state_id?: number
    )
    {
        //
    }
}