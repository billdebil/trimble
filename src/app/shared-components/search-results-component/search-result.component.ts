import {Component, Input, OnInit} from "@angular/core";
import {SearchService} from "../../services/search-service";

@Component({
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultsComponent implements OnInit {
  public searchResults: any[] = []

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchResults = this.searchService.searchResults
  }
}
