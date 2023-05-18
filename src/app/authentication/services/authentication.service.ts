import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../interfaces';
import { AuthStatus } from '../enums/aut-status.enum';
import { LoginRes } from '../interfaces/login-res.interface';
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
  // * variables up to here are private to prevent direct modification from the outside.
  // * to expose user safely:
  public currentUser = computed(() => {
    return this._currentUser;
    // * why? because computed is a readonly signal, it wont have access to methods such as set for example.
  });
  // * same spiel with _authCurrentStatus:
  public authCurrentStatus = computed(() => {
    return this._authCurrentStatus;
  });

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
      tap((response) => {
        this._currentUser.set(response.user);
        this._authCurrentStatus.set(AuthStatus.authenticated);
        // * remember: these will get updated as well in their computed counterparts.
        // * now what about the token in response.token? this can be stored in localstorage:
        localStorage.setItem('token', response.token);
        console.log('user and token info => ', response.user, response.token);
      }),
      map(() => {
        return true;
      }),
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
}
