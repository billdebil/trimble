import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, takeUntil, tap, timer} from 'rxjs';
import { switchMap, retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class ApiRetryService {
  private retryInProgress: Subject<void> = new Subject<void>();
  private retryInterval: number = 1000;
  public apiResponseStatus: BehaviorSubject<any> =  new BehaviorSubject<any>(null);
  public retryNumber: BehaviorSubject<number> =  new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  public fetchDataUntilResponse(url: string): Observable<HttpRequest<any>> {
     return this.http.get<HttpRequest<any>>(url).pipe(
       takeUntil(this.retryInProgress),
       retryWhen((errors: Observable<any>) => {
         return errors.pipe(switchMap((error) => {
           this.retryNumber.next(this.retryNumber.value + 1);
           if(error.status === 404) {
             this.apiResponseStatus.next("Response not ready, retrying in " + this.retryInterval/1000 + "s; number of tries: " + this.retryNumber.getValue());
             return timer(this.retryInterval);
           } else {
             this.apiResponseStatus.next("Something went wrong, an error occurred, canceling retry");
             this.endAPICall()
           }
           throw error
         }));
       })
     )
  }

  public endAPICall() {
    this.retryInProgress.next();
    this.retryInProgress.complete();
  }

}
