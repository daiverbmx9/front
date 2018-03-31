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

    // This method is used for login user
    login(user):Observable<any>
    {
        let params = 
        {
            email : user.email,
            password : user.password
        }

        return this._http.post(this.url + 'login', params);
    }

    // This method is used for register a new user
    register(user):Observable<any>
    {
        let params = 
        {
            email : user.email,
            password : user.password
        };
        
        return this._http.post(this.url + 'users', params);
    }
}