import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../../services/global.service';
import { User } from '../models/user';

@Injectable()
export class UserService
{
    // Url of API
    private url: string;

    constructor(private _http: HttpClient)
    {
        this.url = GLOBAL.url;
    }

    // This method is used for login user
    login(user)
    {
        //
    }

    // This method is used for register a new user
    register(user)
    {
        let params = 
        {
            email : user.email,
            password : user.password
        };
        
        return this._http.post(this.url + 'users', params);
    }
}