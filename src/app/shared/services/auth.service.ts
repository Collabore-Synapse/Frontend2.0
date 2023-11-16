import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateAccount, GoogleInfos, Login } from '../models/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

const KEY = 'token';
const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  error: any;
  userInfo?: GoogleInfos;

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    public auth: AngularFireAuth
  ) { 
    this.setIsAuthenticated(!!this.returnToken());
  }

  public setIsAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  returnToken(){
    return localStorage.getItem(KEY) || '';
  }

  saveToken(token: string) {
    localStorage.setItem(KEY, token);
    console.log(KEY, token);
    this.setIsAuthenticated(true);
  }

  deleteToken(){
      localStorage.removeItem(KEY);
      this.setIsAuthenticated(false);
  }

  haveToken() {
    const hasToken = !!this.returnToken();
    return hasToken;
  }

  login(login: Login): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${API}/user/login`, login);
  }

  async googleSignIn() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.auth.signInWithPopup(provider);
      this.user = credential.user;
      this.userInfo = {
        name: credential.user?.displayName as string,
        email: credential.user?.email as string,
        google_id: credential.user?.uid as string,
        photo_url: credential.user?.photoURL as string
      }
      this.loginWithGoogle(this.userInfo).subscribe({
        next: (auth) => {
          console.info('Login efetuado com sucesso! ', auth)
        },
        error: (erro) => {
          console.error('Erro => ', erro)
        }
      })
      console.log('Usuário logado com sucesso! ', this.userInfo);
    } catch (error) {
      this.error = error;
      console.error('Erro => ', error);
    }
  }


  //excluir todos os dados armazenados no localStorage
  async signOut() {
    await this.auth.signOut();
    this.user = null;
  }

  loginWithGoogle(infos: GoogleInfos): Observable<GoogleInfos> {
    return this.http.post<GoogleInfos>(`${API}/user/registerWithGoogle`, infos);
  }

  createAccount(values: CreateAccount): Observable<CreateAccount> {
    return this.http.post<CreateAccount>(`${API}/user/register`, values);
  }

  findUser(userId: number): Observable<any> {
    return this.http.get<any>(`${API}/user/find/${userId}`);
  }

  // postUser(userId: number): Observable<any> {
  //   return this.http.get<any>(`${API}/user/find/post/${userId}`);
  // }
}