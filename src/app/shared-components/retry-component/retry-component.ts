import {catchError, Observable, Subject, takeUntil, tap, throwError} from "rxjs";
import {HttpEvent, HttpHeaderResponse, HttpRequest} from "@angular/common/http";
import {ApiResponse} from "../../models/data-models";
import {ApiRetryService} from "../../services/api-retry-sevice";
import {Component, OnInit} from "@angular/core";


@Component({
  selector: 'app-retry-component',
  templateUrl: './retry-component.html',
  styleUrls: ['./retry-component.scss']
})
export class RetryComponent implements OnInit {
  public isLoading: boolean = true
  public data: any
  public userMessage: string = '';

// uncomment this if you want to use a real API
//   private fetchDataURL: string = 'https://retoolapi.dev/pUVymJ/data';

//uncomment this if you want to use a fake API
private fetchDataURL: string = 'https://reqres.in/api/unknown/23';

  private destroyed$: Subject<void> = new Subject<void>()

  fetchDataListener: Observable<HttpRequest<any>> =
    this.apiRetryService.fetchDataUntilResponse(this.fetchDataURL).pipe(
      takeUntil(this.destroyed$),
      catchError((error: HttpEvent<any>): Observable<any> => {
        if (!(error instanceof HttpHeaderResponse) || error?.status === 404) {
          this.userMessage = 'Data is not ready yet, wait for it...'
          return throwError(() => new Error('Data is not available, retry later'))
        } else {
          return throwError('An unexpected error occurred');
        }
      }),
      tap((response: ApiResponse | any) => {
        if (response) {
          this.apiRetryService.endAPICall()
          this.dataHandling(response)
        }
      })
    )

  responseState: Observable<any> = this.apiRetryService.apiResponseStatus.pipe(
    takeUntil(this.destroyed$),
    tap((response: any) => {
      this.userMessage = response
      this.isLoading = true
    })
  )


  constructor(private apiRetryService: ApiRetryService) {
  }

  ngOnInit() {
    this.fetchDataListener.subscribe()
    this.responseState.subscribe()
    this.apiRetryService.retryNumber.next(0)
  }

  dataHandling(response: ApiResponse) {
    if (response.ready) {
      this.data = response.data
      this.isLoading = false
      this.userMessage = 'Data is ready!'
    } else if (!!response) {
      this.userMessage = "Data is ready, mapping is wrong: " + JSON.stringify(response)
      this.isLoading = false
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
