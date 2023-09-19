import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {SearchModel} from "../models/data-models";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class SearchService {
  private apiUrl: string = 'https://jsonplaceholder.typicode.com/users';
  public dataLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public searchResults: any[] = [];
  constructor(private http: HttpClient) {}

  getSearchResults(searchModel: SearchModel): Observable<any[]> {
    this.dataLoading.next(true);
    return this.http.get<any[]>(this.apiUrl, this.apiParams(searchModel)).pipe(
      tap(() => this.dataLoading.next(false)),
      tap((searchResults) => this.searchResults = searchResults),
      catchError((error: HttpErrorResponse): Observable<any[]> => {
        if (error.status === 404) {
          console.error('Resource not found:', error);
          return throwError('Resource not found');
        } else if (error.status === 500) {
          console.error('Server error:', error);
          return throwError('Server error occurred');
        } else {
          console.error('An error occurred:', error);
          return throwError('An error occurred');
        }
      })
    );
  }

  private apiParams(searchModel: SearchModel): { params: HttpParams } {
    let params: HttpParams = new HttpParams();

    if (searchModel.searchQuery) {
      params = params.set('query', searchModel.searchQuery);
    }

    if (searchModel.relevance) {
      params = params.set('relevance', searchModel.relevance);
    }

    // @ts-ignore
    if (searchModel.multiselect.length > 0) {
      let multiselect: string = ''
        // @ts-ignore
      searchModel.multiselect.forEach((item: any) => {
          multiselect = multiselect + item.name + ','
      })
      params = params.set('multiselect', multiselect.toString());
    }

    // @ts-ignore
    if (searchModel.checkboxOptions.length > 0) {
      // @ts-ignore
      params = params.set('checkboxOptions', searchModel.checkboxOptions.toString());
    }

    return { params: params};
  }

}
