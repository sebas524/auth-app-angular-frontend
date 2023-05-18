import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { CheckTokenRes, User, LoginRes } from '../interfaces';
import { AuthStatus } from '../enums/aut-status.enum';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // !ATTRIBUTES
  private http = inject(HttpClient);
  private readonly baseurl: string = environment.baseUrl;
  private _currentUser = signal<User | null>(null);
  // * to see current status of app authentication(and therefore be able to react base on its current status):
  private _authCurrentStatus = signal<AuthStatus>(AuthStatus.checking);

  // * this was some refactorization from repeated code that was found more than once in login and checkStatusOfAuth methods:
  private setAuthentication(response: LoginRes): boolean {
    this._currentUser.set(response.user);
    this._authCurrentStatus.set(AuthStatus.authenticated);
    // * remember: these will get updated as well in their computed counterparts.
    // * now what about the token in response.token? this can be stored in localstorage:
    localStorage.setItem('token', response.token);
    return true;
  }

  // * variables up to here are private to prevent direct modification from the outside.
  // * to expose user safely:
  public currentUser = computed(() => this._currentUser());
  // * why? because computed is a readonly signal, it wont have access to methods such as set for example.
  // * same spiel with _authCurrentStatus:
  public authCurrentStatus = computed(() => this._authCurrentStatus());

  // !CONSTRUCTOR
  constructor() {}

  // !METHODS

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseurl}/authentication/authenticate`;
    const body = {
      email: email,
      password: password,
    };
    // ! if login info given is correct:
    return this.http.post<LoginRes>(url, body).pipe(
      map((response) => this.setAuthentication(response)),
      catchError(
        // *  if login info given is WRONG then catch error comes into play:
        (err) => {
          return throwError(() => {
            return err.error.message;
          });
        }
      )
    );
  }

  checkStatusOfAuth(): Observable<boolean> {
    // * url to check token(same as the one created in backend/postman):
    const url = `${this.baseurl}/authentication/check-token`;
    // * take token:
    const token = localStorage.getItem('token');
    // * if no token found then user is not authenticated:
    if (!token) {
      return of(false);
    }

    // * if there is a token, we are going to verify token creating authorization heasders (same as done in postman but now in code):
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // * send http request to url:
    return this.http.get<CheckTokenRes>(url, { headers: headers }).pipe(
      map((response) => this.setAuthentication(response)),
      // * if something goes wrong:
      catchError(() => {
        this._authCurrentStatus.set(AuthStatus.notAunthenticated);
        return of(false);
      })
    );
  }
}
