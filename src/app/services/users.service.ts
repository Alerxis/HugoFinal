import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  selectedUser: Users;
  users: Users[];
  readonly URL_API = 'https://ti52crud.herokuapp.com/api/users';

  constructor(private http: HttpClient) {
    this.selectedUser = new Users();
    this.users = [];
   }

   getUsers(){
     return this.http.get(this.URL_API);
   }
   postUser(user: Users){
     return this.http.post(this.URL_API, user);
   }

   putUser(user: Users){
     return this.http.put(this.URL_API + `/${user._id}`, user);
   }

   deleteUser(_id: string){
     return this.http.delete(this.URL_API + `/${_id}`);
   }
}

