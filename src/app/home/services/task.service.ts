import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../../services/global.service';

@Injectable()
export class TaskService
{
    // Url of API
    private url: string;

    constructor(private _http: HttpClient)
    {
        this.url = GLOBAL.url;
    }

    // This method is used for get all states from database
    states():Observable<any>
    {
        return this._http.get(this.url + 'states');
    }

    // This method is used for get all task bt user
    tasks(user_id):Observable<any>
    {        
        return this._http.get(this.url + 'tasks/' + user_id);
    }

    // This method is used for save one task
    insert(expiration:string, task:any):Observable<any>
    {
        let params =
        {
            name : task.name,
            priority : task.priority,
            expiration : expiration,
            state_id : 1,
            user_id : task.user_id
        }

        return this._http.post(this.url + 'tasks', params);
    }

    // This method is used for update task
    update(id, params):Observable<any>
    {
        return this._http.put(this.url + 'tasks/' + id, params);
    }

    // This method is used for delete task
    delete(id):Observable<any>
    {
        return this._http.delete(this.url + 'tasks/' + id);
    }
}