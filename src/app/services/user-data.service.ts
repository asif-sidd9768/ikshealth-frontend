import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { CONSTANTS } from '../constants/resource';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor() { }

  updateUsers(users: User[]) {
    this.usersSubject.next(users);
  }

  async loadUserData():Promise<any>{
    try{
      const response = await fetch(`${CONSTANTS.API_URL}`)
      const {users} = await response.json()
      this.updateUsers(users)
      return users
    }catch(error){
      console.error(error)
    }
  }

  async updateUserService(userData: any): Promise<any> {
    try{
      const response = await fetch(`${CONSTANTS.API_URL}/users/${userData.get("id")}`, {method:"POST", body: userData})
      const {users} = await response.json()
      this.updateUsers(users)
      return users
    }catch(error){
      console.error(error)
    }
  }
}
