import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.API}/user/me`);
  }
}
