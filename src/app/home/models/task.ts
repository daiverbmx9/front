export class Task
{
    constructor
    (
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