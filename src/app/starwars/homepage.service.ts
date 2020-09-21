import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, take, takeUntil } from "rxjs/operators";
import { FilmCharacterDetails } from "./model/filmCharacterDetails.model";
import { FilmDetails } from "./model/filmDetails.model";
import { UserData } from "./model/userData.model";

@Injectable({
  providedIn: "root"
})
export class HomepageService {
  private actionUrl: string;
  _jsonURL = "assets/characters.json";
  constructor(private _http: HttpClient) {}
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  public getJSON(): Observable<any> {
    return this._http.get(this._jsonURL);
  }
  getCharacterdetails(url: string): Observable<UserData> {
    let userData: UserData;
    return this.getAllApis(url, userData);
  }

  getFilms(url) {
    let filmDetails: FilmDetails;
    return this.getAllApis(url, filmDetails);
  }

  getCharactersInFilms(url: string): Observable<FilmCharacterDetails> {
    let filmCharacterDetails: FilmCharacterDetails;
    return this.getAllApis(url, filmCharacterDetails);
  }

  getAllApis(url, resultTypes) {
    url = url.replace("http://", "https://");
    return this._http.get<typeof resultTypes>(url, this.httpOptions).pipe(
      take(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
