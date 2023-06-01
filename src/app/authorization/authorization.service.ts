import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { User } from "./model/user";
import { UserLogin } from "./model/user-login";
import { environment } from "src/environments/environment";
import { ErrorService } from "../services/error.service";

const CACHE_KEY_TOKEN = "TOKEN";
const TOKEN_ENDPOINT = `${environment.api}/auth/login`;

@Injectable({
  providedIn: "root"
})
export class AuthorizationService {
  public redirectUrl!: string;
  private _user: any;

  constructor(private http: HttpClient) {}

  // bate na autenticação do backend e retorna o token
  requestToken(user: any): Observable<HttpResponse<User>> {
    return this.http.post<User>(
      TOKEN_ENDPOINT,
      { ...user },
      { observe: "response" }
    );
  }

  // pega o token e salva as informações
  login(user: UserLogin): Observable<object | User> {
    const loginSubject = new Subject<User>();
    this.requestToken(user).subscribe({
      next: (response: HttpResponse<any>) => {
        const { body: loggedUser } = response;
        loggedUser.token = response.headers.get("x-access-token");
        this.saveUserInfo(loggedUser);
        loginSubject.next(loggedUser);
      },
      error: (error) => loginSubject.error(error)
    })
    return loginSubject.asObservable();
  }

  saveUserInfo(user: User) {
    this._user = user;
    this.setUser(this._user);
  }

  logout(): void {
    this._user = undefined;
    this.removeUser();
  }

  private setUser(user: User): void {
    sessionStorage.setItem(CACHE_KEY_TOKEN, JSON.stringify(user));
  }

  private removeUser(): void {
    sessionStorage.removeItem(CACHE_KEY_TOKEN);
  }

  getAuthenticatedUser(): any {
    return this._user || sessionStorage.getItem(CACHE_KEY_TOKEN);
  }

  isUserAuthenticated(): boolean {
    return this.getAuthenticatedUser() !== null;
  }
}
