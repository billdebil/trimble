import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Subject, takeUntil, tap} from "rxjs";
import {SearchService} from "../../services/search-service";
import {SearchModel} from "../../models/data-models";

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.html',
  styleUrls: ['./navigation-tabs.scss']
})
export class NavigationTabsComponent {
  private destroyed$: Subject<void> = new Subject<void>();
  minSearchLength: number = 2
  maxSearchLength: number = 50
  activeIndex: number = 0

  relevanceOptions: any[] = ['Yes', 'No', 'Irrelevant']
  cities: any[] = [
    {name: 'New York'},
    {name: 'London'},
    {name: 'Paris'},
    {name: 'Tokyo'},
    {name: 'Berlin'}
  ]

  numberOfCities: any[] = ['One', 'Two', 'Three', 'Four']
  constructor(private searchService: SearchService, private router: Router) {}

  searchDone(searchModel: SearchModel) {
    this.searchService.getSearchResults(searchModel).pipe(
      takeUntil(this.destroyed$),
      tap(() =>
        this.router.navigate(['/search-results'])
      )
    ).subscribe();
  }

}
